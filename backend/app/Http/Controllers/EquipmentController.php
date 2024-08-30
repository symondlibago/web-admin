<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function index()
    {
        return response()->json(Equipment::all());
    }

    public function store(Request $request)
    {
        $equipment = Equipment::create($request->all());
        return response()->json($equipment, 201);
    }

    public function update(Request $request, $id)
    {
        $equipment = Equipment::findOrFail($id);
        $equipment->update($request->all());
        return response()->json($equipment, 200);
    }

    public function destroy($id)
    {
        Equipment::destroy($id);
        return response()->json(null, 204);
    }
}
