<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Inertia\Inertia;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // Share app name globally as 'flash' prop (just an example)
        //Inertia::share('flash', config('app.name'));

        Gate::define('create-plan', function (User $user, Plan $plan) {
            return $user->role === $plan->id;
        });
    }
}
