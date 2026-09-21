<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductListController extends Controller
{

    public function getViewPath(): string
    {
        return 'List';
    }

    public function run()
    {
        return $this->render(
            'Index',
            [
                'cats'      => $this->categories(),
                'products' => Inertia::scroll(fn() => Product::paginate())
            ]
        );
    }

    public function categories()
    {
        return Category::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();
    }

    public function index(Request $request)
    {
        $products = Product::query()
            ->select([
                'id',
                'name',
                'sale_price',
                'image',
            ])
            ->with([
                'categories:id,name',
            ])
            ->orderBy('id')
            ->cursorPaginate(20);

        return response()->json($products);
    }
}
