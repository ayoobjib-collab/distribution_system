<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Morilog\Jalali\Jalalian;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;

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
            //get: fn($value) => //add new attribute for show persian date
            set: fn($value) => Jalalian::fromFormat('Y/m/d', $value)->toCarbon(),
        );
    }


    public function getDueDateFaAttribute(): string
    {
        if ($this->due_date === null) {
            return '-';
        }

        return $this->fromDateTime($this->due_date);

        $date = Carbon::parse($this->due_date);

        return $this->fromDateTime($date);
    }
}
