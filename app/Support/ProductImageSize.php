<?php

namespace App\Support;

class ProductImageSize
{
    
    public static function path(string $image, string $size): string
    {
        return pathinfo($image, PATHINFO_DIRNAME)
            . '/'
            . pathinfo($image, PATHINFO_FILENAME)
            . "-{$size}.webp";
    }

    public static function sizes(): array
    {
        return config('images.product', []);
    }

    public static function paths(string $image): array
    {
        return collect(self::sizes())
            ->mapWithKeys(
                fn($width, $size) => [
                    $size => self::path($image, $size),
                ]
            )
            ->all();
    }
}
