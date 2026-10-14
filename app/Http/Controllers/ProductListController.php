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

    public function run(Request $request)
    {
        $this->breadcrumbs
            ->add('فاکتورها', route('invoice.index'))
            ->add('لیست محصولات');

        $products = Inertia::scroll(function () {

            $products = Product::query()
                ->join('category_product', 'products.id', '=', 'category_product.product_id')
                ->select('products.*', 'category_product.category_id')
                ->when(request('category_id'), function ($query, $categoryId) {
                    $query->where('category_product.category_id', $categoryId);
                })
                ->orderBy('category_product.category_id', 'asc')
                ->orderBy('products.created_at', 'desc')
                ->paginate(15);
                // ->withQueryString();

            return $products;
        });

        return $this->render(
            'Index',
            [
                'cats'      => $this->categories(),
                'products' =>  $products
            ]
        );
    }

    public function categories()
    {
        return Category::query()
            ->select('id', 'name')
            ->orderBy('id')
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
