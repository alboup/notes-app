<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Domain\Notes\NoteRepositoryInterface;
use App\Infrastructure\Notes\EloquentNoteRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            NoteRepositoryInterface::class,
            EloquentNoteRepository::class
        );
    }
}