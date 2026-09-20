<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $buyPrice = fake()->numberBetween(100_000, 50_000_000);

        return [
            'barcode' => null,
            'name' => fake()->words(3, true),
            'unit' => 'عدد',
            'buy_price' => $buyPrice,
            'sale_price' => $buyPrice + fake()->numberBetween(10_000, 10_000_000),
            'stock' => fake()->numberBetween(0, 100),
            'is_active' => true,
        ];
    }
}