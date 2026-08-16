<?php

namespace App\Http\Requests;

use App\Domain\ValuesObject\Bank;
use App\Domain\ValuesObject\ChequeType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        $invoiceId = $this->route('invoice')?->id;

        //sale_price to unit_price
        return [
            // Invoice
            'account_id'      => ['required', 'exists:accounts,id'],
            //'status'          => ['required', 'in:draft,pending,paid,cancelled'],
            //'discount'        => ['nullable', 'integer', 'min:0'],
            'description'     => ['nullable', 'string'],

            # Invoice Items
            'items'                 => ['required', 'array', 'min:1'],
            'items.*.product_id'    => ['required', 'exists:products,id'],
            'items.*.quantity'      => ['required', 'integer', 'min:1', 'max:65535'],
            'items.*.unit_price'    => ['required', 'integer', 'min:0'],
            'items.*.discount'      => ['required', 'integer', 'min:0', 'max:40'],
            'items.*.description'   => ['nullable', 'string'],
            
        ];
    }
}
