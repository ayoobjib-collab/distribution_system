<?php

namespace App\Http\Controllers;

use App\Enums\RoutesName;
use App\Http\Requests\TransactionRequest;
use App\Models\Transaction;
use Illuminate\Http\Request;


class TransactionController extends Controller
{
    public function getViewPath(): string
    {
        return 'Transaction';
    }

    public function index(Request $request)
    {
        $this->abortIfIsNotAdmin($request);

        $h1 = "لیست تمام تراکنش‌ها";

        $invoiceId = $request->get('invoiceId');

        $query = Transaction::query()
            ->with([
                'account:id,name',
                'user:id,full_name',
                'approver:id,full_name',
                'invoice:id',
            ])
            ->when(
                $invoiceId,
                fn($query) => $query->where('invoice_id', $invoiceId)
            )
            ->latest();

        $transactions = $query->paginate(20)->withQueryString();

        return $this->render(
            'Index',
            [
                'transactions' => $transactions,
                'h1'            => $h1
            ]
        );
    }

    public function update(Transaction $transaction, TransactionRequest $request)
    {
        $this->abortIfIsNotAdmin($request);

        $validated = $request->validated();

        $transaction->update($validated);

        return back()->with('msg', 'با موفقیت انجام شد');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return back()->with('msg', 'با موفقیت انجام شد');
    }
}
