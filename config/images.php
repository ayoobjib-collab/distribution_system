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
        'small' => 500,
        'medium' => 800
    ],

];