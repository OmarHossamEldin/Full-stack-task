<?php

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

Route::group(['prefix' => '/'], function () {
    Route::group(['middleware' => ['cors', 'json.response']], function () {
        //guest
        Route::group(['middleware' => 'guest'], function () {
            Route::post('login', 'App\Http\Controllers\Auth\LoginController@login')->name('login');
        });
        //Authenticated 
        Route::group(['middleware' => ['auth:api']], function () {

            Route::post('logout', 'App\Http\Controllers\Auth\LogoutController@logout')->name('user.logout');

            Route::apiResource('feed-Back-requests', 'App\Http\Controllers\FeedBackRequestController');

            Route::get('/user/feed-Back-requests/', 'App\Http\Controllers\FeedBackRequestController@userFeedBackRequests')->name('user.review');

            Route::group(['middleware' => ['admin.guard']], function () {

                Route::apiResources([
                    'users' => 'App\Http\Controllers\UserController',
                    'performance-reviews' => 'App\Http\Controllers\PerformanceReviewController'
                ]);
            });
        });
    });
});
