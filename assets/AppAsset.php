<?php
/**
 * @link https://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license https://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * Main application asset bundle.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/site.css',
    ];
    public $js = [
        //'metronic-assets/vendors/base/vendors.bundle.js',
        'metronic-assets/demo/demo5/base/scripts.bundle.js',
        //'metronic-assets/vendors/custom/fullcalendar/fullcalendar.bundle.js',
        //'metronic-assets/app/js/dashboard.js',
        //BOOTSTRAP
        'js/bootstrap.bundle.js',
        //COMPONENTS
        'js/components/toastr/toastr.min.js',
        'js/components/sweetalert2/sweetalert2.all.min.js',
        'js/components/moment/moment.js',
        'js/components/moment/moment-timezone.js',
        'js/components/perfect-scrollbar/dist/perfect-scrollbar.min.js',
        'js/components/fullcalendar/fullcalendar.min.js',
        'js/components/fullcalendar/locale-all.js',
        'js/components/blockui/jquery.blockUI.js',
        //AGREGA COMPONENTS
        'js/main.js?v=1.2',
        'js/components/tabs.js?v=1.1',
        'js/components/gridfield.js',
        'metronic-assets/app/js/my-script.js',
        "js/components/apexcharts/apexcharts.min.js"
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset'
    ];
}
