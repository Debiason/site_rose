<?php

/* @var $this \yii\web\View */
/* @var $content string */

use app\widgets\Alert;
use yii\helpers\Html;
use yii\helpers\Url;
use \app\models\Pessoa;
use yii\bootstrap\Modal;

// if ( Yii::$app->user->isGuest )
//     return Yii::$app->getResponse()->redirect(['/']);

// $usuarioLogado = \app\models\Usuario::usuarioLogado();
// $notificacoes = \app\models\Notificacao::find()->where(['destinatario_id' => Yii::$app->user->id])->andWhere(['lido' => 0])->orderBy('id DESC')
    // ->createCommand()->queryAll();

// $this->registerJsFile('@web/js/components/croppiejs/croppie.min.js',['depends' => [\yii\web\JqueryAsset::className()]]);
// $this->registerCssFile("@web/js/components/croppiejs/croppie.min.css", ['depends' => [\yii\bootstrap\BootstrapAsset::className()]]);


/**
 * Testar na resolução 1366x768 para ver se
 * o conteúdo não fica apertado.
 * 
 * 47% dos usuários usam 1366x768
 * 53% dos usuários usam 1920x1080
 * 
 * @var boolean $layout_fluid
 */
$layout_fluid = false;
if(isset($this->params['layout_fluid'])) {
    $layout_fluid = (boolean) $this->params['layout_fluid'];
}

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<!-- begin::Head -->
<head>
    <meta charset="utf-8"/>
    <title>Agrega | <?= Html::encode($this->title) ?></title>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="description" content="Latest updates and statistic charts">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!--begin::Web font -->
    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
    <script>
        WebFont.load({
            google: {"families": ["Poppins:300,400,500,600,700", "Roboto:300,400,500,600,700"]},
            active: function () {
                sessionStorage.fonts = true;
            }
        });
    </script>
    <!--end::Web font -->
    <link rel="shortcut icon" href="/favicon.ico"/>
    <?php $this->head() ?>
    <?= Html::csrfMetaTags() ?>
</head>
<!-- end::Head -->
<!-- end::Body -->
<body class="<?=$layout_fluid ? 'm-page--fluid' : 'm-page--wide'?> m-header--fixed m-header--fixed-mobile m-footer--push m-aside--offcanvas-default">

<div id="spinner-back"></div>
<div id="spinner-front">
    <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Carregando...</span>
    </div>
    Carregando...
