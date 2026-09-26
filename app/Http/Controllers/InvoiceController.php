<?php

namespace App\Http\Controllers;

use App\Actions\Invoice\InvoiceStoreAction;
use App\Actions\Invoice\InvoiceUpdateAction;
use App\Enums\InvoiceStatus;
use App\Enums\RoutesName;
use App\Http\Requests\InvoiceRequest;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
                'transactions:id',
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
                'account:id,name',
                'transactions:id,invoice_id',
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
        $csrf = csrf_token();

        return $this->render(
            'Create',
            [
                'h1'      => 'ایجاد فاکتور',
                'sendUrl' => route('invoice.store'),
                'csrf'    => $csrf
            ]
        );
    }

    public function store(InvoiceRequest $request, InvoiceStoreAction $action)
    {
        $invoice = $action->execute(
            $request->validated()
        );

        return redirect(route('invoice.index'))->with(
            'msg',
            [
                'text' => 'فاکتور با موفقیت ثبت شد',
                'status' => true
            ]
        );
    }


    public function update(InvoiceRequest $request, Invoice $invoice, InvoiceUpdateAction $action)
    {
        $this->validateUser($request, $invoice);

        if ($invoice->status !== InvoiceStatus::Draft)
            return back()->with('msg', 'فاکتور کامل شده و شما قادر به ویرایش آن نیستید');

        $action->execute($request->validated(), $invoice);

        return $this->back('فاکتور بروز رسانی شد');
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
                'transactions:id,invoice_id,type,amount,due_date', //invoice_id need for work
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
