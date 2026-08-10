<?php

namespace App\Services\Sms\Contracts;

interface SmsGateway
{
    public function sendSms($number, $text): bool;
    public function sendSmsByPattern($number, $text): bool;
}
