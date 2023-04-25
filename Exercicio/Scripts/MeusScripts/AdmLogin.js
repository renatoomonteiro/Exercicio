///Registro ///
function cadastrarUsuario() {

    var nomeUsuarioCadLogin = $("#txtUsuarioCadLogin").val();
    var senhaCadLogin = $("#txtSenhaCadLogin").val();
    var senhaRepCadLogin = $("#txtRepetirSenhaCadLogin").val();
    var emailCadLogin = $("#txtEmailCadLogin").val();

    var prosseguir = validarCamposCad(nomeUsuarioCadLogin, senhaCadLogin, senhaRepCadLogin, emailCadLogin);



    if (prosseguir) {

        var objUsuario = {
            nome: nomeUsuarioCadLogin,
            senha: senhaCadLogin,
            email: emailCadLogin,
            flag:"1"
        }

        requisicaoAssincrona("POST", "../Home/CadastrarUsuario", objUsuario, sucessoCadastro, erroCadastro)

    } 

}


function sucessoCadastro(json) {
    var objRet = json;

    if (objRet.ret == "ok") {
        //Tratar o erro
        limparCampos();

        window.location.assign("/")
    } else {
        //alert(objRet.ret);
        //limparCampos();

        //window.location.assign("/")
    }
}

function erroCadastro(json) {
    alert("Tudo deu errado!")
}

function validarCamposCad(nome, senha, repSenha, email) {
    var continuar = false;

    if (nome != "") {
        continuar = true;
    } else {
        continuar = false;
        alert("Preencha seu nome!");
    }

    if (senha!= "") {
        continuar = true;
    } else {
        continuar = false;
        alert("Preencha sua senha!");
    }

    if (repSenha!= "") {
        continuar = true;
    } else {
        continuar = false;
        alert("Você não repetiu a senha!");
    }

    if (email!= "") {
        continuar = true;
    } else {
        continuar = false;
        alert("Preencha seu e-mail!");
    }

    return continuar;
}


function limparCampos() {
    //Capturar o valor = .val("");
    $("#txtUsuarioCadLogin").val("");
    $("#txtSenhaCadLogin").val("");
    $("#txtRepetirSenhaCadLogin").val("");
    $("#txtEmailCadLogin").val("");
}

function alternarTabs() {
    //Quando precisar pegar elementos pelo ID, utiliza-se a #
    $("#tabRegistrar").removeClass("active");
    $("#tabEntrar").addClass("active");
}


///Fim do Registro ///


///Login ///
function validarCampos() {

    var nomeUsuarioLogin = $("#txtUsuarioLogin").val();
    var senhaLogin = $("#txtSenhaLogin").val();
    

    var logar = validarCamposLogin(nomeUsuarioLogin, senhaLogin);

    if (logar) {

        var objLogin = {
            senha: senhaLogin,
            email: nomeUsuarioLogin
        }


        requisicaoAssincrona("POST", "../Home/Login", objLogin, sucessoLogin, erroLogin)


    }
       
}
function sucessoLogin(json) {
    var objUser = json.user;

    if (objUser.nome!="") {
        window.location.assign("../Principal/Principal");
    }

}

function erroLogin(json) {


}


function validarCamposLogin(nomeLogin, senhaLogin) {
    var continuar = false;

    if (nomeLogin != "") {
        continuar = true;
    } else {
        continuar = false;
        alert("Preencha o seu nome!");
    }

    if (senhaLogin != "") {
        continuar = true;
    } else {
        continuar = false;
        alert("Preencha a sua senha!");
    }

    return continuar;
}
///Fim do Login ///
