<?php

namespace App\Rules;

use App\Models\Product;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AvailableStockRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $index = explode('.', $attribute)[1];

        $productId = request()->input("items.$index.product_id");

        $product = Product::find($productId);

        if (!$product)  return;

        if ($value > $product->stock) {
            $fail(
                "تعداد انتخاب شده برای محصول {$product->name} بیشتر از موجودی است. موجودی: {$product->stock}"
            );
        }
    }
}
