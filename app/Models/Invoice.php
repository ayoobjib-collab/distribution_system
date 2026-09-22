<?php

namespace App\Models;

use App\Enums\InvoiceStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'account_id',
        'user_id',
        'type',
        'status',
        'tax',
        'shipping_cost',
        'subtotal',
        'description',
    ];

    protected $casts = [
        'status'       => InvoiceStatus::class,
        'credit_limit' => 'integer',
        'is_active'    => 'boolean',
    ];

    protected $appends = [
        'status_label',
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

    public function getStatusLabelAttribute(): ?string
    {
        return $this->status?->label();
    }
}
