<?php

namespace App\Http\Controllers;

use App\Actions\Product\UpdateProductImages;
use App\Enums\RoutesName;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Support\Number;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getViewPath(): string
    {
        return 'Product';
    }

    public function index()
    {
        $this->breadcrumbs
            ->add('جدول محصولات');

        $user = auth()->user();

        $products = Product::query()
            ->when(
                !$user->hasRole('admin'),
                fn($query) => $query->where('is_active', true)
            )
            ->with('categories')
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

        $this->breadcrumbs
            ->add('محصولات', route('product.index'))
            ->add('ایجاد محصول');

        return $this->render(
            'Create',
            [
                'sendUrl' => route('product.store')
            ]
        );
    }

    public function show()
    {
        return redirect('/list');
    }

    public function store(ProductRequest $request, UpdateProductImages $updateProductImages)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active');

        /**
         * Remove image bofore create
         */
        unset($data['image']);
        $product = Product::create($data);

        if ($request->hasFile('image')) {
            $updateProductImages->handle($request, $product);
        }

        $this->updateCategory($request, $product);

        return $this->back('محصول با موفقیت ثبت شد');
    }

    public function edit(Request $request, Product $product)
    {
        $this->abortIfIsNotAdmin($request);

        $this->breadcrumbs
            ->add('محصولات', route('product.index'))
            ->add('ویرایش ' . $product->name);

        $product->load('categories:id,name');

        return $this->render(
            'Create',
            [
                'sendUrl' => route('product.update', ['product' => $product]),
                'product' => $product,
            ]
        );
    }

    public function update(ProductRequest $request, Product $product, UpdateProductImages $updateProductImages)
    {
        $this->abortIfIsNotAdmin($request);

        $validated = $request->validated();

        /**
         * Remove image before update
         * 
         * If don't remove image old images remove complately
         */
        unset($validated['image']);
        $product->update($validated);

        $updateProductImages->handle($request, $product);

        $this->updateCategory($request, $product);

        return $this->back('با موفقیت بروزرسانی شد');
    }

    public function updateCategory(ProductRequest $request, Product $product)
    {
        $product->categories()->sync($request->categories ?? []);
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
                'unit_price' => $product->sale_price,
                'stock' => $product->stock,
                'unit' => $product->unit,
            ])
        );
    }
}
