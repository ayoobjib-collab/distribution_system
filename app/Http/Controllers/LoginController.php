<?php

namespace App\Http\Controllers;

use App\Enums\RoutesName;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Nette\Schema\ValidationException;

class LoginController extends Controller
{

    public function getViewPath(): string
    {
        return 'Login';
    }

    public function loginForm()
    {
        return $this->render(
            'Index',
            ['sendUrl' => RoutesName::Login->value]
        );
    }

    /**
     * Login
     */
    public function login(Request $request)
    {
        $credentials = $request->only('mobile', 'password');

        if (Auth::attempt(
            [
                'mobile' => $credentials['mobile'],
                'password' => $credentials['password'],
                'is_active' => 1,
            ],
            remember: true
        )) {
            $request->session()->regenerate();
            return Inertia::location('/');
        }

        return back()->withErrors([
            'mobile' => 'اطلاعات ورود نادرست است',
        ]);
    }
}
