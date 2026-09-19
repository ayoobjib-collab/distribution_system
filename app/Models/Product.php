<?php

namespace App\Models;

use App\Models\Category as Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
}
