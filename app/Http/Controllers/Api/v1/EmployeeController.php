<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EmployeeController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'position'=>'required',
            'email'=>'required',
        ]);
        Employee::create($request->all());
        return response()->json(['message'=>'Data Added.'] , 200);
    }
    public function getAll()
    {
        $employies = Employee::all();
        return response()->json([
            'data'=>$employies
        ],200);
    }
}
