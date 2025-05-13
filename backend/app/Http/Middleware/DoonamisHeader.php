<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DoonamisHeader
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->header('Authentication') !== 'Doonamis') {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $next($request);
    }
}
