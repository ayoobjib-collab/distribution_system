<?php

namespace App\Http\Controllers;

use App\Enums\RoutesName;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function getViewPath(): string
    {
        return 'User';
    }

    public function index(Request $request)
    {
        $this->abortIfIsNotAdmin($request);

        $h1 = "لیست تمام کاربران";

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
                'users' => $users,
                'h1'    => $h1
            ]
        );
    }

    public function create(Request $request)
    {
        $this->abortIfIsNotAdmin($request);

        $this->breadcrumbs->add('کاربران', route('user.index'));

        return $this->render(
            'Create',
            [
                'sendUrl' => route('user.store'),
                // 'userType' => 
            ]
        );
    }

    public function store(UserRequest $request)
    {
        $this->abortIfIsNotAdmin($request);

        $validated = $request->validated();

        $user = User::create([
            'full_name' => $validated['full_name'],
            'mobile' => $validated['mobile'] ?? null,
            'password' => Hash::make($validated['mobile']),
            'is_active' => $validated['is_active'],
        ]);

        $user->assignRole('salesman');

        $this->back('با موفقیت ایجاد شد');
    }

    public function edit(User $user)
    {
        return $this->render(
            'Create',
            [
                'sendUrl' => route('user.update', [$user->id]),
                'user' => $user
            ]
        );
    }

    public function update(UserRequest $request, User $user)
    {
        $this->abortIfIsNotAdmin($request);

        $validated = $request->validated();

        $user->update($validated);

        $this->back('با موفقیت بروزرسانی شد');
    }
}
