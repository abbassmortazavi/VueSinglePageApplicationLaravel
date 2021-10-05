<?php

namespace App\Http\Controllers\Api\v1;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function registerUser(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'email'=>'required|unique:users',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required'
        ]);
        User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=> Hash::make($request->password)
        ]);
     
        return response()->json(['msg'=>'Register SuccessFully']);
    }
    public function loginUser(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $expires_in = '';
        $mytime = Carbon::now();
        $expires_in = Carbon::parse($mytime->now()->addMinutes(10))->toDateTimeString();
        //$expires_in = Carbon::parse($mytime->now()->addMinutes(1))->toDateTimeString();
    
        //auth('api')->factory()->getTTL() * 60;
       

        $data['user'] = $user;
        //$data['token'] = $user->createToken($request->device_name)->plainTextToken;
        return response()->json([
            'access_token' => $user->createToken($request->device_name)->plainTextToken,
            'token_type' => 'bearer',
            'user' => $user,
            'expires_in' => $expires_in
        ]);
        //return $user->createToken($request->device_name)->plainTextToken;

    }
    public function logoutUser(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json('User is Logout...');
    }
    public function checkUserExpire(Request $request)
    {
        //return $request->all();
        $expire_in = $request->expires_in;
        $mytime = Carbon::now();
        if ($expire_in < $mytime){
            return response()->json([
                'expire'=> false
              ]);
        }
        return response()->json([
            'expire'=> true
          ]);
    }
}
