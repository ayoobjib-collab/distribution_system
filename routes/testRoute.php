<?php

use App\Enums\AdminRoute;
use App\Facades\MyLogFacades;
use App\Services\Sms\SmsManager;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Morilog\Jalali\Jalalian;

// Route::get('/clear-cache', function () {

//     //dd(public_path());
//     $exitCode = //Artisan::call('optimize:clear');
//     // return what you want
// });

Route::get('/t', function (Request $request) {

    echo Hash::make('09131514521');

    //$d = Jalalian::fromCarbon(Carbon::parse('1405/10/20'))->format('Y/m/d');


    //echo Carbon::parse('2026-09-11');

    // $carbonDate =  Jalalian::fromFormat('Y/m/d', '1405-10-18')->toCarbon();


    // echo '<br>';

    // echo $carbonDate;

    // echo '<br>';

    // echo Jalalian::fromCarbon($carbonDate)->format('Y/m/d');


    //dd($d);


    //Cache::put('someKeyFor12', 458, $seconds = 10);

    // cache('')

    // $user = $request->user(); //160.217
    // //$user = auth()->user(); //160.212

    // echo $user->id;

    // echo microtime(true) - LARAVEL_START;
    // // echo '<br>';
    // // echo microtime(true);

    // exit;

    // dd(php_sapi_name());
    // echo 'hi';
    // fastcgi_finish_request();

    // sleep(10);

    //return Inertia::render('Admin/Test/Test');
});


Route::get('/provider', function () {

    //Logger register in app service provider
    // app('Logger')->go();

    MyLogFacades::go(); // = app('Logger')->go()
});

Route::get('/config', function () {

    // $defaultGateway = config('sms.dafault_gateway');
    // $defaultGateway = config("sms.gateways.$defaultGateway.class");
    // dd($defaultGateway);
    // exit;

    $sms = new SmsManager();
    $s = $sms->sendSmsByPattern('0955513', 'Hello');

    dd($s);
});
