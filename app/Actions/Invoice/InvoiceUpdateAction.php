<?php

namespace App\Actions\Invoice;

use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class InvoiceUpdateAction
{

    public function execute(array $data, Invoice $invoice)
    {
        return DB::transaction(function () use ($invoice, $data) {

            # Remvoe old items and stock
            $oldItems = $invoice->items()->get();

            foreach ($oldItems as $item) {
                Product::where('id', $item->product_id)
                    ->increment('stock', $item->quantity);
            }

            $invoice->items()->delete();

            # Remove old transactions
            $invoice->transactions()->delete();

            # Add new stock
            $products = $this->checkProductStock($data['items']);

            $subtotal = 0;
            $itemsData = $this->addTotalAndSubtotalToData(
                $products,
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

            $this->addTransactions($invoice, $data);
        });
    }

    /**
     * @param \Illuminate\Support\Collection $products
     * @param array $items
     * @param int $subtotal
     * @return array
     */
    protected function addTotalAndSubtotalToData($products, array $items, int &$subtotal)
    {
        $i = collect($items)

            ->map(function ($item) use (&$subtotal, $products) {

                # Find price form base product
                $product = $products->get($item['product_id']);

                if (!$product) {
                    throw new \Exception("محصول با شناسه {$item['product_id']} یافت نشد.");
                }

                # Use product price instead of form price
                $item['unit_price'] = $product->sale_price;

                $totalItem = ($item['unit_price'] * $item['quantity']);

                if (isset($item['discount'])) {
                    $totalItem -= ($totalItem * ($item['discount'] / 100));
                }

                $subtotal += $totalItem;

                return array_merge($item, ['total' => $totalItem]);
            });

        return $i;
    }

    protected function checkProductStock(array $items)
    {

        $products = Product::whereIn(
            'id',
            collect($items)->pluck('product_id')
        )
            ->lockForUpdate()
            ->get()
            ->keyBy('id');

        foreach ($items as $item) {

            $product = $products->get($item['product_id']);

            if (!$product->hasEnoughStock($item['quantity'])) {
                throw new \Exception(
                    "موجودی کالای {$product->name} کافی نیست."
                );
            }
        }


        foreach ($items as $index => $item) {

            $product = $products->get($item['product_id']);

            if (!$product->hasEnoughStock($item['quantity'])) {
                throw ValidationException::withMessages([
                    "items.$index.quantity" =>
                    "موجودی کالای {$product->name} کافی نیست. موجودی فعلی: {$product->stock}",
                ]);
            }
        }

        return $products;
    }

    private function addTransactions(Invoice $invoice, array $data)
    {
        // Create new transactions
        foreach ($data['transactions'] ?? [] as $transaction) {

            $invoice->transactions()->create([
                'account_id'   => $data['account_id'],
                'user_id'      => $invoice->user->id,
                'type'         => $transaction['type'],
                'reference_no' => $transaction['reference_no'] ?? null,
                'amount'       => $transaction['amount'],
                'due_date'     => $transaction['due_date'] ?? null,
                'description'  => $transaction['description'] ?? null,
            ]);
        }
    }
}
