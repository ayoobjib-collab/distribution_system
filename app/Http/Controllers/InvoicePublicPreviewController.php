<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Services\Sms\SmsManager;
use App\Support\InvoiceHash;
use App\Support\Number;

class InvoicePublicPreviewController extends Controller
{

    public function show(string $hash, InvoiceHash $invoiceHash)
    {
        $id = $invoiceHash->decode($hash);

        $invoice = Invoice::findOrFail($id);

        $invoice->load([
            'items.product:id,name',
            'account:id,name',
        ]);

        return view(
            'invoice',
            [
                'invoice' => $invoice,
                'subtotalWords' => Number::numberToWords($invoice->subtotal),
            ]
        );
    }

    public function sendInvoice(Invoice $invoice, SmsManager $sms)
    {
        $invoice->load('account');

        $accountNumber = $invoice?->account?->mobile;

        if ($sms->sendSms($accountNumber, $this->createSmsText($invoice->id)))
            $this->back('پیامک ارسال شد');

        $this->back('خطایی در ارسال پیامک پیش آمده', false);
    }

    public function createSmsText(int $invoiceId)
    {
        return "
        با تشکر از خرید شما 
        با کلیک روی لینک زیر می‌توانید فاکتور خود را مشاهده کنید
        آمیتیس تجارت روناک 
        " . $this->createPublicUrl($invoiceId);
    }

    public function createPublicUrl(int $invoiceId)
    {
        $hash = app(InvoiceHash::class)->encode($invoiceId);

        return route('invoice.public', [
            'hash' => $hash,
        ]);
    }
}
