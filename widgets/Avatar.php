<?php

namespace app\widgets;

use app\components\FnbHelper;
use yii\base\Widget;

class Avatar extends Widget
{
    public $id;
    public $nome;
    public $options;

    public function init()
    {

        parent::init();

        $this->id = $this->id === null ? 0 : $this->id;
        $this->nome = $this->nome === null ? '' : $this->nome;
        $this->options = $this->options === null ? [] : $this->options;
    }

    public function run()
    {
        $linkImagem =  $this->getPhoto((int)$this->id, (string)$this->nome);
        $cache = strpos($linkImagem, 'https') === false ? filemtime( \Yii::getAlias('@webroot') . $linkImagem) : 1;

        $out = "<img src='". $linkImagem. "?v={$cache}'";
        if(!empty($this->options) && is_array($this->options)) {
            foreach ($this->options as $key => $value) {
                if(!is_numeric($key)){
                    $out.="{$key}='{$value}'";
                }
            }
        }
        $out.= " />";
        return $out;
    }

    public function hasPhoto(int $id = null)
    {
        if(empty($id)) return false;

        $file = \Yii::getAlias('@webroot') . \Yii::getAlias('@photo') . "/{$id}-usuario.jpg";
        if(file_exists($file))
            return true;
        return false;
    }

    public function getPhoto(int $id = 0, string $nome = '')
    {
        if(!empty($nome)){
            $nome_ar = explode(' ', $nome);
            $nome_ar = array_values(array_filter($nome_ar));
            if(count($nome_ar) > 1) {
                $nome = current($nome_ar) . ' ' . end($nome_ar);
            } else {
                $nome = current($nome_ar);
            }
        }
        if($this->hasPhoto($id))
            return \Yii::$app->params['urlPhotoUser']  ."/{$id}-usuario.jpg";
        else
            return "https://ui-avatars.com/api/?length=2&name=" . str_replace(" ", '+', $nome);
    }
}