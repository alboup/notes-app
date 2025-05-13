<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use App\Domain\Notes\NoteService;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function __construct(private NoteService $service) {}

    public function index(Request $request)
    {
        return response()->json(
            $this->service->list(6, $request->query('search'))
        );
    }

    public function store(StoreNoteRequest $request)
    {
        return response()->json(
            $this->service->create($request->validated()),
            201
        );
    }

    public function show(int $id)
    {
        $note = $this->service->find($id);
        return $note
            ? response()->json($note)
            : response()->json(['error' => 'Not found'], 404);
    }

    public function update(UpdateNoteRequest $request, int $id)
    {
        $note = $this->service->update($id, $request->validated());
        return $note
            ? response()->json($note)
            : response()->json(['error' => 'Not found'], 404);
    }

    public function destroy(int $id)
    {
        return $this->service->delete($id)
            ? response()->noContent()
            : response()->json(['error' => 'Not found'], 404);
    }
}