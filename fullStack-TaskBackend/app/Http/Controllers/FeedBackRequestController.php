<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use App\Helpers\JsonResponse;
use App\Models\FeedBackRequest;
use Lang;

class FeedBackRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param UserRepository $userRepository
     * @return JsonResponse
     */
    public function index(UserRepository $userRepository)
    {
        $feedBackRequests = $userRepository->list();
        return JsonResponse::response(data: ['feedBackRequests' => $feedBackRequests], statusCode: 200);
    }

    /**
     *  create user
     * 
     * @param UserRequest $request
     * @param UserRepository $userRepository
     * @return JsonResponse
     */
    public function store(UserRequest $request, UserRepository $userRepository)
    {
        $feedBackRequest = $userRepository->create($request->validated());
        return JsonResponse::response(message: Lang::get('db.success'), data: ['feedBackRequest' => $feedBackRequest], statusCode: 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  FeedBackRequest  $user
     * @return JsonResponse
     */
    public function show(FeedBackRequest $feedBackRequest)
    {
        return JsonResponse::response(data: ['feedBackRequest' => $feedBackRequest], statusCode: 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UserRequest $request
     * @param  FeedBackRequest $user
     * @param  UserRepository $userRepository
     * @return JsonResponse
     */
    public function update(UserRequest  $request, FeedBackRequest $feedBackRequest, UserRepository $userRepository)
    {
        $feedBackRequest = $userRepository->update($request->validated(), $feedBackRequest);

        return JsonResponse::response(message: Lang::get('db.success'), data: ['feedBackRequest' => $feedBackRequest], statusCode: 206);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  FeedBackRequest $user
     * @param  UserRepository $userRepository
     * @return JsonResponse
     */
    public function destroy(FeedBackRequest $feedBackRequest, UserRepository $userRepository)
    {
        $result = $userRepository->delete($feedBackRequest);
        return $result ? JsonResponse::response(message: Lang::get('db.success'), data: [], statusCode: 200) : 'error';
    }
}
