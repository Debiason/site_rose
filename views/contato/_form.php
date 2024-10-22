<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use kartik\select2\Select2;
use app\models\Estado;
use yii\helpers\ArrayHelper;

/** @var yii\web\View $this */
/** @var app\models\Contato $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="contato-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'cidade')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'telefone')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'email')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'endereco')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'cep')->textInput(['maxlength' => true]) ?>

    <?php
    $dataPedido = Estado::find()
        ->select(['id', 'nome_estado as nome'])
        ->where('id is not null')
        ->createCommand()->queryAll();
    ?>

    <?= $form->field($model, 'id_estado')->widget(Select2::classname(), [
        'data' => ArrayHelper::map($dataPedido, 'id', 'nome'),
        'theme' => Select2::THEME_DEFAULT,
        ])->label('Estado');
    ?>

    <div class="form-group mt-4">
        <?= Html::submitButton('Salvar', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

    <script type="application/javascript">
        var span = document.querySelector(".select-dropdown");
  
    </script>

</div>
