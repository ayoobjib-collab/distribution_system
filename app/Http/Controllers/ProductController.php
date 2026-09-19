<?php

namespace App\Http\Controllers;

use App\Enums\RoutesName;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Support\Number as Number;
use Illuminate\Support\Facades\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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

    public function uploadImages(ProductRequest $request, Product $p, array $currentProductImages = [])
    {
        $paths = $currentProductImages;

        foreach ($request->file('image') as $file) {
            $paths[] = $file->store('products/' . $p->id, 'public');
        }

        $p->image = $paths;
        $p->save();

        /**
         * 
         */
        $paths = $currentProductImages;

        $directory = 'products/' . $p->id;

        Storage::disk('public')->makeDirectory($directory);

        foreach ($request->file('image', []) as $file) {

            # Random name 
            $filename = Str::uuid() . '.webp';

            $originalPath = $directory . '/' . $filename;
            $mediumPath = $directory . '/' . Str::beforeLast($filename, '.') . '-800.webp';
            $mobilePath = $directory . '/' . Str::beforeLast($filename, '.') . '-400.webp';

            //Save Main image
            Image::read($file)
                ->toWebp(85)
                ->save(storage_path('app/public/' . $originalPath));

            //Save Medium image
            Image::read($file)
                ->scaleDown(width: 800)
                ->toWebp(80)
                ->save(storage_path('app/public/' . $mediumPath));

            //Save Small image
            Image::read($file)
                ->scaleDown(width: 400)
                ->toWebp(75)
                ->save(storage_path('app/public/' . $mobilePath));

            # SAVE ORGINAL NAME
            $paths[] = $originalPath;
        }

        $p->image = array_values($paths);
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

        /**
         * Remove image before update
         * 
         * If image not remove old images remove complately
         */
        unset($validated['image']);
        $product->update($validated);

        $productImages = $this->updateProductImagesList($request, $product);

        if ($request->hasFile('image')) {
            $this->uploadImages($request, $product, $productImages);
        } else {

            # Save images list if new image file not sent
            $product->image = $productImages;
            $product->save();
        }

        return $this->back('با موفقیت بروزرسانی شد');
    }

    /**
     * Upload product images 
     * 
     * Check old images by new images
     */
    private function updateProductImagesList(ProductRequest $request, Product $product)
    {
        $productImages  = $product->image ?? [];
        $sentImages     = $request->old_image ?? [];

        if (empty($productImages)) return [];

        foreach ($productImages as $key => $img) {

            # Check productImags by sent images
            if (! in_array($img, $sentImages)) {
                Storage::disk('public')->delete($img);

                unset($productImages[$key]);
            }
        }

        return array_values($productImages);
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
