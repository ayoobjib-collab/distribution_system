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

    public function formatDate(string $date)
    {

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
