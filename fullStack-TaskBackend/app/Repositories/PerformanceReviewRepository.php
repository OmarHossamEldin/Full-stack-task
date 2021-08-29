<?php

namespace App\Repositories;

use App\Interfaces\Crud;
use App\Models\PerformanceReview;

class PerformanceReviewRepository implements Crud
{
    /**
     * List resources in the database
     *
     * @return mixed
     */
    public function list(): array
    {
        $performanceReview = PerformanceReview::with(['reviewer:id,name', 'reviewee:id,name'])->get()->toArray();
        return $performanceReview;
    }

    /**
     * Saves the resource in the database
     *
     * @param array $validatedData
     * @return object
     */
    public function create(array $validatedData): object
    {
        $performanceReview = PerformanceReview::create($validatedData);
        return $performanceReview;
    }
    
    public function showReviewer(object $review): object
    {
        $review->load(['reviewer:id,name', 'reviewee:id,name']);
        return $review;
    }
    /**
     * Updates the resource in the database
     *
     * @param array $validatedData
     * @param object $feedBackRequest
     * @return object
     */
    public function update(object $performanceReview, array $validatedData): object
    {
        $performanceReview->update($validatedData);
        return $performanceReview;
    }

    /**
     * Deletes the resource in the database
     *
     * @param object $user
     * @return string
     */
    public function delete(object $performanceReview): bool
    {
        $performanceReview->delete();
        return true;
    }
}
