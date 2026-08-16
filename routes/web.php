<?php

use App\Enums\RoutesName;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\ChequeAiController;
use App\Http\Controllers\ChequeController;
use App\Http\Controllers\ChequeLogsController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\InvoiceController;
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

require 'testRoute.php';


/**
 * User Route
 */
Route::group(['middleware' => ['auth', 'restric.id']], function () {

    Route::middleware(['auth', 'permission:user_permission'])->group(function () {
        Route::resource('user', UserController::class);
    });

    Route::resource('invoice', InvoiceController::class);
    Route::resource('account', AccountController::class);
    Route::resource('product', ProductController::class);
    Route::resource('transaction', TransactionController::class);

    // Route::get('/clients/search', [ClientController::class, 'search'])->name('clients.search');

    # Read cheque data by ai
    // Route::post('/cheques/read-image', [ChequeAiController::class, 'readImage'])->name('cheques.read-image');

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
