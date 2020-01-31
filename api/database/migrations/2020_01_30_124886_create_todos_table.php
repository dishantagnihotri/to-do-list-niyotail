<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->boolean('isDone')->default(0);
            $table->integer('lists_id')->unsigned();
            $table->foreign('lists_id')->references('id')->on('lists');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $table->dropForeign('lists_lists_id_foreign');
        $table->dropIndex('lists_lists_id_index');
        $table->dropColumn('lists_id');
        Schema::dropIfExists('todos');
    }
}
