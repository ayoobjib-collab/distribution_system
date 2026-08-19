<?php

namespace App\Support;

class Number
{
    public static function faToEn(string $value)
    {
        if ($value === null) return null;

        $persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        $arabic  = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        $english = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        return str_replace(
            array_merge($persian, $arabic),
            array_merge($english, $english),
            (string) $value
        );
    }

    public static function numberToWords(int $number): string
    {

        if ($number === 0) {
            return 'صفر';
        }

        if ($number < 0) {
            return 'منفی ' . self::numberToWords(abs($number));
        }

        $ones = [
            '',
            'یک',
            'دو',
            'سه',
            'چهار',
            'پنج',
            'شش',
            'هفت',
            'هشت',
            'نه',
            'ده',
            'یازده',
            'دوازده',
            'سیزده',
            'چهارده',
            'پانزده',
            'شانزده',
            'هفده',
            'هجده',
            'نوزده'
        ];

        $tens = [
            '',
            '',
            'بیست',
            'سی',
            'چهل',
            'پنجاه',
            'شصت',
            'هفتاد',
            'هشتاد',
            'نود'
        ];

        $hundreds = [
            '',
            'صد',
            'دویست',
            'سیصد',
            'چهارصد',
            'پانصد',
            'ششصد',
            'هفتصد',
            'هشتصد',
            'نهصد'
        ];

        $scales = [
            '',
            'هزار',
            'میلیون',
            'میلیارد',
            'تریلیون'
        ];

        $convertBelowThousand = function (int $num) use ($ones, $tens, $hundreds): string {
            $parts = [];

            if ($num >= 100) {
                $parts[] = $hundreds[intdiv($num, 100)];
                $num %= 100;
            }

            if ($num >= 20) {
                $parts[] = $tens[intdiv($num, 10)];
                $num %= 10;

                if ($num > 0) {
                    $parts[] = $ones[$num];
                }
            } elseif ($num > 0) {
                $parts[] = $ones[$num];
            }

            return implode(' و ', $parts);
        };

        $parts = [];
        $scaleIndex = 0;

        while ($number > 0) {
            $chunk = $number % 1000;

            if ($chunk > 0) {
                $text = $convertBelowThousand($chunk);

                if ($scaleIndex > 0) {
                    $text .= ' ' . $scales[$scaleIndex];
                }

                array_unshift($parts, $text);
            }

            $number = intdiv($number, 1000);
            $scaleIndex++;
        }

        return implode(' و ', $parts);
    }
}
