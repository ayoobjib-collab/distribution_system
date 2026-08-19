<?php

namespace App\Enums;

enum InvoiceStatus: string
{
    case Draft = 'draft';
    case Complete = 'complete';

    /**
     * Translate banks
     */
    public function label(): string
    {
        return match ($this) {
            self::Draft          => 'ثبت شده',
            self::Complete       => 'کامل شده',
        };
    }

    
}
