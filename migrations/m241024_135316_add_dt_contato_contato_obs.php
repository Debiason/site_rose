<?php

use yii\db\Migration;

/**
 * Class m241024_135316_add_dt_contato_contato_obs
 */
class m241024_135316_add_dt_contato_contato_obs extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn("contato","dt_contato",$this->date("Y-m-d H:i:s")->null());
        $this->addColumn("contato","contato_realizado",$this->boolean()->notNull()->defaultValue(0));
        $this->addColumn("contato","obs", $this->string(255)->null());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m241024_135316_add_dt_contato_contato_obs cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m241024_135316_add_dt_contato_contato_obs cannot be reverted.\n";

        return false;
    }
    */
}
