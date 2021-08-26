<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'api_token'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'is_admin' => 'boolean',
    ];

    public function ApiTokenGenerater()
    {
        $this->api_token = Str::random(60);
        $this->save();
        return $this->api_token;
    }

    public function reviewer()
    {
        return $this->hasMany('App\Models\FeedBackRequest', 'reviewer_id');
    }

    public function reviewee()
    {
        return $this->hasMany('App\Models\FeedBackRequest', 'reviewee_id');
    }

    public function feedbacks()
    {
        return $this->hasMany('App\Models\FeedBackRequest', 'reviewer_id');
    }
}
