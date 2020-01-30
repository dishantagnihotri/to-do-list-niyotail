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
}
