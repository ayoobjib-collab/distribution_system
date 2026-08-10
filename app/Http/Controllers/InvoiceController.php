<?php

namespace App\Http\Controllers;

use App\Enums\RoutesName;
use App\Http\Requests\InvoiceRequest;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function getViewPath(): string
    {
        return 'Invoice';
    }

    public function index()
    {
        $user = auth()->user();

        $invoices = Invoice::query()
            ->when(
                !$user?->hasRole('admin'),
                fn($query) => $query->where('user_id', $user->id)
            )
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

            // ۱. محاسبه جمع کل اقلام (Subtotal)
            $subtotal = 0;
            $itemsData = collect($validated['items'])->map(function ($item) use (&$subtotal) {
                $totalItem = ($item['unit_price'] * $item['quantity']) + ($item['tax'] ?? 0);
                // کسر درصد تخفیف در صورت وجود
                if (isset($item['discount'])) {
                    $totalItem -= ($totalItem * ($item['discount'] / 100));
                }

                $subtotal += $totalItem;

                return array_merge($item, ['total' => $totalItem]);
            });

            // ۲. ایجاد فاکتور
            $invoice = Invoice::create([
                'invoice_no'      => $validated['invoice_no'],
                'account_id'      => $validated['account_id'],
                'user_id'         => Auth::id(),
                'type'            => $validated['type'],
                'status'          => $validated['status'],
                'settlement_days' => $validated['settlement_days'],
                'discount'        => $validated['discount'] ?? 0,
                'tax'             => $validated['tax'] ?? 0,
                'shipping_cost'   => $validated['shipping_cost'] ?? 0,
                'subtotal'        => $subtotal,
                'description'     => $validated['description'],
            ]);

            // ۳. ثبت آیتم‌ها
            $invoice->items()->createMany($itemsData->toArray());

            return redirect()->route('invoices.index')->with('success', 'فاکتور با موفقیت ثبت شد.');
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
                $totalItem = ($item['unit_price'] * $item['quantity']) + ($item['tax'] ?? 0);
                $subtotal += $totalItem;
                return array_merge($item, ['total' => $totalItem]);
            });

            $invoice->update(array_merge($validated, ['subtotal' => $subtotal]));

            $invoice->items()->delete();
            $invoice->items()->createMany($itemsData->toArray());

            return redirect()->route('invoices.index')->with('success', 'فاکتور به‌روزرسانی شد.');
        });
    }
}
