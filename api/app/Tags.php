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
        'name', 'color'
    ];


    /**
     * Get the List associated with a tag.
     */
    public function lists ()
    {
        return $this->belongsToMany('App\Lists');
    }
}
