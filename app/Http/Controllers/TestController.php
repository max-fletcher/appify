<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test()
    {
        return response()->json([
            'msg' => 'Some Error Occured !!'
        ], 422);
    }
}
