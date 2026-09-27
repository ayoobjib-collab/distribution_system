<?php

namespace App\Models\Trait;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Carbon;

trait DateTools
{
    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => $this->toJalali($value),
        );
    }

    public function toJalali(string $date, $format = 'yyyy/M/d HH:mm')
    {

        $isCarbon = ($date instanceof Carbon);
        $timestamp = $isCarbon ? $date : strtotime($date);

        $formatter = new \IntlDateFormatter(
            // "en_US@calendar=persian",
            "en_US@calendar=persian", //Use fa_IR for persian numbers calendar=persian 
            \IntlDateFormatter::FULL, //$datetype: format for example 25 شهریور 1405
            \IntlDateFormatter::FULL, //$typeType: Use none for remove time
            'Asia/Tehran',
            \IntlDateFormatter::TRADITIONAL, //  'persian',
            $format
        );

        return $formatter->format($timestamp);
    }

    public function toGregory(string $persianDate)
    {
        if (!$persianDate)
            return null;

        [$year, $month, $day] = array_map('intval', explode('/', $persianDate));

        $calendar = new \IntlGregorianCalendar('Asia/Tehran');

        $calendar->set(
            \IntlCalendar::FIELD_YEAR,
            $year
        );

        $calendar->set(
            \IntlCalendar::FIELD_MONTH,
            $month - 1
        );

        $calendar->set(
            \IntlCalendar::FIELD_DAY_OF_MONTH,
            $day
        );

        return date(
            'Y-m-d',
            $calendar->getTime()
        );
    }
}
