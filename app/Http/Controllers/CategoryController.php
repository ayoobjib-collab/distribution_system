<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getViewPath(): string
    {
        return 'Category';
    }

    public function index(Request $request)
    {
        $this->abortIfIsNotAdmin($request);

        $categories = Category::query()
            ->latest()
            ->paginate(self::$paginateCount);

        return $this->render(
            'Index',
            [
                'categories' => $categories
            ]
        );
    }

    public function edit(Category $category, Request $request)
    {
        $this->abortIfIsNotAdmin($request);

        return $this->render(
            'Create',
            [
                'category' => $category,
                'sendUrl' => route('category.update', ['category' => $category]),
            ]
        );
    }

    public function create(Request $request)
    {
        $this->abortIfIsNotAdmin($request);

        return $this->render(
            'Create',
            [
                'sendUrl' => route('category.store'),
            ]
        );
    }

    /**
     * Display the specified category.
     */
    public function show(CategoryRequest $category)
    {
        $category->load("products");

        return $this->render(
            'Show',
            ['category' => $category]
        );
    }

    /**
     * Update the specified category.
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $validated =  $request->validated();

        $category->update($validated);

        return $this->back('بروز رسانی انجام شد');
    }

    /**
     * Soft delete the specified category.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()
            ->route('categories.index')
            ->with('success', 'دسته‌بندی با موفقیت حذف شد.');
    }

    /**
     * Store a newly created category.
     */
    public function store(CategoryRequest $request)
    {
        $validated =  $request->validated();

        Category::create($validated);

        return $this->back('محصول با موفقیت ثبت شد');
    }

    public function search(Request $request)
    {
        $search = $request->string('search')
            ->trim()
            ->stripTags()
            ->toString();


        if (empty($search)) {

            $categories = Category::all();
        } else {

            $categories = Category::query()
                ->select([
                    'id',
                    'name',
                ])
                ->when($request->filled('search'), function ($query) use ($search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%");
                    });
                })
                ->limit(20)
                ->get();
        }

        return response()->json(
            $categories->map(fn($product) => [
                'id' => $product->id,
                'name' => $product->name,
            ])
        );
    }
}
