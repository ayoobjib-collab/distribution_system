<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'barcode',
        'unit',
        'buy_price',
        'sale_price',
        'stock',
        'is_active',
        'description',
    ];

    public function hasEnoughStock(int $quantity): bool
    {
        return $this->stock >= $quantity;
    }

    public function decrementStock(int $quantity): void
    {
        $this->decrement('stock', $quantity);
    }
}
