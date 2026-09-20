<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Create 10 categories
        $categories = collect([
            'موبایل',
            'لپ تاپ',
            'تبلت',
            'ساعت',
            'هدفون',
            'لوازم جانبی',
            'دوربین',
            'تلویزیون',
            'کنسول بازی',
            'لوازم خانگی',
        ])->map(fn($name) => Category::create(
            [
                'name' => $name,
                'slug' => fake()->slug()
            ]
        ));

        Product::factory()
            ->count(100)
            ->create()
            ->each(function (Product $product) use ($categories) {
                $product->categories()->attach(
                    $categories
                        ->random(rand(1, 3))
                        ->pluck('id')
                        ->toArray()
                );
            });
    }
}
