<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->hasPermissionTo('user_permission') ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = $this->route('user');

        return [
            'full_name' => ['required', 'string', 'max:255'],
            'mobile' => [
                'required',
                'string',
                'min:11',
                'max:11',
                Rule::unique('users', 'mobile')->ignore($user?->id)
            ],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
