<?php

namespace App\Http\Requests\Trait;

use Hamcrest\Core\IsNull;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Exceptions\HttpResponseException;

use function PHPUnit\Framework\isNull;

/**
 * Check use is admin or owner if in edit request
 */
trait UserValidation
{
    protected $errorMsg = 'You do not have access';

    public function isUserValid(Model|NULL $model): bool
    {
        if (isNull($model)) return true;

        return $this?->user()->isAdmin()
            || $model->user_id === $this?->user()->id;
    }

    protected function setErrorMsg(string $msg): void
    {
        $this->errorMsg = $msg;
    }

    /**
     * Override formRequest failedAuth method
     */
    protected function failedAuthorization()
    {
        throw new HttpResponseException(
            back()->with('msg', [
                'status' => false,
                'text' => $this->errorMsg,
            ])
        );
    }
}
