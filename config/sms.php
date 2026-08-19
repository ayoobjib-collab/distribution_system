<?php

return [

    'dafault_gateway' => env('SMS_DEAFAULT_GATEWAY', 'ippanel'),

    /*
    |--------------------------------------------------------------------------
    | SMS Gateways Configuration
    |--------------------------------------------------------------------------
    */

    'gateways' => [
        'rayganSms' => [
            'class'   => App\Services\Sms\Gateway\Ippanel::class,
            'api_key' => env('SMS_RAYGAN_API_KEY'),
            'sender' => env('SMS_RAYGAN_SENDER'),
        ],
        
        'ippanel' => [
            'class'   => App\Services\Sms\Gateway\Ippanel::class,
            'userName' => env('SMS_IPPANEL_USERNAME'),
            'password' => env('SMS_IPPANEL_PASSWORD'),
        ],
    ],
];
