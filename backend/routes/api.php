<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('doonamis')->group(function () {
    Route::apiResource('notes', \App\Http\Controllers\Api\NoteController::class);
});