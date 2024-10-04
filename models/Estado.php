<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "estado".
 *
 * @property int $id
 * @property string $nome_estado
 * @property string $sigla_estado
 *
 * @property Contato[] $contatos
 */
class Estado extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'estado';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nome_estado', 'sigla_estado'], 'required'],
            [['nome_estado'], 'string', 'max' => 100],
            [['sigla_estado'], 'string', 'max' => 2],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nome_estado' => 'Nome Estado',
            'sigla_estado' => 'Sigla Estado',
        ];
    }

    /**
     * Gets query for [[Contatos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getContatos()
    {
        return $this->hasMany(Contato::class, ['id_estado' => 'id']);
    }
}
