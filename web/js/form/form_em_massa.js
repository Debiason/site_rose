
var elements = document.querySelectorAll('.fileinput-upload ');
if (elements) {
    elements.forEach(function (element) {
        var formPrincipal = document.getElementById(formName);
        if (formPrincipal) {
            element.disabled = true;
            fnbPageBlock();
            setTimeout(function () {
                var isInvalid = document.querySelectorAll('.is-invalid').length > 0;
                if (isInvalid) {
                    element.disabled = false;
                    fnbPageUnblock();
                }
            }, 300);
        }
    });
}