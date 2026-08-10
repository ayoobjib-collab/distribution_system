<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AccountRequest extends FormRequest
{

    public function authorize(): bool
    {

        if (!auth()->check()) {
            return false;
        }

        $account = $this->route('account');

        if ($account) {
            return auth()->user()->hasRole('admin') || $account->user_id === auth()->id();
        }

        return true;
    }

    public function rules(): array
    {
        $account = $this->route('account');
        $accountId = is_object($account) ? $account->id : $account;

        $ownerId = is_object($account)
            ? $account->user_id
            : $this->user()->id;

        return [
            // 'user_id' => ['required', 'integer', Rule::in([$this->user()->id])],

            'name'          => [
                'required',
                'string',
                'max:255',
                Rule::unique('accounts', 'name')->ignore($accountId)
            ],

            'type'          => ['nullable', 'string'],

            'mobile'        => [
                'nullable',
                'string',
                'regex:/^09\d{9}$/',
                Rule::unique('accounts', 'mobile')->ignore($accountId)
            ],

            'phone'         => ['nullable', 'string', 'max:50'],
            'national_code' => ['nullable', 'string', 'digits:10'],
            'economic_code' => ['nullable', 'string', 'max:50'],
            'address'       => ['nullable', 'string'],
            'lat'           => ['nullable', 'string', 'max:50'],
            'long'          => ['nullable', 'string', 'max:50'],
            'credit_limit'  => ['nullable', 'integer', 'min:0'],
            'is_active'     => ['nullable', 'boolean'],
        ];
    }


    public function messages(): array
    {
        return [
            'mobile.regex' => 'فرمت شماره موبایل وارد شده صحیح نیست (مثال: 09123456789).',
            'mobile.unique' => 'این شماره موبایل قبلاً در سیستم ثبت شده است.',
            'national_code.digits' => 'کد ملی باید دقیقاً ۱۰ رقم باشد.',
        ];
    }
}
