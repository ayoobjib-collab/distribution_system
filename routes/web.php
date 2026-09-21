<?php

use App\Enums\RoutesName;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\InfinitePage\ProductController as IPProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\InvoicePublicPreviewController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductListController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;

use Illuminate\Support\Facades\Route;

use App\Models\Transaction;
use App\Support\ProductImageSize;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
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
    Route::resource('category', CategoryController::class);

    Route::get('/list', [ProductListController::class, 'run']);

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

            Route::get('/categories', [CategoryController::class, 'search'])
                ->name('api.category.search');

            Route::get('/ip/products', [ProductListController::class, 'index'])
                ->name('api.products.all');

            Route::get('/ip/categories', [ProductListController::class, 'categories'])
                ->name('api.category.search');
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
