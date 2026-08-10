<?php

return [

    'dafault_gateway' => env('SMS_DEAFAULT_GATEWAY', 'rayganSms'),

    /*
    |--------------------------------------------------------------------------
    | SMS Gateways Configuration
    |--------------------------------------------------------------------------
    */

    'gateways' => [
        'rayganSms' => [
            'class'   => App\Services\Sms\Gateway\RayganSms::class,
            'api_key' => env('SMS_RAYGAN_API_KEY'),
            'sender' => env('SMS_RAYGAN_SENDER'),
        ],
    ],
];
