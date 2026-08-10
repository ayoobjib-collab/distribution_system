<?php

namespace App\Http\Controllers;

use App\Domain\ValuesObject\TransactionType;
use App\Enums\RoutesName;
use App\Http\Requests\TransactionRequest;
use App\Models\Client;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class TransactionController extends Controller
{
    public function getViewPath(): string
    {
        return 'Transaction';
    }

    public function index(Request $request)
    {
        $h1 = "لیست تمام تراکنش‌ها";

        $financialSummary = [
            'outbound' => 0,
            'inbound'  => 0,
            'balance'  => 0,
        ];

        $query = Transaction::query()
            ->with(['payer', 'receiver', 'cheque'])
            ->orderBy('created_at', 'DESC');

        return $this->render(
            'Index',
            [

                'msg'               => session('msg')
            ]
        );
    }

    /**
     * Calc user trans
     *
     * @param int $clientId
     * @return array
     */
    private function calculateClientBalance(int $clientId): array
    {
        $outbound = Transaction::where('payer_id', $clientId)->sum('price');

        $inbound = Transaction::where('receiver_id', $clientId)->sum('price');

        return [
            'outbound' => (float) $outbound,
            'inbound'  => (float) $inbound,
            'balance'  => (float) ($outbound - $inbound),
        ];
    }

    public function create()
    {
        return $this->render(
            'Create',
            [
                'sendUrl'           => RoutesName::CreateTransaction->value,
                'msg'               => session('msg', null),
                'transactionType'   => TransactionType::options(),
            ]
        );
    }

    public function store(TransactionRequest $request)
    {
        $validated = $request->validated();

        $transaction = Transaction::create([
            'price'             => $validated['price'],
            'type'              => $validated['type'],
            'transaction_id'    => $validated['transaction_id'] ?? null,
            'cheque_id'         => $validated['cheque_id'] ?? null,
            'payer_id'          => $validated['payer_id'],
            'receiver_id'       => $validated['receiver_id'],
            'comment'           => $validated['comment'] ?? null,
        ]);

        return back()->with('msg', 'با موفقیت انجام شد');
    }

    public function update(Transaction $transaction, TransactionRequest $request)
    {
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
