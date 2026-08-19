<?php

namespace App\Services\Sms\Contracts;

interface SmsGateway
{
    public function sendSms(string $number, string $text): bool;
    public function sendSmsByPattern(string $number, string $text): bool;
}
