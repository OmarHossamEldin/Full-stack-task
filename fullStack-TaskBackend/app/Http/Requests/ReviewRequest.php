<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
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
     * onAssign request
     *
     * @return array
     */
    private function onAssign()
    {
        return [
            'reviewer_id' => 'required|exists:App\Models\User,id',
            'reviewee_id' => 'required|exists:App\Models\User,id'
        ];
    }

    /**
     * onReview request
     *
     * @return array
     */
    private function onReview()
    {
        return [
            'review' => 'required|array'
        ];
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        return request()->isMethod('put') || request()->isMethod('patch') ? $this->onReview(): $this->onAssign();
    }
}
