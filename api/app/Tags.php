<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'todos_id'
    ];


    /**
     * Get the List associated with a tag.
     */
    public function todos ()
    {
        return $this->belongsToOne('App\Todo');
    }
}
