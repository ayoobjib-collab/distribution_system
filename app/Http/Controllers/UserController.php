<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Enums\RoutesName;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function getViewPath(): string
    {
        return 'User';
    }

    public function index()
    {
        $h1 = "لیست تمام تراکنش‌ها";

        $users = User::with('roles')
            ->paginate(10)
            ->through(fn($user) => [
                'id' => $user->id,
                'full_name' => $user->full_name,
                'mobile' => $user->mobile,
                'is_active' => $user->is_active,
                'roles' => $user->roles->pluck('name'),
            ]);

        return $this->render(
            'Index',
            [
                'users' => $users
            ]
        );
    }

    public function create()
    {
        return $this->render(
            'Create',
            [
                'sendUrl' => RoutesName::CreateUser->value,
                // 'userType' => 
            ]
        );
    }

    public function store(UserRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'full_name' => $validated['full_name'],
            'mobile' => $validated['mobile'] ?? null,
            'password' => Hash::make($validated['mobile']),
            'is_active' => $validated['is_active'],
        ]);

        $user->assignRole('salesman');

        return back()->with('msg', 'با موفقیت ایجاد شد');
    }

    public function edit(User $user)
    {
        return $this->render(
            'Create',
            [
                'sendUrl' => RoutesName::CreateUser->value . '/' . $user->id,
                'user' => $user
            ]
        );
    }

    public function update(UserRequest $request, User $user)
    {
        $validated = $request->validated();

        $user->update($validated);

        return back()->with('msg', 'با موفقیت انجام شد');
    }

}
