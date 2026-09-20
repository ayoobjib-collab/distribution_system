<?php

namespace App\Actions\Product;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Support\ProductImage;
use App\Support\ProductImageSize;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class UpdateProductImages
{
    public function handle(ProductRequest $request, Product $product): void
    {
        $images = $this->removeDeletedImages(
            $product->image ?? [],
            $request->old_image ?? []
        );

        $images = $this->uploadImages(
            $request,
            $product,
            $images
        );

        $product->image = $images;
        $product->save();
    }

    /**
     * Remove images that are no longer attached to the product.
     */
    private function removeDeletedImages(
        array $productImages,
        array $sentImages
    ): array {

        if (empty($productImages)) return [];

        foreach ($productImages as $key => $image) {

            if (! in_array($image, $sentImages, true)) {

                Storage::disk('public')->delete(
                    array_merge(
                        [$image],
                        ProductImageSize::paths($image)
                    )
                );

                unset($productImages[$key]);
            }
        }

        return array_values($productImages);
    }

    /**
     * Upload new product images.
     */
    private function uploadImages(
        ProductRequest $request,
        Product $product,
        array $currentImages
    ): array {

        $manager = new ImageManager(new Driver());

        foreach ($request->file('image', []) as $file) {

            $filename = uniqid('', true);

            $mainPath = "products/{$product->id}/{$filename}.webp";

            // Main image
            $image = $manager->read($file);

            Storage::disk('public')->put(
                $mainPath,
                $image->toWebp(85)
            );

            // Additional sizes
            foreach (ProductImageSize::sizes() as $size => $width) {

                $sizePath = ProductImageSize::path($mainPath, $size);

                $sizeImage = $manager->read($file);

                $sizeImage->scaleDown(
                    width: $width
                );

                Storage::disk('public')->put(
                    $sizePath,
                    $sizeImage->toWebp(80)
                );
            }

            // Only main path is stored in database.
            $currentImages[] = $mainPath;
        }

        return $currentImages;
    }
}
