<?php

namespace App\Domain\Notes;

use App\Models\Note;

class NoteService
{
    public function __construct(private NoteRepositoryInterface $repo) {}

    public function list(int $pageSize, ?string $search)
    {
        return $this->repo->paginate($pageSize, $search);
    }

    public function find(int $id): ?Note
    {
        return $this->repo->find($id);
    }

    public function create(array $data): Note
    {
        return $this->repo->create($data);
    }

    public function update(int $id, array $data): ?Note
    {
        $note = $this->repo->find($id);
        return $note ? $this->repo->update($note, $data) : null;
    }

    public function delete(int $id): bool
    {
        $note = $this->repo->find($id);
        if (!$note) return false;
        $this->repo->delete($note);
        return true;
    }
}