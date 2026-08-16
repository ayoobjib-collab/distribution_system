<?php

namespace App\Http\Controllers;

use App\Enums\RoutesName;
use App\Http\Requests\InvoiceRequest;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\Request;
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

            $products = $this->checkProductStock($validated['items']);

            $subtotal = 0;
            $itemsData = $this->addTotalAndSubtotalToData($validated['items'], $subtotal);

            # Create invoice
            $invoice = Invoice::create([
                'account_id'      => $validated['account_id'],
                'user_id'         => Auth::id(),
                'subtotal'        => $subtotal,
                'description'     => $validated['description'] ?? '',
            ]);


            foreach ($itemsData as $item) {
                $invoice->items()->create($item);
                $products->get($item['product_id'])
                    ->decrementStock($item['quantity']);
            }

            return back()->with('msg', 'فاکتور با موفقیت ثبت شد.');
        });
    }

    protected function addTotalAndSubtotalToData(array $itemsData, int &$subtotal)
    {
        $i = collect($itemsData)

            ->map(function ($item) use (&$subtotal) {

                $totalItem = ($item['unit_price'] * $item['quantity']);

                if (isset($item['discount'])) {
                    $totalItem -= ($totalItem * ($item['discount'] / 100));
                }

                $subtotal += $totalItem;

                return array_merge($item, ['total' => $totalItem]);
            });

        return $i;
    }

    protected function checkProductStock(array $itemsData)
    {

        $products = Product::whereIn(
            'id',
            collect($itemsData)->pluck('product_id')
        )
            ->lockForUpdate()
            ->get()
            ->keyBy('id');

        foreach ($itemsData as $item) {
            $product = $products->get($item['product_id']);
            if (!$product->hasEnoughStock($item['quantity'])) {
                throw new \Exception(
                    "موجودی کالای {$product->name} کافی نیست."
                );
            }
        }

        return $products;
    }

    public function update(InvoiceRequest $request, Invoice $invoice)
    {
        $this->validateUser($request, $invoice);

        return DB::transaction(function () use ($request, $invoice) {

            $validated = $request->validated();

            # Remvoe old items and stock
            $oldItems = $invoice->items()->get();

            foreach ($oldItems as $item) {
                Product::where('id', $item->product_id)
                    ->increment('stock', $item->quantity);
            }

            $invoice->items()->delete();

            # Add new stock
            $products = $this->checkProductStock($validated['items']);

            $subtotal = 0;
            $itemsData = $this->addTotalAndSubtotalToData(
                $validated['items'],
                $subtotal
            );

            $invoice->update([
                'subtotal'    => $subtotal,
                'description' => $validated['description'] ?? '',
            ]);

            /*
            * Create new items and decrease stock.
            */
            foreach ($itemsData as $item) {
                $invoice->items()->create($item);
                $products
                    ->get($item['product_id'])
                    ->decrementStock($item['quantity']);
            }

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

    public function destroy(Request $request, Invoice $invoice)
    {
        $this->validateUser($request, $invoice);

        return DB::transaction(function () use ($invoice) {

            $items = $invoice->items()->get();

            foreach ($items as $item) {
                Product::where('id', $item->product_id)
                    ->lockForUpdate()
                    ->increment('stock', $item->quantity);
            }

            $invoice->delete();

            return back()->with(
                'msg',
                'فاکتور با موفقیت حذف شد.'
            );
        });
    }


    public function updateStatus(Request $request, Invoice $invoice)
    {
        if (! $request->user()->hasRole('admin'))
            return back()->with('msg', 'شما قادر به انجام این عملیات نیستید!!');

        $request->validate([
            'status' => ['required', 'string'],
        ]);

        $invoice->update([
            'status' => $request->status,
        ]);

        return back()->with('msg', 'وضعیت فاکتور تغییر کرد.');
    }
}
