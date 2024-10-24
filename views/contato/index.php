<?php

use app\models\Contato;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/** @var yii\web\View $this */
/** @var app\models\ContatoSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Contatos';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="contato-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Novo Contato', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php  //echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            'cidade',
            'telefone',
            'email:email',
            'endereco',
            'dt_contato',
            'contato_realizado',
            'obs',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Contato $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
