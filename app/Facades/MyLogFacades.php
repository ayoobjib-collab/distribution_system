<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class MyLogFacades extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'Logger';
    }
}
