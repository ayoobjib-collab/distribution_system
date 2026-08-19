<?php

namespace App\Actions\Invoice;

use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InvoiceStoreAction
{

    public function execute(array $data)
    {
        return DB::transaction(function () use ($data) {

            $products = $this->checkProductStock($data['items']);

            $subtotal = 0;
            $itemsData = $this->addTotalAndSubtotalToData($data['items'], $subtotal);

            # Create invoice
            $invoice = Invoice::create([
                'account_id'      => $data['account_id'],
                'user_id'         => Auth::id(),
                'subtotal'        => $subtotal,
                'description'     => $data['description'] ?? '',
            ]);


            foreach ($itemsData as $item) {
                $invoice->items()->create($item);
                $products->get($item['product_id'])
                    ->decrementStock($item['quantity']);
            }
        });
    }

    public function executeUpdate(array $data, Invoice $invoice)
    {
        return DB::transaction(function () use ($invoice, $data) {

            # Remvoe old items and stock
            $oldItems = $invoice->items()->get();

            foreach ($oldItems as $item) {
                Product::where('id', $item->product_id)
                    ->increment('stock', $item->quantity);
            }

            $invoice->items()->delete();

            # Add new stock
            $products = $this->checkProductStock($data['items']);

            $subtotal = 0;
            $itemsData = $this->addTotalAndSubtotalToData(
                $data['items'],
                $subtotal
            );

            $invoice->update([
                'subtotal'    => $subtotal,
                'description' => $validated['description'] ?? '',
            ]);

            /*
            * Create new items and decrease stock.
            */
            foreach ($itemsData as $item) {
                $invoice->items()->create($item);
                $products
                    ->get($item['product_id'])
                    ->decrementStock($item['quantity']);
            }
        });
    }

    protected function addTotalAndSubtotalToData(array $itemsData, int &$subtotal)
    {
        $i = collect($itemsData)

            ->map(function ($item) use (&$subtotal) {

                $totalItem = ($item['unit_price'] * $item['quantity']);

                if (isset($item['discount'])) {
                    $totalItem -= ($totalItem * ($item['discount'] / 100));
                }

                $subtotal += $totalItem;

                return array_merge($item, ['total' => $totalItem]);
            });

        return $i;
    }

    protected function checkProductStock(array $itemsData)
    {

        $products = Product::whereIn(
            'id',
            collect($itemsData)->pluck('product_id')
        )
            ->lockForUpdate()
            ->get()
            ->keyBy('id');

        foreach ($itemsData as $item) {
            $product = $products->get($item['product_id']);

            if (!$product->hasEnoughStock($item['quantity'])) {
                throw new \Exception(
                    "موجودی کالای {$product->name} کافی نیست."
                );
            }
        }

        return $products;
    }
}
