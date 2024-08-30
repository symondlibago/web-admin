<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipment', function (Blueprint $table) {
            $table->id('event_id'); // Primary key
            $table->string('item'); // Name of the item
            $table->integer('number_of_items'); // Number of items
            $table->integer('number_of_sort_items'); // Number of sorted items
            $table->string('status')->nullable(); // Status (e.g., Broken, Missing)
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('equipment');
    }
}
