<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use App\Repositories\FeedBackRequestRepository;
use App\Http\Requests\FeedBackRequest as FeedBack;
use App\Models\FeedBackRequest;
use App\Helpers\JsonResponse;
use Lang;

class FeedBackRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param FeedBackRequestRepository $feedBackRequestRepository
     * @return JsonResponse
     */
    public function index(FeedBackRequestRepository $feedBackRequestRepository)
    {
        $feedBackRequests = $feedBackRequestRepository->list();
        return JsonResponse::response(data: ['feedBackRequests' => $feedBackRequests], statusCode: 200);
    }

    /**
     *  create user
     * 
     * @param FeedBack $request
     * @param FeedBackRequestRepository $feedBackRequests
     * @return JsonResponse
     */
    public function store(FeedBack $request, FeedBackRequestRepository $feedBackRequestRepository)
    {
        $feedBackRequest = $feedBackRequestRepository->create($request->validated());
        return JsonResponse::response(message: Lang::get('db.success'), data: ['feedBackRequest' => $feedBackRequest], statusCode: 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $feedBackRequest
     * @return JsonResponse
     */
    public function show(int $feedBackRequest)
    {
        $feedBackRequest = FeedBackRequest::wherePerformanceReviewId($feedBackRequest)->firstOrFail();
        return JsonResponse::response(data: ['feedBackRequest' => $feedBackRequest], statusCode: 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $request
     * @param  FeedBackRequest $feedBack
     * @param  FeedBackRequestRepository $feedBackRequestRepository
     * @return JsonResponse
     */
    public function update(int $request, FeedBackRequest $feedBackRequest, FeedBackRequestRepository $feedBackRequestRepository)
    {
        $feedBackRequest = FeedBackRequest::where('performance_review_id',$feedBackRequest)->firstOrFail();
        $feedBackRequest = $feedBackRequestRepository->update($feedBackRequest, $request->validated());

        return JsonResponse::response(message: Lang::get('db.success'), data: ['feedBackRequest' => $feedBackRequest], statusCode: 206);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $feedBackRequest
     * @param  FeedBackRequestRepository $feedBackRequests
     * @return JsonResponse
     */
    public function destroy(int $feedBackRequest, FeedBackRequestRepository $feedBackRequestRepository)
    {
        $feedBackRequest = FeedBackRequest::where('performance_review_id',$feedBackRequest)->firstOrFail();
        $result = $feedBackRequestRepository->delete($feedBackRequest);
        return $result ? JsonResponse::response(message: Lang::get('db.success'), data: [], statusCode: 200) : 'error';
    }

    public function userFeedBackRequests(UserRepository $userRepository)
    {
        $user = $userRepository->userFeedBackRequest();
        return JsonResponse::response(message: Lang::get('db.success'), data: ['user' => $user], statusCode: 200);
    }
}
