<?php

namespace App\Enums\Trait;

trait EnumsToJson
{

    /**
     * Save enum case to array
     */
    public static function toArray(): array
    {
        return array_combine(
            array_column(self::cases(), 'name'),
            array_column(self::cases(), 'value')
        );
    }

    /**
     * Save to json file
     */
    public static function saveToJson(string $path): void
    {
        file_put_contents(
            $path,
            json_encode(self::toArray(), JSON_PRETTY_PRINT)
        );
    }
}
