<?php

namespace app\models;

use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use yii\helpers\ArrayHelper;
use kartik\password\StrengthValidator;
use Yii;

/**
 * This is the model class for table "usuario".
 *
 * @property int $id
 * @property string $nome
 * @property string $email
 * @property string $senha
 */
class Usuario extends \yii\db\ActiveRecord implements \yii\web\IdentityInterface
{
    public $authKey;
    public $nomeCurto;
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'usuario';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nome', 'username', 'email', 'senha'], 'required'],
            [['nome', 'username', 'email', 'senha'], 'string', 'max' => 300],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nome' => 'Nome',
            'username' => 'Usuário',
            'email' => 'Email',
            'senha' => 'Senha',
        ];
    }

    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    // public static function findIdentity($id)
    // {
    //     return isset(self::$users[$id]) ? new static(self::$users[$id]) : null;
    // }

    // public static function findIdentityByAccessToken($token, $type = null)
    // {
    //     foreach (self::$users as $user) {
    //         if ($user['accessToken'] === $token) {
    //             return new static($user);
    //         }
    //     }

    //     return null;
    // }

    public function getId()
    {
        return $this->id; // Retorne a chave primária do usuário
    }

    public function getAuthKey()
    {
        return $this->authKey;
    }

    public function validateAuthKey($authKey)
    {
        return $this->authKey == $authKey;
    }

    public static function usuarioLogado()
    {
        $user = \Yii::$app->user->identity;

        if($user) {
            $auth = \Yii::$app->authManager;
            $temp = explode(" ", $user['nome']);
            $user['nomeCurto'] = $temp[0] . " " . $temp[count($temp) - 1];
        }

        return $user;
    }

    public function validateSenha($senha)
    {
        return $this->senha === sha1(md5($senha));
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }

    public static function findByUsername($login)
    {
        $user = Usuario::find()->where(['username' => $login])->one();

        if($user)
        {
            return new static($user);
        }

        return null;
    }
}
