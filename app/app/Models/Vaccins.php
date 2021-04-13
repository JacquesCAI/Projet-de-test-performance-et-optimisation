<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccins extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code_region',
        'nom_reg',
        'type_de_vaccin',
        'nb_ucd',
        'nb_doses',
        'date',
    ];
    /**
     * Types of attributes
     */

    protected $casts = [
        'code_region' => 'string',
        'nom_reg' => 'string',
        'type_de_vaccin' => 'string',
        'nb_ucd' => 'int',
        'nb_doses' => 'int',
        'date' => 'date'
    ];


}
