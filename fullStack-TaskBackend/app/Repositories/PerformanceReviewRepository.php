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
        $performanceReview = PerformanceReview::all()->toArray();
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
        $user = auth('api')->user();
        $validatedData['user_id'] = $user->id;
        $performanceReview = PerformanceReview::create($validatedData);
        return $performanceReview;
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
