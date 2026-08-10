<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            $table->string('sku')->nullable()->unique();
            $table->string('barcode')->nullable()->unique();

            $table->string('name');
            $table->string('unit')->default('عدد');

            $table->unsignedBigInteger('buy_price')->default(0);
            $table->unsignedBigInteger('sale_price')->default(0);
            $table->unsignedSmallInteger('stock')->default(0);

            $table->boolean('is_active')->default(true);
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('accounts', function (Blueprint $table) {

            $table->id();

            # Add in another migration
            // $table->foreignId('user_id')
            //     ->constrained('users')
            //     ->restrictOnDelete();

            $table->string('name')->unique();
            $table->string('type')->default('store');
            $table->string('mobile')->nullable()->unique();
            $table->string('phone')->nullable();

            $table->string('national_code')->nullable();
            $table->string('economic_code')->nullable();

            $table->text('address')->nullable();
            $table->string('lat')->nullable();
            $table->string('long')->nullable();

            $table->unsignedBigInteger('credit_limit')->default(0);

            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_no')->unique();

            $table->foreignId('account_id')
                ->constrained('accounts')
                ->restrictOnDelete();

            $table->foreignId('user_id')
                ->constrained('users')
                ->restrictOnDelete();

            $table->string('type')->default('sale');
            $table->string('status')->default('draft');

            $table->unsignedBigInteger('discount')->default(0);

            $table->unsignedBigInteger('tax')->default(0);
            $table->unsignedBigInteger('shipping_cost')->default(0);
            $table->unsignedBigInteger('subtotal')->default(0);

            $table->unsignedSmallInteger('settlement_days')->default(0);

            $table->text('description')->nullable();

            $table->timestamps();

            $table->softDeletes();

            $table->index(['account_id', 'status']);
            $table->index(['type', 'status']);
        });

        Schema::create('invoice_items', function (Blueprint $table) {

            $table->id();

            $table->foreignId('invoice_id')
                ->constrained('invoices')
                ->cascadeOnDelete();

            $table->foreignId('product_id')
                ->constrained('products')
                ->restrictOnDelete();

            $table->unsignedBigInteger('unit_price');
            $table->unsignedSmallInteger('quantity');
            $table->unsignedBigInteger('tax')->default(0);
            $table->unsignedSmallInteger('discount')->default(0);
            $table->unsignedBigInteger('total');

            $table->text('description')->nullable();

            $table->timestamps();

            $table->index(['invoice_id', 'product_id']);
        });

        Schema::create('transactions', function (Blueprint $table) {

            $table->id();

            $table->foreignId('account_id')
                ->constrained('accounts')
                ->restrictOnDelete();

            $table->foreignId('user_id')
                ->constrained('users')
                ->restrictOnDelete();

            $table->foreignId('invoice_id')
                ->nullable()
                ->constrained('invoices')
                ->nullOnDelete();

            $table->string('type');

            $table->unsignedBigInteger('amount');

            $table->string('payment_method')->nullable();

            $table->string('reference_no')->nullable();

            $table->text('description')->nullable();

            $table->timestamps();

            $table->softDeletes();

            $table->index(['account_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('distribution_tables');
    }
};
