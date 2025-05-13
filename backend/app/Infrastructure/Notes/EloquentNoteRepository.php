<?php

namespace App\Infrastructure\Notes;

use App\Domain\Notes\NoteRepositoryInterface;
use App\Models\Note;

class EloquentNoteRepository implements NoteRepositoryInterface
{
    public function paginate(int $perPage, ?string $search)
    {
        return Note::query()
            ->when($search, fn($q) => $q->where('title', 'like', "%{$search}%"))
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }

    public function find(int $id): ?Note 
    { 
        return Note::find($id); 
    }

    public function create(array $data): Note 
    { 
        return Note::create($data); 
    }

    public function update(Note $note, array $data): Note 
    { 
        $note->update($data); 
        return $note; 
    }

    public function delete(Note $note): void 
    { 
        $note->delete(); 
    }
}