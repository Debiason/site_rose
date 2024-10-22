var Login = function() {

    var handleLogin = function() {

        // ajax login function to be called right after the form validation success
        var ajaxLogin = function(form)
        {
            form = $(form);
            ajaxCall({
                url: "/default/index/login/format/json",
                data: form.serialize(),
                dataType: "text",
                beforeSend:function(){
                    App.blockUI({
                        message: 'Carregando',
                        target: '.login-form',
                        boxed: true
                    });
                },
                error: function(jqXHR, textStatus, errorThrown){
                    var responseText = jQuery.parseJSON(jqXHR.responseText),
                        msg = responseText.msg;
                    App.alert({
                        container: '#alerts_login',
                        type: 'danger',
                        message: msg,
                        focus: true,
                        closeInSeconds: '10'
                    });

                },
                success: function(data){
                    window.location = '/';
                },
                complete: function(jqXHR, textStatus){
                    App.unblockUI('.login-form'); //release the block
                }
            });
        };

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                login: {
                    required: true
                },
                senha: {
                    required: true
                },
                remember: {
                    required: false
                }
            },

            messages: {
                login: {
                    required: "Login é obrigatório."
                },
                senha: {
                    required: "Senha é obrigatória."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit
                App.alert({
                    container: '#alerts_login',
                    type: 'danger',
                    message: 'Exite(m) erro(s) de validação no formulario. Favor verificar as mensagens abaixo.',
                    focus: true,
                    closeInSeconds: '10'
                });
            },

            highlight: function(element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element);
            },

            submitHandler: function(form) {
                ajaxLogin(form); // form validation success, call ajax form submit
            }
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
    }

    var handleForgetPassword = function()
    {
        var ajaxForgetPassword = function(form) {
            form = $(form);
            ajaxCall({
                url: "/default/usuario/reset-password/format/json",
                data: form.serialize(),
                dataType: "text",
                beforeSend:function(){
                    App.setAssetsPath('/assets/');
                    App.blockUI({
                        message: 'Carregando',
                        target: '.forget-form',
                        boxed: true
                    });
                    $('.alert-danger', $('.forget-form')).hide();
                },
                error: function(jqXHR, textStatus, errorThrown){
                    var responseText = jQuery.parseJSON(jqXHR.responseText),
                        msg = responseText.msg;
                    App.alert({
                        container: '#alerts_forget',
                        type: 'danger',
                        message: msg,
                        focus: true,
                        closeInSeconds: '10'
                    });
                },
                success: function(data, textStatus, jqXHR){
                    var responseText = jQuery.parseJSON(jqXHR.responseText),
                        msg = responseText.msg;
                    App.alert({
                        container: '#alerts_forget', // alerts parent container(by default placed after the page breadcrumbs)
                        type: 'success',
                        message: msg,
                        focus: true,
                        closeInSeconds: '3'
                    });
                },
                complete: function(jqXHR, textStatus){
                    App.unblockUI('.forget-form'); //release the block
                }
            });
        };

        $('.forget-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },

            messages: {
                email: {
                    required: "Email é obrigatório."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit
                App.alert({
                    container: '#alerts_forget',
                    type: 'danger',
                    message: 'Digite o seu email.',
                    focus: true,
                    closeInSeconds: '10'
                });
            },

            highlight: function(element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
                ajaxForgetPassword(form);
            }
        });

        $('.forget-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    $('.forget-form').submit();
                }
                return false;
            }
        });

        jQuery('#forget-password').click(function() {
            jQuery('.login-form').hide();
            jQuery('.forget-form').show();
        });

        jQuery('#back-btn').click(function() {
            jQuery('.login-form').show();
            jQuery('.forget-form').hide();
        });

    }

    var handleRegister = function() {

        function format(state) {
            if (!state.id) { return state.text; }
            var $state = $(
             '<span><img src="../assets/global/img/flags/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
            );

            return $state;
        }

        if (jQuery().select2 && $('#country_list').size() > 0) {
            $("#country_list").select2({
	            placeholder: '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
	            templateResult: format,
                templateSelection: format,
                width: 'auto',
	            escapeMarkup: function(m) {
	                return m;
	            }
	        });


	        $('#country_list').change(function() {
	            $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
	        });
    	}

        $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {

                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                address: {
                    required: true
                },
                city: {
                    required: true
                },
                country: {
                    required: true
                },

                login: {
                    required: true
                },
                senha: {
                    required: true
                },
                rpassword: {
                    equalTo: "#register_password"
                },

                tnc: {
                    required: true
                }
            },

            messages: { // custom messages for radio buttons and checkboxes
                tnc: {
                    required: "Please accept TNC first."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                form.submit();
            }
        });

        $('.register-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.register-form').validate().form()) {
                    $('.register-form').submit();
                }
                return false;
            }
        });

        jQuery('#register-btn').click(function() {
            jQuery('.login-form').hide();
            jQuery('.register-form').show();
        });

        jQuery('#register-back-btn').click(function() {
            jQuery('.login-form').show();
            jQuery('.register-form').hide();
        });
    }

    return {
        //main function to initiate the module
        init: function() {

            handleLogin();
            handleForgetPassword();
            handleRegister();

        }

    };

}();

jQuery(document).ready(function() {
    Login.init();
});