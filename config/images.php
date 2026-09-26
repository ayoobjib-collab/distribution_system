<?php

/**
 * Image configuration.
 *
 * Settings used by Intervention Image and product image processing.
 */

return [

    /*
    |--------------------------------------------------------------------------
    | Image Driver
    |--------------------------------------------------------------------------
    |
    | Intervention Image driver.
    |
    */

    'driver' => 'gd',

    /*
    |--------------------------------------------------------------------------
    | Product Images
    |--------------------------------------------------------------------------
    */

    'product' => [

        /*
        | Small/mobile image width.
        */
        'small' => 300,
        'medium' => 800
    ],

];