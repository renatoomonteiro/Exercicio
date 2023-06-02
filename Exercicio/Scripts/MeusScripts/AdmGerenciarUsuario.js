getListaUsuario();

function getListaUsuario() {
    
    requisicaoAssincrona("POST", "../Usuario/GetListaUsuario", "", sucessoGetUser, erroGetUser)
}

function sucessoGetUser(json) {

    var objListarUsuario = JSON.parse(json.retornoListaUsuario);

    var card = [];

    
    $("#cardUsuario").html("");
    $.each(objListarUsuario, function(i, obj) {

        var _id = JSON.stringify(obj._id);
        var nome = JSON.stringify(obj.nome);
        var dtNascimento = JSON.stringify(obj.dtNascimento);
        var sexo = JSON.stringify(obj.sexo);
        var email = JSON.stringify(obj.email);
        var endereco = JSON.stringify(obj.endereco);
        var perfil = JSON.stringify(obj.perfil);
        

        var conteudo =
            "<div class='panel panel-body col-md-3																																" +
            "    <div class='media'>                                                                                                                                            " +
            "        <div class='media-left'>                                                                                                                                   " +
            "            <a href='assets/images/placeholder.jpg'>                                                                                                               " +
            "                <img src='../Imagens/perfil.jpg' class='img-circle img-lg' alt=''>        " +
            "            </a>                                                                                                                                                   " +
            "        </div>                                                                                                                                                     " +
            "                                                                                                                                                                   " +
            "        <div class='media-body'>                                                                                                                                   " +
            "            <h6 class='media-heading'>"+obj.nome+"</h6>                                                                                                         " +
            "            <span class='text-muted'>"+obj.email+"</span>                                                                                                         " +
            "        </div>                                                                                                                                                     " +
            "                                                                                                                                                                   " +
            "        <div class='media-right media-middle'>                                                                                                                     " +
            "            <ul class='icons-list'>                                                                                                                                " +
            "                <li class='dropdown'>                                                                                                                              " +
            "                    <a href='#' class='dropdown-toggle' data-toggle='dropdown'>                                                                                    " +
            "                        <i class='icon-menu7'></i>                                                                                                                 " +
            "                    </a>                                                                                                                                           " +
            "                                                                                                                                                                   " +
            "                    <ul class='dropdown-menu dropdown-menu-right'>                                                                                                 " +
            "                        <li onclick = 'AbrirFormEdicao(" + _id + " , " + nome + " , " + dtNascimento + " , " + sexo + " , " + email + " , " + endereco + "," + perfil + ")' ><a href='#'><i class='icon-pen pull-right'></i>Editar</a></li>                                                     " +
            "                        <li onclick = 'deletarUsuario(" + _id + ")'><a href='#'><i class='icon-backspace pull-right'></i>Excluir</a></li>                                                                " +
            //"                        <li><a href='#'><i class='icon-mail5 pull-right'></i> Send mail</a></li>                                                                   " +
            //"                        <li class='divider'></li>                                                                                                                  " +
            //"                        <li><a href='#'><i class='icon-statistics pull-right'></i> Statistics</a></li>                                                             " +
            "                    </ul>                                                                                                                                          " +
            "                </li>                                                                                                                                              " +
            "            </ul>                                                                                                                                                  " +
            "        </div>                                                                                                                                                     " +
            "    </div>                                                                                                                                                         " +
            "</div>                                                                                                                                                             ";


        card.push(conteudo);
    })

    $("#cardUsuario").html(card)
}

function erroGetUser(json) {

    alert("Erro Get User List");
}

function deletarUsuario(id) {

    if (id !== null) {
        let dados = {
            indice:id
        }

        requisicaoAssincrona("POST", "../Usuario/DeletarUsuario", dados, sucessoDeletar, erroDeletar)

    }
}

function sucessoDeletar(json) {

    msgSucesso("O usuário " + json.retDelete + " foi removido com sucesso!");

    //swal("Apagado", "O usuário " + json.retDelete + " foi removido com sucesso!", "success");
    //getListaUsuario();

    //swal({
    //    title: "Aviso:",
    //    text: "Deseja realmente excluir o usuário " + json.retDelete + "?",
    //    type: "warning",
    //    showCancelButton: true,
    //    confirmButtonColor: "#66BB6A",
    //    cancelButtonColor: '#d33',
    //    confirmButtonText: "Sim",
    //    cancelButtonText: "Não",
    //    closeOnConfirm: true,
    //    closeOnCancel: true
    //})

    //Swal.fire({
    //    title: 'Do you want to save the changes?',
    //    showDenyButton: true,
    //    showCancelButton: true,
    //    confirmButtonText: 'Save',
    //    denyButtonText: `Don't save`,
    //}).then((result) => {
    //    /* Read more about isConfirmed, isDenied below */
    //    if (result.isConfirmed) {
    //        Swal.fire('Saved!', '', 'success')
    //    } else if (result.isDenied) {
    //        Swal.fire('Changes are not saved', '', 'info')
    //    }
    //})

    getListaUsuario();
}



