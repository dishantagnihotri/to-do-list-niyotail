<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lists extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'color', 'user_id'
    ];


    /**
     * A list belongs to a user.
     *
     * @var array
     */
    public function user ()
    {
    	return $this->belongsTo('App\User');
    }


    /**
     * Get the Tags associated with a list.
     */
    public function tags ()
    {
        return $this->belongsToMany('App\Tags');
    }


    /**
     * Get the Todos associated with a list.
     */
    public function todos ()
    {
        return $this->hasMany('App\Todo');
    }


}
