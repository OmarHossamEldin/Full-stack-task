<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->string('email')->unique();
            $table->string('username')->unique()->nullable();
            $table->string('mobile')->unique()->nullable();
            $table->string('password');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('verification_code')->nullable();
            $table->boolean('mail_verfied')->default(0);
            $table->boolean('mobile_verfied')->default(0);
            $table->string('activation_token')->unique()->nullable();
            $table->string('avatar',255)->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->boolean('is_admin')->default(0);
            $table->string('facebook_id')->nullable();
            $table->string('google_id')->nullable();
            $table->string('api_token', 60)->nullable()->unique();
            $table->softDeletes();
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
        Schema::dropIfExists('users');
    }
}
