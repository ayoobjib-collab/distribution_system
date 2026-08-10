<?php

namespace App\Http\Requests;

use App\Domain\ValuesObject\TransactionType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class TransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        $transaction = $this->route('transaction');

        $valid =  [
            'price'             => ['required', 'integer', 'min:0'],
            'type'              => ['required', new Enum(TransactionType::class)],

            'transaction_id'    => ['nullable', 'string', 'max:100'],
            'cheque_id'         => ['nullable', 'exists:cheques,id'],

            'comment'           => ['nullable', 'string'],
        ];


        # Ignore if in update request
        if (! $transaction) {
            $valid['payer_id'] =  ['required', 'exists:clients,id'];
            $valid['receiver_id'] =  ['required', 'exists:clients,id'];
        }

        return $valid;
    }
}
