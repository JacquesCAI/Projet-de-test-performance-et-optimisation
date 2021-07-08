<?php

namespace App\Http\Controllers;

use App\Models\Vaccins;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VaccinController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.verify');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function index()
    {
        return DB::table('vaccins')->paginate(100);
    }

    /**
     * Get all vaccins
     *
     * @return \App\Models\Vaccins[]
     */
    public function all() {
        return Vaccins::all();
    }


    /**
     * Get slowly 2000 vaccins by sorting them with bubblesort
     *
     * @return \App\Models\Vaccins[]
     */
    public function slowlyGetVaccins() {
        $vaccins = Vaccins::all()->take(2000);
        do {
            $sorted = true;
            for ($j=0;$j<count($vaccins)-1;$j++) {
                if ($vaccins[$j]->id < $vaccins[$j+1]->id) { // DESC sort
                    $sorted = false;
                    $tmp = $vaccins[$j];
                    $vaccins[$j] = $vaccins[$j+1];
                    $vaccins[$j+1] = $tmp;
                }
            }
            } while (!$sorted);

        return $vaccins;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $vaccin = new Vaccins([
            'code_region' => $request->code_region,
            'nom_reg' => $request->nom_reg,
            'type_de_vaccin' => $request->type_de_vaccin,
            'nb_ucd' => $request->nb_ucd,
            'nb_doses' => $request->nb_doses,
        ]);
        return Vaccins::create($vaccin->toArray());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Vaccins $vaccin)
    {
        return $vaccin;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vaccins $vaccin)
    {
        $vaccin->code_region = $request->code_region;
        $vaccin->nom_reg = $request->nom_reg;
        $vaccin->type_de_vaccin = $request->type_de_vaccin;
        $vaccin->nb_ucd = $request->nb_ucd;
        $vaccin->nb_doses = $request->nb_doses;

        $vaccin->update();
        return $vaccin;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Vaccins::destroy($id);
    }
}
