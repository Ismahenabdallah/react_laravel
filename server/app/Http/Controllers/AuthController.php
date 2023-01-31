<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'name' => 'required|string',
            'password' => 'required|max:6',
            'confirm' =>'required|same:password',

        ]);

        $user1 = User::where('email', $request->email)->first();

        //Check Password
        //
        if ($user1 ) {
            return response()->json([
                'message' => 'email already exists',
            ], 401);
        }
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'confirm' => Hash::make($request->password),

        ]);
        $user->save();

        return response()->json([
            'message' => 'User has been registred',
            'user'=>$user
        ], 200);
    }
    //'password_confirmation' => 'required|same:password'

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',


        ]);

        //Check email

        $user = User::where('email', $fields['email'])->first();

        //Check Password
        //
        if (! $user || ! Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Invalid Credentials',
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'logged out ',

        ]);
    }
}

/***
    *
    *  // {
   //     $request->validate([
   //         'email' => 'required',
   //         'password' => 'required',
   //        // 'confirm' => 'required|same:password'

   //     ]);
   //     $credentials=request(['email', 'password']);
   //     if(!Auth::attempt($credentials)){
   //         return response()->json([
   //         'message'=>'Unauthorized'
   //       ],401);
   //     }
   //     $user=$request->user();
   //     $tokenResult=$user->createToken('personal Access Token');
   //     $token=$tokenResult->token;
   //     $token->expires_at=Carbon::now()->addWeeks(1);
   //     $token->save();
   //     return response()->json(['data'=>[
   //          'user'=>Auth::user(),
   //          'access_token'=>$tokenResult->accessToken,
   //           'token_type'=>'Bearer',
   //           'expires_at'=>Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
   //                    ]
   //       ]);
   // }
    *
    *
    *
    *
    */