</div>
<!-- begin:: Page -->
<div class="m-grid m-grid--hor m-grid--root m-page">
    <!-- begin::Header -->
    <header id="m_header" class="m-grid__item		m-header " m-minimize="minimize" m-minimize-offset="200"
            m-minimize-mobile-offset="200">
        <div class="m-header__top">
            <div class="m-container <?=$layout_fluid ? 'm-container--fluid' : 'm-container--responsive m-container--xxl'?> m-container--full-height m-page__container">
                <div class="m-stack m-stack--ver m-stack--desktop">

                    <!-- begin::Brand -->
                    <div class="m-stack__item m-brand">
                        <div class="m-stack m-stack--ver m-stack--general m-stack--inline">
                            <div class="m-stack__item m-stack__item--middle m-brand__logo">
                                <a href="/" class="m-brand__logo-wrapper">
                                    <img alt="" src="/img/logo-agrega.png"/>
                                </a>
                            </div>


                            <!-- begin::Menu Administracao-->
                            <div class="m-stack__item m-stack__item--middle m-brand__tools">
                                <div class="m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-left m-dropdown--align-push"
                                     m-dropdown-toggle="click" aria-expanded="true">
                                    <!-- <?php if (!Yii::$app->user->isGuest && (Yii::$app->user->can('permissoes/perfil') || Yii::$app->user->can('permissoes/permissao'))): ?> -->
                                        <a href="#"
                                           class="dropdown-toggle m-dropdown__toggle btn btn-outline-primary m-btn  m-btn--icon m-btn--pill">
                                            <span>Administração</span>
                                        </a>
                                        <div class="m-dropdown__wrapper">
                                            <span class="m-dropdown__arrow m-dropdown__arrow--left m-dropdown__arrow--adjust"></span>
                                            <div class="m-dropdown__inner">
                                                <div class="m-dropdown__body">
                                                    <div class="m-dropdown__content">
                                                        <ul class="m-nav">

                                                            <li class="m-nav__item">
                                                                <a href="<?= Url::to(['permissoes/perfil']) ?>"
                                                                   class="m-nav__link">
                                                                    <i class="m-nav__link-icon flaticon-user-settings"></i>
                                                                    <span class="m-nav__link-text">Perfil</span>
                                                                </a>
                                                            </li>
                                                            <li class="m-nav__item">
                                                                <a href="<?= Url::to(['permissoes/permissoes']) ?>"
                                                                   class="m-nav__link">
                                                                    <i class="m-nav__link-icon flaticon-user-ok"></i>
                                                                    <span class="m-nav__link-text">Permissões</span>
                                                                </a>
                                                            </li>
                                                            <li class="m-nav__item">
                                                                <a href="<?= Url::to(['permissoes/limpar-cache']) ?>"
                                                                   class="m-nav__link">
                                                                    <i class="m-nav__link-icon flaticon-refresh"></i>
                                                                    <span class="m-nav__link-text">Limpar cache</span>
                                                                </a>
                                                            </li>
                                                            <li class="m-nav__item mt-2">
                                                                <a href="<?= Url::to(['/log']) ?>"
                                                                   class="m-nav__link">
                                                                    <i class="m-nav__link-icon fas fa-bug"></i>
                                                                    <span class="m-nav__link-text">Logs de erros</span>
                                                                </a>
                                                            </li>
                                                            <li class="m-nav__separator m-nav__separator--fit">
                                                            </li>
                                                            <li class="m-nav__item">
                                                                <a href="<?= Url::to(['/usuario']) ?>"
                                                                   class="m-nav__link">
                                                                    <i class="m-nav__link-icon flaticon-users"></i>
                                                                    <span class="m-nav__link-text">Usuários</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <!-- <?php endif; ?> -->
                                </div>

                                <!-- end::Menu Administrador -->

                                <!-- begin::Responsive Header Menu Toggler-->
                                <a id="m_aside_header_menu_mobile_toggle" href="javascript:;"
                                   class="m-brand__icon m-brand__toggler m--visible-tablet-and-mobile-inline-block">
                                    <span></span>
                                </a>

                                <!-- end::Responsive Header Menu Toggler-->

                                <!-- begin::Topbar Toggler-->
                                <a id="m_aside_header_topbar_mobile_toggle" href="javascript:;"
                                   class="m-brand__icon m--visible-tablet-and-mobile-inline-block">
                                    <i class="flaticon-more"></i>
                                </a>

                                <!--end::Topbar Toggler-->
                            </div>
                        </div>
                    </div>

                    <!-- end::Brand -->

                    <!-- begin::Topbar -->
                    <div class="m-stack__item m-stack__item--fluid m-header-head" id="m_header_nav">
                        <div id="m_header_topbar" class="m-topbar  m-stack m-stack--ver m-stack--general">
                        
                        </div>
                    </div>

                    <!-- end::Topbar -->
                </div>
            </div>
        </div>
        <div class="m-header__bottom">
            <div class="m-container <?=$layout_fluid ? 'm-container--fluid' : 'm-container--responsive m-container--xxl'?> m-container--full-height m-page__container">
                <div class="m-stack m-stack--ver m-stack--desktop">

                    <!-- begin::Horizontal Menu -->
          
                    <!-- end::Horizontal Menu -->

                    <!--begin::Search-->
                    <div class="m-stack__item m-stack__item--middle m-dropdown m-dropdown--arrow m-dropdown--large m-dropdown--mobile-full-width m-dropdown--align-right m-dropdown--skin-light m-header-search m-header-search--expandable m-header-search--skin-"
                         id="m_quicksearch"
                         m-quicksearch-mode="default">

                        <!--begin::Search Form -->
                        <form class="m-header-search__form" action="/site/search">
                            <div class="m-header-search__wrapper">
                                <span class="m-header-search__icon-search" id="m_quicksearch_search">
                                    <i class="la la-search"></i>
                                </span>
                                <span class="m-header-search__input-wrapper">
                                    <input autocomplete="off" type="text" name="q" class="m-header-search__input"
                                           value="" placeholder="Busca..." id="m_quicksearch_input">
                                </span>
                                <span class="m-header-search__icon-close" id="m_quicksearch_close">
                                    <i class="la la-remove"></i>
                                </span>
                                <span class="m-header-search__icon-cancel" id="m_quicksearch_cancel">
                                    <i class="la la-remove"></i>
                                </span>
                            </div>
                        </form>

                        <!--end::Search Form -->

                        <!--begin::Search Results -->
                        <div class="m-dropdown__wrapper">
                            <div class="m-dropdown__arrow m-dropdown__arrow--center"></div>
                            <div class="m-dropdown__inner">
                                <div class="m-dropdown__body">
                                    <div class="m-dropdown__scrollable m-scrollable" data-scrollable="true"
                                         data-height="auto" data-mobile-height="auto" style="max-height: 250px">
                                        <div class="m-dropdown__content m-list-search m-list-search--skin-light">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--end::Search Results -->
                    </div>

                    <!--end::Search-->
                </div>
            </div>
        </div>
    </header>

    <!-- end::Header -->
    <!-- begin::Body -->
    <div class="m-grid__item m-grid__item--fluid m-grid m-grid--hor-desktop m-grid--desktop m-body">
        <div class="m-grid__item m-grid__item--fluid  m-grid m-grid--ver m-container <?=$layout_fluid ? 'm-container--fluid' : 'm-container--responsive m-container--xxl'?> m-page__container">
            <div class="m-grid__item m-grid__item--fluid m-wrapper">
                <!-- BEGIN: Subheader -->
                <?php if ($this->title == 'Painel') { ?>
                    <div class="m-subheader ">
                        <div class="d-flex align-items-center">
                            <div class="mr-auto">
                                <h3 class="m-subheader__title ">
                                    <?= Html::encode($this->title) ?>
                                </h3>
                            </div>
                            <div>
                                <!--<span class="m-subheader__daterange" id="m_dashboard_daterangepicker">
                                    <span class="m-subheader__daterange-label">
                                        <span class="m-subheader__daterange-title"></span>
                                        <span class="m-subheader__daterange-date m--font-brand"></span>
                                    </span>
                                    <a href="#" class="btn btn-sm btn-brand m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill">
                                        <i class="la la-angle-down"></i>
                                    </a>
                                </span>-->
                            </div>
                        </div>
                    </div>
                <?php } else { ?>
                    <!-- BEGIN: Subheader -->
                    <div class="m-subheader ">
                        <div class="d-flex align-items-center">
                            <div class="mr-auto">
                                <h3 class="m-subheader__title m-subheader__title--separator"><?= Html::encode($this->title) ?></h3>
                                <?php if (isset($this->params['breadcrumbs'])) { ?>
                           
                                <?php } ?>
                            </div>
                   
                        </div>
                    </div>
                <?php } ?>
                <!-- END: Subheader -->
                <div class="m-content">
                    <?= $content ?>
                </div>
            </div>
        </div>
    </div>
    <!-- end::Body -->
    <!-- begin::Footer -->
    <footer class="m-grid__item m-footer d-print-none">
        <div class="m-container <?=$layout_fluid ? 'm-container--fluid' : ''?> m-container--responsive m-container--xxl m-container--full-height m-page__container">
            <div class="m-footer__wrapper">
                <div class="m-stack m-stack--flex-tablet-and-mobile m-stack--ver m-stack--desktop">
                    <div class="m-stack__item m-stack__item--left m-stack__item--middle m-stack__item--last">
								<span class="m-footer__copyright">
									<?=date('Y')?> &copy; Agrega
									<a href="https://www.funarbe.org.br" class="m-link" target="_blank">
										Fundação Arthur Bernardes
									</a>
								</span>
                    </div>
                    <div class="m-stack__item m-stack__item--right m-stack__item--middle m-stack__item--first">
                        <ul class="m-footer__nav m-nav m-nav--inline m--pull-right">
                            <li class="m-nav__item">
                                <a href="/confluence" class="m-nav__link">
                                    <span class="m-nav__link-text">
                                        Novidades
                                    </span>
                                </a>
                            </li>
                            <li class="m-nav__item">
                                <a href="/site/about" class="m-nav__link">
                                    <span class="m-nav__link-text">
                                        Sobre o Agrega
                                    </span>
                                </a>
                            </li>
                            <li class="m-nav__item m-nav__item--last">
                                <a href="/support-center" class="m-nav__link" data-toggle="m-tooltip"
                                   title="Central de Ajuda" data-placement="left">
                                    <i class="m-nav__link-icon flaticon-info m--icon-font-size-lg3"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- end::Footer -->
</div>
<!-- end:: Page -->
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

?>
<?php if(YII_ENV_PROD){ ?>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-48399105-7"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-48399105-7');
    </script>

    <!-- Hotjar Tracking Code for https://agrega.funarbe.org.br -->
    <script>
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3337971,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    </script>
<?php } ?>

<?php $this->endBody() ?>
</body>
<!-- end::Body -->
</html>
<?php $this->endPage() ?>
