<?php

namespace App\Enums\Trait;

trait EnumsToArray
{

    /**
     * Save enum case to array
     */
    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
