<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;

class AdminController extends Controller
{
    public function addTag()
    {
        // validate request
        $this->validate( request(), [
            'tagName' => 'required',
        ]);

        return Tag::create([
            'tagName' => request()->tagName,
        ]);
    }

    public function getTag(){
        return Tag::orderBy('id', 'DESC')->get();
    }

    public function editTag(){
            // validate request
            $this->validate( request(), [
                'id' => 'required',
                'tagName' => 'required',
            ]);

            return Tag::where( 'id', request()->id )->update([
                'tagName' => request()->tagName,
            ]);                    
    }

    public function deleteTag(){
        // validate request
        $this->validate( request(), [
            'id' => 'required',            
        ]);

        return Tag::where( 'id', request()->id )->delete();
    }

    public function upload(){
        // validate request
        $this->validate( request(), [
            'file' => 'required|mimes:jpeg,jpg,png',
        ]);
        // assign a filename to the uploaded file in request
        $picName = time().'.'.request()->file->extension();
        // store a file in the uploads folder
        request()->file->move(public_path('uploads'), $picName);
        return $picName;
    }
}
