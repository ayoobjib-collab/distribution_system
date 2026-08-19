<?php

use App\Enums\RoutesName;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\ChequeAiController;
use App\Http\Controllers\ChequeController;
use App\Http\Controllers\ChequeLogsController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\InvoicePublicPreviewController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\Transaction;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web RoutesName
|--------------------------------------------------------------------------
|
| Here is where you can register web RoutesName for your application. These
| RoutesName are loaded by the RoutesNameerviceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect('/invoice');
});

/**
 * Public invoice url
 */
Route::get('/invoice/share/{hash}', [InvoicePublicPreviewController::class, 'show'])->name('invoice.public');

/**
 * User Route
 */
Route::group(['middleware' => ['auth']], function () {

    Route::middleware(['auth', 'permission:user_permission'])->group(function () {
        Route::resource('user', UserController::class);
    });

    Route::resource('invoice', InvoiceController::class);
    Route::resource('account', AccountController::class);
    Route::resource('product', ProductController::class);
    Route::resource('transaction', TransactionController::class);

    Route::patch('/invoice/{invoice}/status', [InvoiceController::class, 'updateStatus'])
        ->name('invoice.update-status');

    Route::post('/invoice/{invoice}/send-invoice', [InvoicePublicPreviewController::class, 'sendInvoice'])
        ->name('send-invoice');

    Route::prefix('api/v1')
        ->group(function () {

            Route::get('/products', [ProductController::class, 'search'])
                ->name('api.products.search');

            Route::get('/accounts', [AccountController::class, 'search'])
                ->name('api.account.search');
        });
});


Route::group(
    ['middleware' => ['guest']],
    function () {
        // User login
        Route::get(RoutesName::Login->value, [LoginController::class, 'loginForm'])->name('login');
        Route::post(RoutesName::Login->value, [LoginController::class, 'login']);
    }
);
