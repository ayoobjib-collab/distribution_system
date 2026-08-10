<?php

namespace App\Http\Requests;

use App\Domain\ValuesObject\Bank;
use App\Domain\ValuesObject\ChequeType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class InvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check(); 
    }

    public function rules(): array
    {
        $invoiceId = $this->route('invoice')?->id;

        return [
            // Invoice
            'account_id'      => ['required', 'exists:accounts,id'],
            'invoice_no'      => ['required', 'string', Rule::unique('invoices')->ignore($invoiceId)],
            'type'            => ['required', 'in:sale,purchase,return'],
            'status'          => ['required', 'in:draft,pending,paid,cancelled'],
            'settlement_days' => ['required', 'integer', 'min:0', 'max:365'],
            'discount'        => ['nullable', 'integer', 'min:0'],
            'tax'             => ['nullable', 'integer', 'min:0'],
            'shipping_cost'   => ['nullable', 'integer', 'min:0'],
            'description'     => ['nullable', 'string'],

            # Invoice Items
            'items'                 => ['required', 'array', 'min:1'],
            'items.*.product_id'    => ['required', 'exists:products,id'],
            'items.*.quantity'      => ['required', 'integer', 'min:1', 'max:65535'],
            'items.*.unit_price'    => ['required', 'integer', 'min:0'],
            'items.*.discount'      => ['nullable', 'integer', 'min:0', 'max:100'],
            'items.*.tax'           => ['nullable', 'integer', 'min:0'],
            'items.*.description'   => ['nullable', 'string'],
        ];
    }
}
