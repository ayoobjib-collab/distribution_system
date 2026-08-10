<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvoiceItem extends Model
{
    protected $table = 'invoice_items';

    protected $fillable = [
        'invoice_id',
        'product_id',
        'unit_price',
        'quantity',
        'tax',
        'discount',
        'total',
        'description',
    ];

    protected $casts = [
        'invoice_id' => 'integer',
        'product_id' => 'integer',
        'unit_price' => 'integer',
        'quantity'   => 'integer',
        'tax'        => 'integer',
        'discount'   => 'integer',
        'total'      => 'integer',
    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
