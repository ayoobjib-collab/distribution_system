<?php

namespace App\Http\Requests;

use App\Models\Product;
use App\Support\Number;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class InvoiceRequest extends FormRequest
{

    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Check product stock after validation
     */
    protected function passedValidation(): void
    {
        $items = collect($this->validated('items'));

        $productIds = $items
            ->pluck('product_id')
            ->unique();

        $products = Product::query()
            ->whereIn('id', $productIds)
            ->get(['id', 'name', 'stock'])
            ->keyBy('id');

        $invoice = $this->route('invoice');

        $oldQuantities = collect();

        if ($invoice) {
            $oldQuantities = $invoice->items()
                ->whereIn('product_id', $productIds)
                ->get(['product_id', 'quantity'])
                ->groupBy('product_id')
                ->map(fn($items) => $items->sum('quantity'));
        }


        foreach ($items as $index => $item) {

            $product = $products->get($item['product_id']);

            if (!$product) {
                throw ValidationException::withMessages([
                    "items.$index.product_id" =>
                    'محصول انتخاب شده وجود ندارد.',
                ]);
            }

            $oldQuantity = $oldQuantities->get(
                $item['product_id'],
                0
            );

            $availableStock = $product->stock + $oldQuantity;

            if ($item['quantity'] > $availableStock) {
                throw ValidationException::withMessages([
                    "items.$index.quantity" =>
                    "موجودی محصول «{$product->name}» کافی نیست. " .
                        "موجودی قابل استفاده: {$availableStock}",
                ]);
            }
        }
    }

    protected function prepareForValidation(): void
    {

        $input = $this->all();

        $needToChangeFiedls = ['quantity', 'unit_price', 'discount'];

        if (isset($input['items']) && is_array($input['items'])) {

            foreach ($input['items'] as $key => $item) {
                foreach ($needToChangeFiedls as $fname) {
                    if (isset($item[$fname])) {
                        $input['items'][$key][$fname] = Number::faToEn($item[$fname]);
                    }
                }
            }
        }

        $this->replace($input);
    }

    public function rules(): array
    {
        $invoiceId = $this->route('invoice')?->id;

        return [
            // Invoice
            //'status'          => ['required', 'in:draft,pending,paid,cancelled'],
            //'discount'        => ['nullable', 'integer', 'min:0'],

            'account_id'      => ['required', 'exists:accounts,id'],
            'description'     => ['nullable', 'string'],

            # Invoice Items
            'items'                 => ['required', 'array', 'min:1'],
            'items.*.product_id'    => ['required'],
            'items.*.quantity'      => ['required', 'integer', 'min:1', 'max:65535'],
            'items.*.unit_price'    => ['required', 'integer', 'min:0'],
            'items.*.discount'      => ['required', 'integer', 'min:0', 'max:100'],
            'items.*.description'   => ['nullable', 'string'],

            # Invoice Transaction
            'transactions'                  => ['nullable', 'array'],
            'transactions.*.id'             => ['required'],
            'transactions.*.type'           => ['required', 'string', 'in:cash,cheque'],
            'transactions.*.amount'         => ['required', 'numeric', 'min:0'],

            'transactions.*.reference_no'   => ['nullable', 'string', 'max:255'],
            'transactions.*.due_date'       => ['nullable', 'date'],
            'transactions.*.description'    => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function attributes(): array
    {
        return [
            'account_id' => 'طرف حساب',
            'items' => 'اقلام فاکتور',
            'items.*.quantity' => 'تعداد محصول',
            'transactions.*.amount' => 'مبلغ تراکنش'
        ];
    }
}
