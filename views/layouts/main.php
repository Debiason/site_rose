<?php

use yii\helpers\Html;
use yii\widgets\Menu;
use yii\widgets\Breadcrumbs;
use yii\widgets\Avatar;
use app\models\Usuario;
use app\assets\AppAsset;
use yii\helpers\Url;
use yii\bootstrap\Modal;

if (Yii::$app->user->isGuest && Yii::$app->request->url !== Yii::$app->getUrlManager()->createUrl(['/site/login'])) {
	return Yii::$app->getResponse()->redirect(['/site/login']);
}

AppAsset::register($this);
\kartik\select2\Select2Asset::register($this);

$usuarioLogado = \app\models\Usuario::usuarioLogado();


/**
 * @var $this \yii\base\View
 * @var $content string
 */
// $this->registerAssetBundle('app');
// Verifica se existe os dados da sessão de login
?>
<?php $this->beginPage(); ?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Contatos Rose</title>
    <?php $this->head(); ?>

    <meta name="description" content="" />
    <meta name="HandheldFriendly" content="True" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
        integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous">
    </script>
    <!-- <script>
        WebFont.load({
            google: {
                "families": ["Poppins:300,400,500,600,700", "Roboto:300,400,500,600,700"]
                },
                active: function() {
                    sessionStorage.fonts = true;
                    }
                    });
                </script> -->
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"> -->
    <link rel="shortcut icon" href="../web/img/logo2.png" />

    <?php
	$this->registerCssFile("@web/assets/font/font-awesome/css/font-awesome.min.css", ['depends' => [\yii\bootstrap\BootstrapAsset::className()]]);
	$this->registerCssFile("@web/assets/css/materialize.css", ['depends' => [\yii\bootstrap\BootstrapAsset::className()]]);
	$this->registerCssFile("@web/assets/css/prism.css", ['depends' => [\yii\bootstrap\BootstrapAsset::className()]]);
	$this->registerJsFile('@web/js/components/croppiejs/croppie.min.js', ['depends' => [\yii\web\JqueryAsset::className()]]);
	$this->registerJsFile('@web/assets/js/materialize.js', ['depends' => [\yii\web\JqueryAsset::className()]]);
	$this->registerCssFile("@web/js/components/croppiejs/croppie.min.css", ['depends' => [\yii\bootstrap\BootstrapAsset::className()]]);
    $this->registerCssFile("@web/css/site.css", ['depends' => [\yii\bootstrap\BootstrapAsset::className()]]);
	?>

</head>

