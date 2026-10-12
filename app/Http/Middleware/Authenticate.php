<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as AuthenticateMiddleware;
use Illuminate\Http\Request;

class Authenticate extends AuthenticateMiddleware
{

    /**
     * Check user is active or not
     */
    public function handle($request, Closure $next, ...$guards)
    {
        $this->logoutUserIfNotActive($request);

        return parent::handle($request, $next, ...$guards);
    }

    protected function logoutUserIfNotActive(Request $request)
    {
        if ($request->user() && !$request->user()->is_active) {

            auth()->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('login');
        }
    }

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
