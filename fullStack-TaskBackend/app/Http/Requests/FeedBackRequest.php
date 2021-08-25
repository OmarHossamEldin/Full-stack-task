<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FeedBackRequest extends FormRequest
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
            'performance_review_id' => 'required|exists:App\Models\PerformanceReview,id',
            'reviewer_id' => 'required|exists:App\Models\User,id'
        ];
    }

    /**
     * onFeedBack request
     *
     * @return array
     */
    private function onFeedBack()
    {
        return [
            'feedback' => 'required|string'
        ];
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return request()->isMethod('put') || request()->isMethod('patch') ? $this->onFeedBack(): $this->onAssign();
    }
}
