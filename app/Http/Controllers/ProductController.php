<?php

namespace App\Http\Controllers;

use App\Enums\RoutesName;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function create(Request $request)
    {

        $this->abortIfIsNotAdmin($request);

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

    public function search(Request $request)
    {
        $products = Product::query()
            ->select([
                'id',
                'name',
                'sale_price',
                'stock',
                'unit',
            ])
            ->where('is_active', true)
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->string('search')->toString();

                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->limit(20)
            ->get();

        return response()->json(
            $products->map(fn($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'sale_price' => $product->sale_price,
                'stock' => $product->stock,
                'unit' => $product->unit,
            ])
        );
    }
}
