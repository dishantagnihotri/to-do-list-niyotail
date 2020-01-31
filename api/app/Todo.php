<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'isDone', 'lists_id'
    ];

    /**
     * Get the To do associated with a list.
     */
    public function list ()
    {
        return $this->hasOne('App\Lists');
    }
}
