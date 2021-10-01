<?php

use App\Http\Controllers\Api\v1\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace'=>'Api' , 'prefix'=>'v1'] , function (){
    Route::post('/create' , [EmployeeController::class , 'create']);
    Route::get('/getAll' , [EmployeeController::class , 'getAll']);
    Route::get('/getEmployee/{id}' , [EmployeeController::class , 'getEmployee']);
    Route::post('/update/{id}' , [EmployeeController::class , 'updateData']);
});

