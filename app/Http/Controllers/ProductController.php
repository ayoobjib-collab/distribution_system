<?php

namespace App\Http\Controllers;

use App\Enums\RoutesName;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getViewPath(): string
    {
        return 'Product';
    }

    public function index()
    {
        $user = auth()->user();

        $products = Product::query()
            ->when(
                !$user?->hasPermissionTo('product_permission'),
                fn($query) => $query->where('is_active', true)
            )
            ->paginate(10);

        return $this->render(
            'Index',
            [
                'products' => $products
            ]
        );
    }

    public function create()
    {
        return $this->render(
            'Create',
            [
                'sendUrl' => RoutesName::CreateProduct->value,
                // 'userType' => 
            ]
        );
    }

    public function store(ProductRequest $request)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active');

        Product::create($data);

        return back()->with('msg', 'با موفقیت ایجاد شد');
    }

    public function edit(Product $product, Request $request)
    {

        $user = $request->user();
        abort_unless($user?->hasPermissionTo('product_permission'), 404);

        return $this->render(
            'Create',
            [
                'sendUrl' => RoutesName::CreateProduct->value . '/' . $product->id,
                'product' => $product
            ]
        );
    }

    public function update(ProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        $product->update($validated);

        return back()->with('msg', 'با موفقیت انجام شد');
    }
}
