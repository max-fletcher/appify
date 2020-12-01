<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('app/get_tags', [App\Http\Controllers\AdminController::class, 'getTag']);
Route::post('app/create_tag', [App\Http\Controllers\AdminController::class, 'addTag']);
Route::patch('app/edit_tag', [App\Http\Controllers\AdminController::class, 'editTag']);
Route::delete('app/delete_tag', [App\Http\Controllers\AdminController::class, 'deleteTag']);
Route::post('app/upload', [App\Http\Controllers\AdminController::class, 'upload']);

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


Route::any('{slug}', function(){
    return view('welcome');
});
