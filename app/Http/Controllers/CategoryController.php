<?php

namespace App\Http\Controllers;

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
                'sendUrl' => route('category.update', ['category'=>$category]),
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
    public function show(Category $category)
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
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'slug' => [
                'required',
                'string',
                'max:255',
                'max:255',
                'unique:categories,slug,' . $category->id,
            ],
        ]);

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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'slug' => [
                'required',
                'string',
                'max:255',
                'unique:categories,slug',
            ],
        ]);

        Category::create($validated);

        return $this->back('محصول با موفقیت ثبت شد');
    }
}
