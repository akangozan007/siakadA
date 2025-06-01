<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration
{
    public function up()
    {
       $this->forge->addField([
            'user_id'=>[
                'type' => 'INT',
                'constraint'=> 5,
                'auto_increment'=> true,
            ],
            'email'=>[
                'type' => 'VARCHAR',
                'constraint'=> 100,
                'auto_increment'=> true,
            ],
            'password'=>[
                'type' => 'VARCHAR',
                'constraint'=> 200,
            ],

       ]);
       $this->forge->addKey('user_id', true);
       $this->forge->createTable('user_account');

    }

    public function down()
    {
        //
    }
}
