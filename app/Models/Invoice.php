<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'user_id',
        'type',
        'mobile',
        'status',
        'discount',
        'tax',
        'shipping_cost',
        'subtotal',
        'settlement_days',
        'description',
    ];

    protected $casts = [
        'credit_limit' => 'integer',
        'is_active'    => 'boolean',
    ];

    public function items()
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
