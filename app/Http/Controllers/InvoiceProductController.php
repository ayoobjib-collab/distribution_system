<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class InvoiceProductController
{

    public function getProducts(Request $request)
    {
        $items = $request->input('products', []);

        if (empty($items)) {
            return response()->json([]);
        }

        $productIds = collect($items)
            ->pluck('product_id')
            ->unique()
            ->values();

        $products = Product::whereIn('id', $productIds)->get();

        $result = $products->map(function ($product) use ($items) {

            $storedItem = collect($items)->firstWhere(
                'product_id',
                $product->id
            );

            $discount = intval($storedItem['discount'] ?? 0);

            $discount = max(0, min(100, $discount));

            $quantity = (int) ($storedItem['quantity'] ?? 1);

            $quantity = max(
                1,
                min($quantity, (int) $product->stock)
            );

            return [
                'id' => $product->id,
                'name' => $product->name,
                'unit_price' => intval($product->sale_price),
                'stock' => (int) $product->stock,
                'unit' => $product->unit,
                'quantity' => $quantity,
                'discount' => $discount,
            ];
        })->values();

        return response()->json($result);
    }
}
