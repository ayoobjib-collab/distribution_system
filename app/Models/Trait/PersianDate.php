<?php

namespace App\Models\Trait;

use Illuminate\Database\Eloquent\Casts\Attribute;

trait PersianDate
{
    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => $this->formatDate($value),
        );
    }

    public function formatDate($date)
    {
        // $format = str_replace(
        //     ['A', 'a', 'Y', 'M', 'j', 'g', 'G', 'h', 'H', 'l', 'D', 'm', 'n', 'F'],
        //     ['', '', 'yyyy', 'M', 'dd', 'H', 'H', 'HH', 'HH', 'M', 'dd', 'M', 'mm', 'MMMM'],
        //     $format
        // );

        // $format = str_replace('i', 'mm', $format);

        $timestamp = strtotime($date);

        $format = 'yyyy/M/d HH:mm';

        $formatter = new \IntlDateFormatter(
            // "en_US@calendar=persian",
            "fa_IR@calendar=persian",
            \IntlDateFormatter::FULL,
            \IntlDateFormatter::FULL,
            'Asia/Tehran',
            \IntlDateFormatter::TRADITIONAL,
            $format
        );


        return $formatter->format($timestamp);
    }
}
