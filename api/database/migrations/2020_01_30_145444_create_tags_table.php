<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->integer('todos_id')->unsigned();
            $table->foreign('todos_id')->references('id')->on('todos')->onDelete('cascade');
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
        // $table->dropForeign('todos_todos_id_foreign');
        // $table->dropIndex('todos_todos_id_index');
        // $table->dropColumn('todos_id');
        Schema::dropIfExists('tags');
    }
}
