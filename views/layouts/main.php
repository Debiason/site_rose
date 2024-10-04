<?php

use yii\helpers\Html;
use yii\widgets\Menu;
use yii\widgets\Breadcrumbs;
use yii\widgets\Avatar;
use app\models\Usuario;

/**
 * @var $this \yii\base\View
 * @var $content string
 */
// $this->registerAssetBundle('app');
$usuarioLogado = Usuario::usuarioLogado();

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
		<link rel="shortcut icon" href="/favicon.ico"/>

		<?php
		$this->registerCssFile("@web/assets/font/font-awesome/css/font-awesome.min.css", ['depends' => [\yii\bootstrap5\BootstrapAsset::className()]]);
		$this->registerCssFile("@web/assets/css/materialize.css", ['depends' => [\yii\bootstrap5\BootstrapAsset::className()]]);
		$this->registerCssFile("@web/assets/css/prism.css", ['depends' => [\yii\bootstrap5\BootstrapAsset::className()]]);
		?>

</head>
<body class="post-template page-template page grey lighten-5">
  <?php $this->beginBody() ?>
	<nav>
		<div class="nav-wrapper cyan darken-3">
	  		<?php
						echo Menu::widget([
						    'options' => ['id' => "nav-mobile", 'class' => 'left side-nav'],
						    'items' => [
						        ['label' => 'Home', 'url' => ['site/index']],
						        ['label' => 'About', 'url' => ['site/about']],
						        ['label' => 'Contact', 'url' => ['site/contact']],
						        ['label' => 'Login', 'url' => ['site/login'], 'visible' => Yii::$app->user->isGuest],
						    ],
						]);
					?>
			<a class="button-collapse" href="#" data-activates="nav-mobile"><i class="mdi-navigation-menu"></i></a>
			<div class="text-align-left"><span><?=$usuarioLogado->nome ?? '' ?></span></div>
		</div>                         
	</nav>

		

<main class="content" role="main">
		<section id="blog-intro" class="cyan section z-depth-1 article-intro" style="background-image:url('@web/assets/images/post.jpg?v=b2f76a195e');"></section>
	<section id="main-inner-container" class="container">
		<article class="post page card-panel z-depth-1 article-container">
			<header>
				<time class="post-date grey-text"><i class="fa fa-clock-o"></i> <?= date('d/m/Y')?></time>
				<h1>Contatos Rose</h1>
			</header>	
			<section class="post-content">
				<?php echo $content; ?>
			</section>
			<footer>
				<section id="social-share">
					<p>
						Minhas redes sociais: <br>
						<a href="#" class="btn-floating white cyan-text"><i class="fa fa-youtube cyan-text"></i></a>
						<a href="#" class="btn-floating white cyan-text"><i class="fa fa-instagram cyan-text"></i></a>
						<a href="#" class="btn-floating white cyan-text"><i class="fa fa-envelope-o cyan-text"></i></a>
					</p>
				</section>
			</footer>
		</article>
	</section>
</main>



		<footer class="site-footer clearfix">
			 <section class="copyright grey-text darken-2"><a href="/" class="grey-text darken-5"><?php echo Html::encode($this->title); ?></a> &copy; 2024</section>
			 <section class="poweredby grey-text darken-2">Desenvolvido por Douglas Biason <a href="http://yiiframework.com" class="grey-text darken-5">Yii2</a></section>
		</footer>

		<script src="/assets/js/jquery.min.js"></script>
<?php
		 $this->registerJsFile('@web/assets/js/materialize.js',['depends' => [\yii\web\JqueryAsset::className()]]);
		 $this->registerJsFile('@web/assets/js/prism.js',['depends' => [\yii\web\JqueryAsset::className()]]);
?>

  <?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage(); ?>