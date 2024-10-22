<?php

namespace app\controllers;

use app\models\Usuario;
use app\models\UsuarioSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use Yii;

/**
 * UsuarioController implements the CRUD actions for Usuario model.
 */
class UsuarioController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return array_merge(
            parent::behaviors(),
            [
                'verbs' => [
                    'class' => VerbFilter::className(),
                    'actions' => [
                        'delete' => ['POST'],
                    ],
                ],
            ]
        );
    }

    /**
     * Lists all Usuario models.
     *
     * @return string
     */
    public function actionIndex()
    {
        $searchModel = new UsuarioSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Usuario model.
     * @param int $id ID
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Usuario model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new Usuario();

        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            $senhaDecript = $model->senha;
            $senhaCript = sha1(md5($senhaDecript));
            $model->senha = $senhaCript;
            $model->save();
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing Usuario model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $id ID
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($this->request->isPost && $model->load($this->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Deletes an existing Usuario model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param int $id ID
     * @return \yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();
        return $this->redirect(['index']);
    }

    /**
     * Finds the Usuario model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param int $id ID
     * @return Usuario the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Usuario::findOne(['id' => $id])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }

    public function actionUploadFoto()
    {

        if (Yii::$app->request->isAjax
            && Yii::$app->request->post()
            && !Yii::$app->user->isGuest) {

            $data = Yii::$app->request->post();
            $data = $data['image'];

            if (preg_match('/^data:image\/(\w+);base64,/', $data, $type)) {
                $data = substr($data, strpos($data, ',') + 1);
                $type = strtolower($type[1]); // jpg, png, gif

                if (!in_array($type, ['jpg', 'jpeg', 'png'])) {
                    return $this->asJson(['success' => false, 'msg' => 'Este tipo de extensão é inválido']);
                }

                $data = base64_decode($data);

                if ($data === false) {
                    return $this->asJson(['success' => false, 'msg' => 'Base64_decode falhou. ']);
                }
            } else {
                return $this->asJson(['success' => false, 'msg' => 'Não corresponde ao URI de dados com dados de imagem.']);
            }

            $filePath = "../web/img/avatar/";
            $file = Yii::$app->user->identity->id . "-usuario.jpg";

            if ($type !== 'jpg') {
                $source = imagecreatefromstring($data);
                $rotate = imagerotate($source, 0, 0); // if want to rotate the image
                $gerou = imagejpeg($rotate, $filePath . $file, 100);
                imagedestroy($source);
                if ($gerou) {
                    return $this->asJson(['success' => true, 'msg' => 'Imagem gerada com sucesso.', 'src' => Yii::$app->params['urlPhotoUser'] . '/' . $file]);
                } else {
                    return $this->asJson(['success' => false, 'msg' => 'Não foi possível gerar a imagem.']);
                }
            } else {
                file_put_contents($filePath . $file, $data);
            }

            return $this->asJson(['success' => true, 'msg' => 'Alterado com sucesso.', 'src' => Yii::$app->params['urlPhotoUser'] . '/' . $file]);
        }
        throw new \yii\web\NotFoundHttpException('Error');
    }
}