function erroDeletar(json) {
    alert("Deu errado!")
}

function AbrirFormEdicao(id, nome, dtNascimento, sexo, email, endereco, perfil) {
    $("#formEditarUsuario").show("slow");
    $("#IdEdit").val(id);

    $("#txtNomeCompletoEdit").val(nome);
    $("#txtDataNascimentoEdit").val(dtNascimento);
    $("#txtSexoEdit").val(sexo);
    $("#txtEmailEdit").val(email);
    $("#txtEnderecoEdit").val(endereco);
    $("#imagemPerfil").val(perfil);

    $("#formEditarUsuario").show("slow")
}

//const { ObjectId } = require('mongodb');

//function convertToObjectId(str) {
//    /* Verifica se a string é um formato válido*/
//    if (/^[0-9a-fA-F]{24}$/.test(str)) {
//        return { $oid: str };
//    }
//    return null;
//}

function editarUsuario() {

    //var _id = JSON.stringify(obj._id);

    var objUsuarioEdit = {

        //IdEdit: new ObjectId($("#IdEdit").val()),

        //IdEdit: convertToObjectId($("#IdEdit").val()),

        IdEdit: $("#IdEdit").val(),        
        nome: $("#txtNomeCompletoEdit").val(),
        email: $("#txtEmailEdit").val(),
        sexo: $("#txtSexoEdit").val(),
        endereco: $("#txtEnderecoEdit").val(),
        dtNascimento: $("#txtDataNascimentoEdit").val(),
        perfil: $("imagemPerfil").val(),
        flag: "1"
    }

    requisicaoAssincrona("POST", "../Usuario/EditarUsuario", objUsuarioEdit, sucessoEdit, erroEdit)

    $("#formEditarUsuario").hide("slow")

}

function sucessoEdit(json) {
    
    msgSucesso("O usuário " + json.retDelete + " foi alterado com sucesso!");
    getListaUsuario();
    //swal("Atualizado", "O usuário " + json.retDelete + " foi alterado com sucesso!", "success");
    //getListaUsuario();
}

function erroEdit(json) {
    msgErro("O usuário " + json.retDelete + " não pode ser atualizado!")
}

//$("#formEditarUsuario").show("slow")
//$("#IdEdit").val(id)

//Funções de edição do usuário
function editarCamposUsuario() {

    var nomeCompletoEdit = $("#txtNomeCompletoEdit").val();
    var dataNascimentoEdit = $("#txtDataNascimentoEdit").val();
    var sexoEdit = $("#txtSexoEdit").val();
    var emailEdit = $("#txtEmailEdit").val();
    var enderecoEdit = $("#txtEnderecoEdit").val();

    var prosseguir = validarCamposEdit(nomeCompletoEdit, dataNascimentoEdit, sexoEdit, emailEdit, enderecoEdit);

    if (prosseguir) {

        var objEditUsuario = {

            nome: nomeCompletoEdit,
            dtNascimento: dataNascimentoEdit,
            sexo: sexoEdit,
            email: emailEdit,
            endereco: enderecoEdit,
            flag: "1"
        }

        requisicaoAssincrona("POST", "../Home/EditarUsuario", objEditUsuario, sucessoCamposUsuario, erroCamposUsuario);

    }

}

function sucessoCamposUsuario(json) {
    var objRet = json;

    if (objRet.ret == "ok") {
        //Tratar o erro
        recoherCamposEdit();

        window.location.assign("/")
    } else {
        //alert(objRet.ret);
        //limparCampos();

        //window.location.assign("/")
    }
}

function erroCamposUsuario(json) {
    alert("Tudo deu errado!")
}

function validarCamposEdit(nomeCompletoEdit, dataNascimentoEdit, sexoEdit, emailEdit, enderecoEdit) {
    var continuar = false;

    if (nomeCompletoEdit != "") {
        continuar = true;
    } else {
        continuar = false;
        alert("Preencha o seu nome completo!");
    }

    if (dataNascimentoEdit != "") {
        continuar = true;
    } else {
        continuar = false;
        alert("Preencha a sua data de nascimento!");
    }

    if (sexoEdit != "") {
        continuar = true;
    } else {
        continuar = false;
        alert("Preencha o sexo!");
    }

    if (emailEdit != "") {
        continuar = true;
    } else {
        continuar = false;
        alert("Preencha o e-mail!");
    }

    if (enderecoEdit != "") {
        continuar = true;
    } else {
        continuar = false;
        alert("Preencha o endereço!");
    }

    return continuar;
}

//function limparCamposEdit() {
//    //Capturar o valor = .val("");
//    $("#txtNomeCompletoEdit").val("");
//    $("#txtDataNascimentoEdit").val("");
//    $("#txtSexoEdit").val("");
//    $("#txtEmailEdit").val("");
//    $("#txtEnderecoEdit").val();

//}

function recolherCamposEdit() {
    $("#formEditarUsuario").hide("slow");
}