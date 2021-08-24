<?php

namespace App\InterFaces;

interface CrudInterface
{
    public function list(): array;

    public function create(array $data): object;

    public function update($model, array $data): object;

    public function delete($model): bool;
}
