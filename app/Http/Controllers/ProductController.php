<?php

namespace App\Http\Controllers;

use App\Enums\RoutesName;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Support\Number as Number;
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
                !$user->hasRole('admin'),
                fn($query) => $query->where('is_active', true)
            )
            ->paginate(self::$paginateCount);

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

        $product = Product::create($data);

        if ($request->hasFile('image')) {
            $this->uploadImages($request, $product);
        }

        return $this->back('محصول با موفقیت ثبت شد');
    }

    public function uploadImages(ProductRequest $request, Product $p)
    {

        $paths = [];

        foreach ($request->file('image') as $file) {
            $paths[] = $file->store('products/' . $p->id, 'public');
        }

        $p->image = $paths;
        $p->save();
    }

    public function edit(Product $product, Request $request)
    {
        $this->abortIfIsNotAdmin($request);

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
        $this->abortIfIsNotAdmin($request);

        $validated = $request->validated();

        $product->update($validated);

        return $this->back('با موفقیت بروزرسانی شد');
    }

    public function search(Request $request)
    {
        $search = $request->string('search')
            ->trim()
            ->stripTags()
            ->toString();

        $search = Number::faToEn($search);

        $products = Product::query()
            ->select([
                'id',
                'name',
                'sale_price',
                'stock',
                'unit',
            ])
            ->where('is_active', true)
            ->when($request->filled('search'), function ($query) use ($search) {
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
