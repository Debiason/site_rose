<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\Contato $model */

$this->title = 'Create Contato';
$this->params['breadcrumbs'][] = ['label' => 'Contatos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="contato-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
