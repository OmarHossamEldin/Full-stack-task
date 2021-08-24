<?php

namespace App\Repositories;

use App\Interfaces\Crud;
use App\Models\FeedBackRequest;

class FeedBackRequestRepository implements Crud
{
    /**
     * List resources in the database
     *
     * @return mixed
     */
    public function list(): array
    {
        $feedBackRequest = FeedBackRequest::all()->toArray();
        return $feedBackRequest;
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
        $feedBackRequest = FeedBackRequest::create($validatedData);
        return $feedBackRequest;
    }

    /**
     * Updates the resource in the database
     *
     * @param array $validatedData
     * @param object $feedBackRequest
     * @return object
     */
    public function update(object $feedBackRequest, array $validatedData): object
    {
        $feedBackRequest->update($validatedData);
        return $feedBackRequest;
    }

    /**
     * Deletes the resource in the database
     *
     * @param object $user
     * @return string
     */
    public function delete(object $feedBackRequest): bool
    {
        $feedBackRequest->delete();
        return true;
    }
}
