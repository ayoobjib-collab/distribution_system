<?php

namespace App\Http\Requests;

use App\Domain\ValuesObject\Bank;
use App\Domain\ValuesObject\ChequeType;
use App\Support\Number;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
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
            'items.*.product_id'    => ['required', 'exists:products,id'],
            'items.*.quantity'      => ['required', 'integer', 'min:1', 'max:65535'],
            'items.*.unit_price'    => ['required', 'integer', 'min:0'],
            'items.*.discount'      => ['required', 'integer', 'min:0', 'max:40'],
            'items.*.description'   => ['nullable', 'string'],

        ];
    }

    public function attributes(): array
    {
        return [
            'account_id' => 'طرف حساب',
            'items' => 'اقلام فاکتور',
        ];
    }
}
