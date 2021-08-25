<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use App\Repositories\FeedBackRequestRepository;
use App\Models\FeedBackRequest as FeedBack;
use App\Http\Requests\FeedBackRequest;
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
     * @param FeedBackRequest $request
     * @param FeedBackRequestRepository $feedBackRequests
     * @return JsonResponse
     */
    public function store(FeedBackRequest $request, UserRepository $feedBackRequests)
    {
        $feedBackRequest = $feedBackRequests->create($request->validated());
        return JsonResponse::response(message: Lang::get('db.success'), data: ['feedBackRequest' => $feedBackRequest], statusCode: 206);
    }

    /**
     * Display the specified resource.
     *
     * @param  FeedBack  $feedBack
     * @return JsonResponse
     */
    public function show(FeedBack $feedBack)
    {
        return JsonResponse::response(data: ['feedBack' => $feedBack], statusCode: 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  FeedBackRequest $request
     * @param  FeedBack $feedBack
     * @param  FeedBackRequestRepository $feedBackRequests
     * @return JsonResponse
     */
    public function update(FeedBackRequest $request, FeedBack $feedBack, FeedBackRequestRepository $feedBackRequests)
    {
        $feedBack = $feedBackRequests->update($feedBack, $request->validated());

        return JsonResponse::response(message: Lang::get('db.success'), data: ['feedBack' => $feedBack], statusCode: 206);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  FeedBack $feedBack
     * @param  FeedBackRequestRepository $feedBackRequests
     * @return JsonResponse
     */
    public function destroy(FeedBack $feedBack, FeedBackRequestRepository $feedBackRequestRepository)
    {
        $result = $feedBackRequestRepository->delete($feedBack);
        return $result ? JsonResponse::response(message: Lang::get('db.success'), data: [], statusCode: 200) : 'error';
    }

    public function userFeedBackRequests(UserRepository $userRepository)
    {
        $user = $userRepository->userFeedBackRequest();
        return JsonResponse::response(message: Lang::get('db.success'), data: ['user' => $user], statusCode: 200);
    }
}
