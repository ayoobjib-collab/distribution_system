<?php

namespace App\Models;

use App\Models\Trait\DateTools;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory, SoftDeletes, DateTools;

    protected $fillable = [
        'account_id',
        'user_id',
        'invoice_id',
        'approved_by',
        'type',
        'status',
        'amount',
        'reference_no',
        'due_date',
        'description',
        'approved_at',
    ];

    protected $casts = [
        'amount' => 'integer',
        'due_date' => 'date',
        'approved_at' => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Appends
    |--------------------------------------------------------------------------
    */

    protected $appends = [
        'due_date_fa', //presian date
        'approved_at_fa'
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class, 'invoice_id');
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /*
    |--------------------------------------------------------------------------
    | Change data
    |--------------------------------------------------------------------------
    */

    protected function dueDate(): Attribute
    {
        return Attribute::make(

            get: function ($value) {
                if ($value === null) return '-';
                return $this->toJalali($value, 'yyyy-M-d');
            },
            # Change persian date to carbon format without package
            // set: fn($value) => Jalalian::fromFormat('Y/m/d', $value)->toCarbon(),
            set: function ($value) {
                if (empty($value)) return null;
                return $this->toGregory($value);
            },
        );
    }

    protected function approvedAt(): Attribute
    {
        return Attribute::make(
            set: function ($value) {
                return $this->toGregory($value);
            },
        );
    }

    public function getDueDateFaAttribute(): string
    {
        if ($this->due_date === null)
            return '-';

        return $this->toJalali($this->due_date, 'yyyy/M/d');
    }

    public function getApprovedAtFaAttribute()
    {
        if ($this->approved_at === null)
            return '-';

        return $this->toJalali($this->approved_at, 'yyyy/M/d');
    }
}
