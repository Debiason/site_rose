<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "contato".
 *
 * @property int $id
 * @property string $cidade
 * @property string|null $telefone
 * @property string|null $email
 * @property string|null $endereco
 * @property string|null $cep
 * @property int|null $id_estado
 * @property int|null $dt_contato
 * @property int|null $contato_realizado
 * @property int|null $obs
 *
 * @property Estado $estado
 */
class Contato extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'contato';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['cidade'], 'required'],
            [['id_estado'], 'integer'],
            [['cidade', 'email'], 'string', 'max' => 100],
            [['telefone'], 'string', 'max' => 20],
            [['endereco', 'obs'], 'string', 'max' => 255],
            [['cep'], 'string', 'max' => 10],
            [['dt_contato', 'contato_realizado'], 'safe'],
            [['id_estado'], 'exist', 'skipOnError' => true, 'targetClass' => Estado::class, 'targetAttribute' => ['id_estado' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'cidade' => 'Cidade',
            'telefone' => 'Telefone',
            'email' => 'Email',
            'endereco' => 'Endereco',
            'cep' => 'Cep',
            'id_estado' => 'Id Estado',
            'dt_contato' => 'Data',
            'contato_realizado' => 'Contato',
            'obs' => 'Observação',
        ];
    }

    /**
     * Gets query for [[Estado]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getEstado()
    {
        return $this->hasOne(Estado::class, ['id' => 'id_estado']);
    }
}
