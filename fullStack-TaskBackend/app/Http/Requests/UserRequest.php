<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
     * onCreate request
     *
     * @return array
     */
    private function onCreate()
    {
        return [
            'name' => 'required|string',
            'email' => "required|email|unique:users,email,{$this->user?->id}",
            'password' => 'required|confirmed',
            'is_admin' => 'required|bool'
        ];
    }
    /**
     * onUpdate request
     *
     * @return array
     */
    private function onUpdate()
    {
        return [
            'name' => 'required|string',
            'email' => "required|email|unique:users,email,{$this->user?->id}",
            'is_admin' => 'required|bool'
        ];
    }
    
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return request()->isMethod('put') || request()->isMethod('patch') ? $this->onUpdate(): $this->onCreate();
    }
}