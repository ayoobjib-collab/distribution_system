<?php

namespace App\Http\Middleware;

use App\Enums\AdminRoute;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        $loginRout = route('login');

        // if ($request->is(AdminRoute::Panel->value) || $request->is(AdminRoute::Panel->value . '/*')) {
        //     $loginRout = AdminRoute::getFullUrl(AdminRoute::Login);
        // }

        return $request->expectsJson() ? null : $loginRout;
    }
}
