<?php

namespace App\Repositories;

use App\Interfaces\Crud;
use App\Models\Brand;

class BrandRepository implements Crud
{
    /**
     * List resources in the database
     *
     * @return mixed
     */
    public function list(): array
    {
        $brands = Brand::all()->toArray();
        return $brands;
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
        $brand = Brand::create($validatedData);
        return $brand;
    }

    /**
     * Updates the resource in the database
     *
     * @param array $validatedData
     * @param object $brand
     * @return object
     */
    public function update(array $validatedData, object $brand): object
    {
        $brand->update($validatedData);
        return $brand;
    }

    /**
     * Deletes the resource in the database
     *
     * @param object $brand
     * @return string
     */
    public function delete(object $brand): int
    {
        $brand->delete();
        return $brand->id;
    }
}
