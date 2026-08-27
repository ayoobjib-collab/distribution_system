<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function getViewPath(): string
    {
        dd('This method need overide');
    }

    public function render(string $viewName, array $props = [])
    {
        return inertia($this->getViewPath() . '/' . $viewName, $props);
    }

    public function validateUser(Request $request, Model $model)
    {
        abort_unless(
            $request->user()->hasRole('admin')
                || $model->user_id === $request->user()->id,
            404
        );
    }

    public function abortIfIsNotAdmin(Request $request)
    {
        if (! $request->user()->hasRole('admin'))
            abort(404);
    }

    public function back(string $msg, bool $status = true)
    {
        return back()->with(
            'msg',
            [
                'status' => $status,
                'text'   => $msg
            ]
        );
    }
}
