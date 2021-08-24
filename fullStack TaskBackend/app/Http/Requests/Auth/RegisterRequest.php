<?php

namespace App\Http\Requests\Admin\Auth;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\PasswordValidation;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'username' => 'nullable|unique:users',
            'mobile' => 'nullable|numeric|unique:users',
            'password' => ['required', 'confirmed', new PasswordValidation],
            'avatar' =>'nullable|image',
            'gender' => [ Rule::in(['male', 'female']) ],
        ];
    }
}