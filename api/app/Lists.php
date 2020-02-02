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
        'title', 'color', 'user_id'
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
     * Get the Todos associated with a list.
     */
    public function todos ()
    {
        return $this->hasMany('App\Todo');
    }


}
