<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Log\MyLoger;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $logger = new MyLoger;
        $this->app->instance('Logger', $logger);

        // $this->app->bind('path.public', function () {
        //     return base_path('public_html');
        // });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