<body class="post-template page-template page grey lighten-5">
    <?php $this->beginBody() ?>
    <?php
	// Obter o nome do usuário logado
	$username = !Yii::$app->user->isGuest ? Yii::$app->user->identity->nome : '';
	?>
    <nav>
        <div class="nav-wrapper cyan darken-3">
            <?php
			// Definir os itens do menu
			echo Menu::widget([
				'options' => ['id' => "nav-mobile", 'class' => 'left side-nav'],
				'items' => [
					['label' => 'Home', 'url' => ['/']],
					['label' => 'Estados', 'url' => ['/estado']],
					['label' => 'Contatos', 'url' => ['/contato']],
					['label' => 'Login', 'url' => ['site/login'], 'visible' => Yii::$app->user->isGuest],
				],
			]);
			?>

            <?php if (!Yii::$app->user->isGuest) { ?>
            <div class="m-stack__item m-stack__item--middle m-brand__tools">
                <div class="m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-left m-dropdown--align-push"
                    m-dropdown-toggle="click" aria-expanded="true">
                    <div class="m-dropdown__wrapper">
                        <ul class="right">
                            <span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>
                            <div class="m-dropdown__inner box-user-options">

                                <div class="m-dropdown__header m--align-center"
                                    style="background: url(metronic-assets/app/media/img/misc/user_profile_bg.jpg); background-size: cover;">
                                    <div class="m-card-user m-card-user--skin-dark">
                                        <li>
                                            <div class="m-card-user__pic m--img-rounded m--marginless">
                                                <a href="javascript:;" title="Alterar foto"
                                                    onclick="escolherImagemPerfil()">
                                                    <?= \app\widgets\Avatar::widget([
														'id' => Yii::$app->user->identity->id,
														'nome' =>  Yii::$app->user->identity->nome,
														'options' => [
															'class' => 'm--img-rounded m--marginless pro-image-avatar'                                       
														]
													]);
													?>
                                                </a>
                                                <input type="file" id="input-media-profile" value="" accept="image/*"
                                                    style="display: none">
                                            </div>
                                        </li>
                                        <li>
                                            <div class="dropdown">
                                                <button class="btn btn-secondary dropdown-toggle" type="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                    <p class="m-card-user__name m--font-weight-300">
                                                        <?php echo Yii::$app->user->identity->nome; ?>
                                                    </p>
                                                    <p class="m-card-user__email m--font-weight-600 m-link"
                                                        style="font-size: 0.8em;">
                                                        <?php echo Yii::$app->user->identity->email; ?>
                                                    </p>
                                                </button>

                                                <ul class="dropdown-menu">
                                                    <li class="m-nav__item">
                                                        <?php
							
														echo Html::beginForm(['usuario/update', 'id' => Yii::$app->user->id], 'post');
														echo Html::submitButton(
															'Meu perfil ',
															['class' => 'btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder']
														);
														echo Html::endForm();
											
													?>
                                                    </li>
                                                    <li class="m-nav__separator m-nav__separator--fit">
                                                    </li>
                                                    <li class="m-nav__item">
                                                        <?php
							
														echo Html::beginForm(['/site/logout'], 'post');
														echo Html::submitButton(
															'Sair ',
															['class' => 'btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder']
														);
														echo Html::endForm();
											
													?>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            <?php } ?>

            <a class="button-collapse" href="#" data-activates="nav-mobile"><i class="mdi-navigation-menu"></i></a>

        </div>
    </nav>

    <main class="content" role="main">
        <section id="blog-intro" class="cyan section z-depth-1 article-intro"></section>
        <section id="main-inner-container" class="container">
            <article class="post page card-panel z-depth-1 article-container">
                <header>
                    <time class="post-date grey-text"><i class="fa fa-clock-o"></i> <?= date('d/m/Y') ?></time>
                    <h1>Contatos Rose</h1>
                </header>
                <section class="post-content">
                    <?php echo $content; ?>
                </section>
                <footer>
                    <section id="social-share">
                        <p>
                            Minhas redes sociais: <br>
                            <a href="https://www.youtube.com/@gatosdepijama9014" class="btn-floating white cyan-text"><i
                                    class="fa fa-youtube cyan-text"></i></a>
                            <a href="https://www.instagram.com/roseanefreitasbiason/"
                                class="btn-floating white cyan-text"><i class="fa fa-instagram cyan-text"></i></a>
                            <a href="roseane@rfbiasoneditora.com.br" class="btn-floating white cyan-text"><i
                                    class="fa fa-envelope-o cyan-text"></i></a>
                        </p>
                    </section>
                </footer>
            </article>
        </section>
    </main>



    <footer class="site-footer clearfix">
        <section class="copyright grey-text darken-2"><a href="/"
                class="grey-text darken-5"><?php echo Html::encode($this->title); ?></a> &copy; 2024</section>
        <section class="poweredby grey-text darken-2">Desenvolvido por Douglas Biason <a href="http://yiiframework.com"
                class="grey-text darken-5">Yii2</a></section>
    </footer>


    <!-- begin::Scroll Top -->
    <div class="m-scroll-top m-scroll-top--skin-top" data-toggle="m-scroll-top" data-scroll-offset="500"
        data-scroll-speed="300">
        <i class="la la-arrow-up"></i>
    </div>
    <!-- end::Scroll Top -->
    <!-- bengin::modal upload image avatar -->
    <div id="uploadimageModal" class="modal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Alterar foto</h4>
                    <button type="button" class="close" data-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 text-center">

                            <div id="image_demo"></div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success crop_image">Cortar e atualizar</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- end::modal upload image avatar -->


    <?php
	Modal::begin([
		'size' => 'modal-xl',
		'closeButton' => [true],
		'options' => ['class' => '', 'tabindex' => '']
	]);
	echo '<div id="modalContent"></div>';
	Modal::end();
	?>

    <?php $this->endBody() ?>
</body>

</html>
<?php $this->endPage(); ?>