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

        var conteudo =
            "<div class='panel panel-body col-md-3																																" +
            "    <div class='media'>                                                                                                                                            " +
            "        <div class='media-left'>                                                                                                                                   " +
            "            <a href='assets/images/placeholder.jpg'>                                                                                                               " +
            "                <img src='https://img2.gratispng.com/20180518/rbi/kisspng-user-computer-icons-symbol-5aff29c27daa60.7927792015266718105147.jpg' class='img-circle img-lg' alt=''>        " +
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
            "                        <li onclick = 'editarUsuario(" + _id + ")' ><a href='#'><i class='icon-pen pull-right'></i>Editar</a></li>                                                     " +
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

    swal("Apagado", "O usuário " + json.retDelete + " foi removido com sucesso!", "success");
    getListaUsuario();
}

function erroDeletar(json) {
    alert("Deu errado!")
}

function editarUsuario() {

    $("#formEditarUsuario").show("slow")
    
}

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

        requisicaoAssincrona("POST", "../Home/EditarUsuario", objEditUsuario, sucessoCamposUsuario, erroCamposUsuario)

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

function recoherCamposEdit() {
    $("#formEditarUsuario").hide("slow");
}