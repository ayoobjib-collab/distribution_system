<?php

namespace App\Models;

use App\Actions\Product\UpdateProductImages;
use App\Models\Category;
use App\Support\ProductImageSize;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'barcode',
        'unit',
        'buy_price',
        'sale_price',
        'stock',
        'image',
        'is_active',
        'description',
    ];

    protected $casts = [
        'image' => 'array',
    ];

    protected $appends = [
        'image_urls',
    ];

    public function hasEnoughStock(int $quantity): bool
    {
        return $this->stock >= $quantity;
    }

    public function decrementStock(int $quantity): void
    {
        $this->decrement('stock', $quantity);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * Create new image value for use in front.
     */
    protected function getImageUrlsAttribute(): array
    {
        $output = [];

        foreach ($this->image ?? [] as $item) {
            $images = [
                'main' => Storage::disk('public')->url($item),
            ];

            foreach (ProductImageSize::sizes() as $key => $width) {
                
                $images[$key] = Storage::disk('public')->url(
                    ProductImageSize::path($item, $key)
                );
            }

            $output[] = $images;
        }

        return $output;
    }
}
