<?php

namespace App\Domain\Notes;

use App\Models\Note;

interface NoteRepositoryInterface
{
    public function paginate(int $perPage, ?string $search);
    public function find(int $id): ?Note;
    public function create(array $data): Note;
    public function update(Note $note, array $data): Note;
    public function delete(Note $note): void;
}