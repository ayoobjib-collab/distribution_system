<?php

namespace App\Http\Controllers;

use App\Actions\Invoice\InvoiceStoreAction;
use App\Enums\InvoiceStatus;
use App\Enums\RoutesName;
use App\Http\Requests\InvoiceRequest;
use App\Models\Account;
use App\Models\Invoice;
use App\Models\Product;
use App\Services\Sms\SmsManager;
use App\Support\InvoiceHash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class InvoiceController extends Controller
{
    public function getViewPath(): string
    {
        return 'Invoice';
    }

    public function show(int $id)
    {
        $user = auth()->user();

        $invoice = Invoice::query()
            ->when(
                !$user?->hasRole('admin'),
                fn($query) => $query->where('user_id', $user->id)
            )
            ->with([
                'items.product:id,name',
                'account:id,name',
                'user:id,full_name,mobile',
            ])
            ->findOrFail($id);

        return $this->render(
            'Show',
            [
                'invoice' => $invoice,
            ]
        );
    }

    /**
     * List of invoices
     */
    public function index()
    {
        $user = auth()->user();

        $invoices = Invoice::query()
            ->with([
                'user:id,full_name,mobile',
                'account:id,name'
            ])
            ->when(
                !$user?->hasRole('admin'),
                fn($query) => $query->where('user_id', $user->id)
            )
            ->orderby('id', 'desc')
            ->paginate(10);

        return $this->render(
            'Index',
            [
                'h1'        => 'لیست تمام فاکتورها',
                'invoices'  => $invoices,
            ]
        );
    }

    /**
     * Create form
     */
    public function create()
    {
        return $this->render(
            'Create',
            [
                'h1'        => 'ایجاد فاکتور',
                'sendUrl' => RoutesName::CreateInvoice->value,
            ]
        );
    }

    public function store(InvoiceRequest $request, InvoiceStoreAction $action)
    {
        $invoice = $action->execute(
            $request->validated()
        );

        $this->back('فاکتور با موفقیت ثتب شد');
    }


    public function update(InvoiceRequest $request, Invoice $invoice, InvoiceStoreAction $action)
    {

        $this->validateUser($request, $invoice);

        if ($invoice->status !== InvoiceStatus::Draft)
            return back()->with('msg', 'فاکتور کامل شده و شما قادر به ویرایش آن نیستید');

        $action->executeUpdate($request->validated(), $invoice);

        $this->back('فاکتور بروز رسانی شد');
    }

    public function edit(int $id)
    {
        $user = auth()->user();

        $invoice = Invoice::query()
            ->when(
                !$user?->hasRole('admin'),
                fn($query) => $query->where('user_id', $user->id)
            )
            ->with([
                'items.product:id,name,stock',
                'account:id,name',
                'user:id,full_name,mobile',
            ])
            ->findOrFail($id);

        return $this->render(
            'Create',
            [
                'h1'        => 'ویرایش فاکتور شماره ' . $invoice->id,
                'invoice' => $invoice,
            ]
        );
    }

    public function destroy(Request $request, Invoice $invoice)
    {
        $this->validateUser($request, $invoice);

        return DB::transaction(function () use ($invoice) {

            $items = $invoice->items()->get();

            foreach ($items as $item) {
                Product::where('id', $item->product_id)
                    ->lockForUpdate()
                    ->increment('stock', $item->quantity);
            }

            # Soft delete
            $invoice->delete();

            $this->back('فاکتور حذف موقت شد');
        });
    }

    public function updateStatus(Request $request, Invoice $invoice)
    {
        if (! $request->user()->hasRole('admin'))
            $this->back('شما قادر به انجام این عملیات نیستید');

        $status = $request->status;

        if (!InvoiceStatus::tryFrom($status)) {
            $this->back('مقدار وضعیت معتبر نمی‌باشد');
        }

        $invoice->update([
            'status' => $request->status,
        ]);

        $this->back('وضعیت فاکتور آپدیت شد');
    }
}
