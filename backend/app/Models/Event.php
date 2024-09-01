<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'name', 'description', 'date', 'pax', 'invitation_message', 'people_to_invite', 'venue', 'package_type'
    ];
    
}
