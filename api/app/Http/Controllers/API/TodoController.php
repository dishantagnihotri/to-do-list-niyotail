<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Todo;
use Validator;

class TodoController extends BaseController
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Todo::with('tags')->get();

        return $this->sendResponse($products->toArray(), 'Products retrieved successfully.');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'title' => 'required',
            'description' => 'required',
            'isDone' => 'required',
            'lists_id' => 'required',
        ]);

        // return $input;

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $todo = Todo::create($input);
        $todo->save();

        return $this->sendResponse($todo->toArray(), 'To do created successfully.');
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Todo::find($id);


        if (is_null($product)) {
            return $this->sendError('Product not found.');
        }


        return $this->sendResponse($product->toArray(), 'Product retrieved successfully.');
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Todo $todo)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'title' => 'required',
            'lists_id' => 'required',
            'isDone' => 'required'
        ]);


        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }


        $todo->title = $input['title'];
        // $todo->description = $input['description'];
        $todo->isDone = $input['isDone'];
        $todo->lists_id = $input['lists_id'];
        $todo->update();


        return $this->sendResponse($todo->toArray(), 'To Do updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return $this->sendResponse($todo->toArray(), 'To do deleted successfully.');
    }


    /**
     * Get all the tags.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getAllTags ($id)
    {
        $todo = Todo::where('id', $id)->with('tags')->first();

        if (is_null($todo)) {
            return $this->sendError('Tags not found.');
        }

        return $this->sendResponse($todo->tags->toArray(), 'Tags retrieved successfully.');
    }
}
