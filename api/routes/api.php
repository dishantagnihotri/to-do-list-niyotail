<?php

use Illuminate\Http\Request;

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



Route::post('register', 'API\RegisterController@register');
  
Route::middleware('auth:api')->group( function () {
    Route::resource('lists', 'API\ListController');
    Route::resource('todos', 'API\TodoController');
    Route::resource('tags', 'API\TagsController');

    Route::get('todos/{id}/tags', 'API\TodoController@getAllTags');

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});