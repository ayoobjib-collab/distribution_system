<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{

    public function authorize(): bool
    {
        return $this->user()?->hasPermissionTo('product_permission') ?? false;
    }

    public function rules(): array
    {
        $product = $this->route('product');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('products', 'name')
                    ->ignore($product?->id),
            ],

            'old_image' => ['nullable'],
            'image' => ['nullable', 'array'],
            'image.*' => ['file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],

            'barcode' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products', 'barcode')
                    ->ignore($product?->id),
            ],

            'unit' => ['required', 'string', 'max:100'],

            // 'buy_price' => ['required', 'integer', 'min:0'],

            'sale_price' => ['required', 'integer', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            'description' => ['nullable', 'string'],

            // categories
            'categories' => [
                'nullable',
                'array',
            ],

            'categories.*' => [
                'integer',
                'exists:categories,id',
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'image' => 'تصویر',
            'image.*' => 'تصویر',
            'categories' => 'دسته‌بندی‌ها',
            'categories.*' => 'دسته‌بندی',
        ];
    }
}
