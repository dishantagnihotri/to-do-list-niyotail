<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Lists;
use Validator;

class ListController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lists = Lists::with('todos')->get();

        return $this->sendResponse($lists->toArray(), 'These are your latest updates!');
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
            'title' => 'string|required|max:255',
            'user_id' => 'required|integer',
            'color' => 'nullable|string',
            'tags' => 'nullable'
        ]);


        if($validator->fails()){
            return $this->sendError('One of the input is wrong.', $validator->errors());       
        }


        $list = Lists::create($input);


        return $this->sendResponse($list->toArray(), 'New task created!');
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $list = Lists::find($id);


        if (is_null($list)) {
            return $this->sendError('Product not found.');
        }


        return $this->sendResponse($list->toArray(), 'Product retrieved successfully.');
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Lists $list)
    {
        $input = $request->all();


        $validator = Validator::make($input, [
            'title' => 'required',
            'user_id' => 'required',
            'color' => 'required'
        ]);


        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }


        $list->title = $input['title'];
        $list->color = $input['color'];
        $list->save();


        return $this->sendResponse($list->toArray(), 'List updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lists $list)
    {
        $list->delete();

        return $this->sendResponse($list->toArray(), 'Task deleted successfully.');
    }
}
