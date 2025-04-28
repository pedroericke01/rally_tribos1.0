/* script responsável por validar os dados de login dos ADMINISTRADORES do sistema: */

/* função para enviar dados via AJAX para verificar se existe algum administrador
com esse cadastro de login: */
function enviar_dados(email, senha){
    
    /* definindo a url onde a requisição AJAX será enviada */
    const url = 'http://localhost:8080/login';

    /* criando os dados no formato objeto JSON que serão enviados: */
    const dados = {
        email:`${email}`,
        senha:`${senha}`
    };

    /* criando requisição com FETCH */
    fetch(url, {
        method:"POST",
        body: JSON.stringify(dados),
        headers:{
            "Content-type":"application/json"
        }
    })
    .then(resultado =>{
        return resultado.json();
    })
    .then(dados =>{

        if(dados.resultado == "Acesso Liberado!"){
            /* salvando o TOKEN de acesso no SessionStorage do navegador do usuário */
            sessionStorage.setItem('TOKEN', dados.TOKEN);

            /* redirecionando o administrador para a interface dos administradores */
            window.location.href = '../views/admin.html';
        }else{
            /* informando a mensagem de erro */
            window.alert(dados.resultado);
            
            /* redirecionando o usuário para a interface publica */
            window.location.href = '../views/index.html';
        }
    });
}

/* função AJAX que processa os dados informados pelo administrador que solicita o 
login, no momento que ele clica em 'entrar' */
function processar_dados(evento){

    evento.preventDefault();
    
    /* extraindo os dados de email e senha, excluindo espaços vazios na partes da
    frente e trás dessas strings, transformando esses dados para minusculos */
    var email = String(txt_email.value).trim();
    var senha = String(txt_senha.value).trim();
    
    /* chamada a função AJAX */
    enviar_dados(email, senha);

    /* limpando os campos do input onde foi inserido os dados de email e senha, após
    os mesmos serem enviados para a requisição AJAX */
    txt_email.value = "";
    txt_senha.value = "";
}

/* ligando as principais campos interativos ao javascript */
var txt_email = window.document.querySelector("input#email");
var txt_senha = window.document.querySelector("input#senha");
var formulario = window.document.querySelector("main > form");

formulario.addEventListener("submit", processar_dados);
