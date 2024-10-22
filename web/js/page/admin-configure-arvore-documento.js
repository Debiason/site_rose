$(() => {
  const inputEditDecription = $(".input-edit-description");

  // begin::desbloqueio_input
  $(document).on("click", ".btn-edit-blocked", (e) => {
    const self = $(e.currentTarget);
    const profile = self.data("profile");

    e.preventDefault();

    self
      .removeClass("btn-edit-allowed btn-danger")
      .addClass("btn-edit-blocked btn-secondary");

    self.find("i").removeClass("fa-times").addClass("fa-lock-open");

    inputEditDecription.attr("disabled", true);

    setTimeout(() => {
      self
        .removeClass("btn-edit-blocked btn-secondary")
        .addClass("btn-edit-allowed btn-danger");

      self.find("i").removeClass("fa-lock-open").addClass("fa-times");

      $(`#${profile}`).removeAttr("disabled");
      $(`#cancel-${profile}`).removeAttr("disabled");
    }, 300);
  });

  // end::desbloqueio_input

  // begin::bloqueio_input
  $(document).on("click", ".btn-edit-allowed", (e) => {
    const self = $(e.currentTarget);
    const profile = self.data("profile");

    self
      .removeClass("btn-edit-allowed btn-danger")
      .addClass("btn-edit-blocked btn-secondary");

    self.find("i").removeClass("fa-times").addClass("fa-lock-open");

    inputEditDecription.attr("disabled", true);

    setTimeout(() => {
      self
        .removeClass("btn-edit-allowed btn-danger")
        .addClass("btn-edit-blocked btn-secondary");

      self.find("i").removeClass("fa-times").addClass("fa-lock-open");

      $(`#${profile}`).attr("disabled", true);
      $(`#cancel-${profile}`).attr("disabled", true);
    }, 300);
  });

  // end::bloqueio_input

  // begin::input_dados
  $(document).on("input", ".input-edit-description", (e) => {
    const self = $(e.target);
    const oldValue = String(self.data("description")).trim();
    const currentValue = String(self.val()).trim();
    const inputId = String(self.attr("id")).trim();
    const btnAction = $(`#btn-action-${inputId}`);

    console.log(oldValue, currentValue);

    if (oldValue !== currentValue) {
      btnAction
        .removeClass("btn-edit-allowed btn-danger")
        .addClass("btn-edit-save btn-success");

      btnAction.find("i").removeClass("fa-times").addClass("far fa-save");
    } else {
      btnAction
        .removeClass("btn-edit-save btn-success")
        .addClass("btn-edit-allowed btn-danger");

      btnAction.find("i").removeClass("far fa-save").addClass("fa-times");
    }
  });
  // end::input_dados

  // begin::cancelar_acao
  $(".btn-cancel-action").on("click", (e) => {
    const cancelId = $(e.currentTarget).data("id");
    const currentInput = $(`#${cancelId}`);
    const oldValue = currentInput.data("description");
    currentInput.val(oldValue);

    const btnAction = $(`#btn-action-${cancelId}`);

    currentInput.attr("disabled", true);
    $(`#cancel-${cancelId}`).setAttribute("disabled", "disabled");

    btnAction
      .removeClass("btn-edit-allowed btn-danger btn-edit-save btn-success")
      .addClass("btn-edit-blocked btn-secondary");

    btnAction
      .find("i")
      .removeClass("far fa-save fa-times")
      .addClass("fa-lock-open");
  });

  // end::cancelar_acao

  // begin:salvar_descricao_perfil
  $(document).on("click", ".btn-edit-save", (e) => {
    const selfBtn = $(e.currentTarget);
    const profile = selfBtn.data("profile");
    const inputProfile = $(`#${profile}`);
    const newDescription = inputProfile.val().trim();

    selfBtn.attr("disabled", "disabled");

    if (newDescription.length === 0) {
      toastr.error("Erro: Descrição não pode ser vazia!");
      selfBtn.removeAttr("disabled");
      return false;
    }

    $.post("/arvore-documento/salvar-descricao-perfil", {
      profile,
      description: newDescription,
    })
      .done((response) => {
        selfBtn.removeAttr("disabled");

        try {
          if (response.success) {
            toastr.success(response.msg);

            const btnAction = $(`#btn-action-${profile}`);

            $(`#${profile}`).attr("disabled", true);
            $(`#cancel-${profile}`).attr("disabled", true);

            btnAction
              .removeClass(
                "btn-edit-allowed btn-danger btn-edit-save btn-success"
              )
              .addClass("btn-edit-blocked btn-secondary");

            btnAction
              .find("i")
              .removeClass("far fa-save fa-times")
              .addClass("fa-lock-open");
          } else {
            throw new Error(response.msg);
          }
        } catch (e) {
          toastr.error(e);
        }
      })
      .fail(() => {
        selfBtn.removeAttr("disabled");
        toastr.error("Erro: Não foi possível se comunicar com o servidor!");
      });
    return false;
  });
  // end:salvar_descricao_perfil


  $(document).on("click", ".perfil-checkbox", function (e) {
    var element_input_id = e.currentTarget.value;
    var status = e.currentTarget.checked;

    if(status) {
      if(String($(`#${element_input_id}`).val()).length === 0 ||
        $(`#${element_input_id}`).is(':disabled') === false) {
        toastr.error('Descrição não pode estar vazia!');
        e.currentTarget.checked = false;
      }
    }
  });

  // begin::salvar_perfis
  $(document).on("click", ".btn-salvar-perfis-visiveis", () => {
    const selfBtn = $(".btn-salvar-perfis-visiveis");
    const selected = [];
    const checkboxPerfil = document.querySelectorAll(".perfil-checkbox");

    selfBtn.attr("disabled", true);

    checkboxPerfil.forEach((element) => {
      if (element.checked) {
        selected.push(element.value);
      }
    });

    $.post("/arvore-documento/salvar-perfis-visiveis", { selected })
      .done((response) => {
        try {
          toastr[response.success ? "success" : "error"](response.msg);
        } catch (e) {
          toastr.error(e);
        }
        selfBtn.attr("disabled", false);
      })
      .fail(() => {
        selfBtn.attr("disabled", false);
        toastr.error("Erro: Não foi possível se comunicar com o servidor!");
      });
  });
  // end:salvar_perfis
});

$("#lista-arquivo-index").on('click', function (e) {
  var isCarregado = !!parseInt($(this).data('carregado'))
  console.log(isCarregado, 'isCarregado')
  if(!isCarregado) {
    $(this).data('carregado', 1)
    $("#m_tabs_1_2").load('/arvore-documento-lista-arquivo/index');
  }
});
