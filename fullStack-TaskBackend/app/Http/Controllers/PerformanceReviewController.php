<?php

namespace App\Http\Controllers;

use App\Repositories\PerformanceReviewRepository;
use App\Helpers\JsonResponse;
use App\Http\Requests\ReviewRequest;
use App\Models\PerformanceReview;
use Lang;

class PerformanceReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param PerformanceReviewRepository $performanceReviewRepository
     * @return JsonResponse
     */
    public function index(PerformanceReviewRepository $performanceReviewRepository)
    {
        $reviews = $performanceReviewRepository->list();
        return JsonResponse::response(data: ['reviews' => $reviews], statusCode: 200);
    }

    /**
     *  create user
     * 
     * @param ReviewRequest $request
     * @param PerformanceReviewRepository $performanceReviewRepository
     * @return JsonResponse
     */
    public function store(ReviewRequest $request, PerformanceReviewRepository $performanceReviewRepository)
    {
        $review = $performanceReviewRepository->create($request->validated());
        return JsonResponse::response(message: Lang::get('db.success'), data: ['review' => $review], statusCode: 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  PerformanceReview  $performanceReview
     * @param PerformanceReviewRepository $performanceReviewRepository
     * @return JsonResponse
     */
    public function show(PerformanceReview $performanceReview, PerformanceReviewRepository $performanceReviewRepository)
    {
        $review = $performanceReviewRepository->showReviewer($performanceReview);
        return JsonResponse::response(data: ['review' => $review], statusCode: 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ReviewRequest $request
     * @param  PerformanceReview $performanceReview
     * @param  PerformanceReviewRepository $performanceReviewRepository
     * @return JsonResponse
     */
    public function update(ReviewRequest  $request, PerformanceReview $performanceReview, PerformanceReviewRepository $performanceReviewRepository)
    {
        $performanceReview = $performanceReviewRepository->update($performanceReview, $request->validated());

        return JsonResponse::response(message: Lang::get('db.success'), data: ['performanceReview' => $performanceReview], statusCode: 206);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  PerformanceReview $performanceReview
     * @param  PerformanceReviewRepository $performanceReviewRepository
     * @return JsonResponse
     */
    public function destroy(PerformanceReview $performanceReview, PerformanceReviewRepository $performanceReviewRepository)
    {
        $result = $performanceReviewRepository->delete($performanceReview);
        return $result ? JsonResponse::response(message: Lang::get('db.success'), data: [], statusCode: 200) : 'error';
    }
}
