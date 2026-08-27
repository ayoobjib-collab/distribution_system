<?php

namespace App\Http\Controllers;

use App\Enums\RoutesName;
use App\Models\Account;
use App\Http\Requests\AccountRequest;
use Illuminate\Http\Request;

class AccountController extends Controller
{

    public function getViewPath(): string
    {
        return 'Account';
    }

    public function index(Request $request)
    {
        $user = $request->user();

        $accounts = Account::query()
            ->with([
                'user:id,full_name,mobile',
            ])
            ->when(
                !$user->hasRole('admin'),
                fn($query) => $query->where('user_id', $user->id)
            )
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->string('search')->toString();

                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('mobile', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return $this->render('Index', [
            'h1' => 'لیست همه طرف حساب‌ها',
            'accounts' => $accounts,
            'filters'  => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return $this->render(
            'Create',
            [
                'sendUrl' => RoutesName::CreateAccount->value,
                // 'userType' => 
            ]
        );
    }

    public function store(AccountRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        Account::create($data);

        $this->back('حساب کاربری تغریف شد');
    }

    public function edit(Account $account, Request $request)
    {

        $this->validateUser($request, $account);

        return $this->render(
            'Create',
            [
                'sendUrl' => RoutesName::CreateAccount->value . '/' . $account->id,
                'account' => $account
            ]
        );
    }

    public function update(AccountRequest $request, Account $account)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);

        $account->update($data);

        $this->back('حساب بروز رسانی');
    }

    public function destroy(Account $account)
    {
        $account->delete();

        $this->back('حساب موقتا حذف شد');
    }

    public function search(Request $request)
    {
        $user = $request->user();

        $query = Account::query()
            ->select(['id', 'name', 'mobile'])
            ->where('user_id', $user->id);

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('mobile', 'like', "%{$search}%");
            });
        }

        $accounts = $query->latest()->get();

        return response()->json($accounts);
    }
}
