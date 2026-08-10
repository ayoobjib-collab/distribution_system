<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'user_id',
        'type',
        'mobile',
        'phone',
        'national_code',
        'economic_code',
        'address',
        'lat',
        'long',
        'credit_limit',
        'is_active',
    ];

    protected $casts = [
        'credit_limit' => 'integer',
        'is_active'    => 'boolean',
    ];

    /**
     * ارتباط با فاکتورهای مربوط به این طرف‌حساب
     */
    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
