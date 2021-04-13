<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Vaccins;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function() {
    $vaccin = new Vaccins();
    $vaccin->code_region = "0";
    $vaccin->nom_reg = "GDP";
    $vaccin->type_de_vaccin = "Pfizer";
    $vaccin->nb_ucd = 1165;
    $vaccin->nb_doses = 68486;
    $vaccin->date = new \Carbon\Carbon();

    $vaccin->save();
});
