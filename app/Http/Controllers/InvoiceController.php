<?php

namespace App\Http\Controllers;

use App\Enums\RoutesName;
use App\Http\Requests\InvoiceRequest;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function getViewPath(): string
    {
        return 'Invoice';
    }

    public function show(int $id)
    {
        $user = auth()->user();

        $invoice = Invoice::query()
            ->when(
                !$user?->hasRole('admin'),
                fn($query) => $query->where('user_id', $user->id)
            )
            ->with([
                'items.product:id,name',
                'account:id,name',
                'user:id,full_name,mobile',
            ])
            ->findOrFail($id);

        return $this->render(
            'Show',
            [
                'invoice' => $invoice,
            ]
        );
    }

    public function index()
    {
        $user = auth()->user();

        $invoices = Invoice::query()
            ->with([
                'user:id,full_name,mobile',
                'account:id,name'
            ])
            ->when(
                !$user?->hasRole('admin'),
                fn($query) => $query->where('user_id', $user->id)
            )
            ->orderby('id', 'desc')
            ->paginate(10);

        return $this->render(
            'Index',
            [
                'invoices' => $invoices
            ]
        );
    }

    public function create()
    {
        return $this->render(
            'Create',
            [
                'sendUrl' => RoutesName::CreateInvoice->value,
                // 'userType' => 
            ]
        );
    }

    public function store(InvoiceRequest $request)
    {

        return DB::transaction(function () use ($request) {

            $validated = $request->validated();

            $products = Product::whereIn('id', collect($validated['items'])->pluck('product_id'))->get()->keyBy('id');

            foreach ($validated['items'] as $item) {

                $product = $products->get($item['product_id']);

                if (!$product || !$product->hasEnoughStock($item['quantity'])) {
                    throw new \Exception("موجودی کالای {$product->name} کافی نیست.");
                }
            }

            $subtotal = 0;

            $itemsData = collect($validated['items'])->map(function ($item) use (&$subtotal) {

                # Unit price is sale price
                // $item['unit_price'] = $item['sale_price'];

                $totalItem = ($item['unit_price'] * $item['quantity']);

                if (isset($item['discount'])) {
                    $totalItem -= ($totalItem * ($item['discount'] / 100));
                }

                $subtotal += $totalItem;

                return array_merge($item, ['total' => $totalItem]);
            });

            # Create invoice
            $invoice = Invoice::create([
                'account_id'      => $validated['account_id'],
                'user_id'         => Auth::id(),
                'subtotal'        => $subtotal,
                'description'     => $validated['description'] ?? '',
            ]);

            # Create invoice items
            // $invoice->items()->createMany($itemsData->toArray());

            foreach ($itemsData as $item) {
                $invoice->items()->create($item);
                $products->get($item['product_id'])->decrementStock($item['quantity']);
            }

            return back()->with('msg', 'فاکتور با موفقیت ثبت شد.');
        });
    }

    public function update(InvoiceRequest $request, Invoice $invoice)
    {

        if (
            !Auth::user()->hasRole('admin')
            && $invoice->user_id !== Auth::id()
        ) {
            abort(403);
        }

        return DB::transaction(function () use ($request, $invoice) {

            $validated = $request->validated();

            $subtotal = 0;
            $itemsData = collect($validated['items'])->map(function ($item) use (&$subtotal) {

                $totalItem = ($item['unit_price'] * $item['quantity']);

                if (isset($item['discount'])) {
                    $totalItem -= ($totalItem * ($item['discount'] / 100));
                }

                $subtotal += $totalItem;

                return array_merge($item, ['total' => $totalItem]);
            });

            $invoice->update(array_merge($validated, ['subtotal' => $subtotal]));

            $invoice->items()->delete();

            $invoice->items()->createMany($itemsData->toArray());

            return back()->with('msg', 'فاکتور به‌روزرسانی شد.');
        });
    }

    public function edit(int $id)
    {
        $user = auth()->user();

        $invoice = Invoice::query()
            ->when(
                !$user?->hasRole('admin'),
                fn($query) => $query->where('user_id', $user->id)
            )
            ->with([
                'items.product:id,name,stock',
                'account:id,name',
                'user:id,full_name,mobile',
            ])
            ->findOrFail($id);

        return $this->render(
            'Create',
            [
                'invoice' => $invoice,
            ]
        );
    }
}
