<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeedBackRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feed_back_requests', function (Blueprint $table) {
            $table->foreignId('performance_review_id')->constrainted('performance_reviews');
            $table->primary('performance_reviews_id');
            $table->string('feedback')->nullable();
            $table->foreignId('reviewer_id')->constrainted('users');
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
        Schema::dropIfExists('feed_back_requests');
    }
}
