/* função para verificar se algum administrador fez login no sistema, a partir do
sessionStorage, caso fez, vamos fazer chamada a função para carregar todas as 
tribos, caso não fez o login, será redirecionado para a página de login */
    
/* função para verificar se algum administrador fez login no sistema, a partir do
sessionStorage, caso fez, vamos fazer chamada a função para carregar todas as 
tribos, caso não fez o login, será redirecionado para a página de login */
function pegar_token(){

    /* acessando o sessioStorage e verificando se algum administrador fez login
    anteriormente: */
    const TOKEN = sessionStorage.getItem("TOKEN");
    
    if(TOKEN == null){
        /* console.log('Administrador não fez login!'); */
        window.location.href = "../views/index.html";
    }else{
        /* Possui TOKEN */
       return TOKEN;
    }
}

/* função responsável por extrair o codigo da tribo, dentro do sessionstorage */
function pegar_codigo(){
    /* pegando o codigo no localstorage e salvando-o em uma variável */
    var codigo = sessionStorage.getItem("Codigo_tribo");
    
    /* retornando o código da tribo: */
    return codigo
}

/* função AJAX que vai retornar um array da base de dados de minha aplicação contendo
todos os dados de 1 tribo onde o usuário clicou, caso exista: */
function pegar_tribo(){

    /* para ser possível executar essa função assíncrona é nessesário
    informar o TOKEN de acesso: */
    const TOKEN = pegar_token();

    /* chamada a função que pega o código da tribo, acessando o localstorage: */
    let codigo = pegar_codigo();
    
    /* definindo a URL onde a requisição AJAX será realizada */
    const url = `http://localhost:8080/tribos/${codigo}`;

    /* criando requisição AJAX */
    fetch(url, {
        method:"GET",
        headers:{
            "Content-type":"Application/json",
            "x-acess-token":`${TOKEN}`
        }
    })
    .then(resultado =>{
        return resultado.json();
    }).then(dados =>{

        if(dados.resultado == "Token Inválido"){
            /* console.log('Usuário não autorizado!'); */

            /* excluir o TOKEN criado pelo usuário não autorizado */
            const token = sessionStorage.removeItem("TOKEN");

            /* REDIRECIONANDO ESSE USUÁRIO PARA A INTERFACE DOS USUÁRIOS */
            window.location.href = "../views/index.html";
        }else{
            /* administrador autorizado */
            const tribo = dados.resultado[0];
    
            /* chamada a função que cria a tribo dinâmicamente: */
            criar_tribo(tribo.nome, tribo.pontuacao);
        }

    })
}

/* função que cria toda estrutura das tribos pelo DOM dinâmicamente: */
function criar_tribo(nome, pontuacao){

    const imagem_tribo = window.document.createElement("div");
    const conteiner_dados = window.document.createElement("div");
    const nome_tribo = window.document.createElement("input");
    const pontuacao_atual = window.document.createElement("input");
    const nova_pontuacao = window.document.createElement("input");

    const botao_enviar = window.document.createElement("input");
    const botao_limpar = window.document.createElement("input");
    const link_retornar = window.document.createElement("a");
    const botao_cancelar = window.document.createElement("input");
    
    /* adicionando as respectivos identificadores de cada tag: */
    imagem_tribo.id = "imagem";
    conteiner_dados.id = "dados";
    nome_tribo.id = "nome";
    pontuacao_atual.id = "pontuacao";
    
    /* adicionando os placeholders */
    nome_tribo.placeholder = `Nome: ${nome}`;
    pontuacao_atual.placeholder = `Pontuação: ${pontuacao}`;
    
    /* desabilitando as tags que não podemos inserir dados: */
    nome_tribo.disabled = true;
    pontuacao_atual.disabled = true;

    nova_pontuacao.id = "nova_pontuacao";
    nova_pontuacao.placeholder = `Insira a nova pontuação`;

    botao_enviar.type = "submit";
    botao_enviar.value = "Enviar";

    botao_limpar.type = "reset";
    botao_limpar.value = "Limpar";

    botao_cancelar.type = "button";
    botao_cancelar.value = "Cancelar";

    /* atualizando o conteudo do link de retornar: */
    imagem_tribo.style.backgroundImage = `url("../imagens-tribos/${nome}.png")`;

    link_retornar.href = "../views/admin.html";

    /* estruturando a caixa do formulário da tribo: */
    formulario.appendChild(imagem_tribo);
    formulario.appendChild(conteiner_dados);

    conteiner_dados.appendChild(nome_tribo);
    conteiner_dados.appendChild(pontuacao_atual);
    conteiner_dados.appendChild(nova_pontuacao);

    conteiner_dados.appendChild(botao_enviar);
    conteiner_dados.appendChild(botao_limpar);

    conteiner_dados.append(link_retornar);
    link_retornar.appendChild(botao_cancelar);
}

/* função AJAX que vai enviar os dados após a validação, do formulário para o back end: */
function enviar_dados(nova_pontuacao){

    /* para ser possível executar essa função assíncrona é nessesário
    informar o TOKEN de acesso: */
    const TOKEN = pegar_token();

    /* chamada a função para extrair o código do localstorage */
    let codigo = pegar_codigo();

    /* definindo a URL onde a requisição AJAX será realizada */
    const url = `http://localhost:8080/tribos/${codigo}`;

    /* criando o corpo da requisição para atualização contendo a nova pontuacao: */
    const dados = {  
        pontuacao: `${nova_pontuacao}`
    }

    fetch(url, {
        method:"PUT",
        body:JSON.stringify(dados),
        headers:{
            "Content-type":"application/json",
            "x-acess-token":`${TOKEN}`
        }
    })
    .then(resultado =>{
        return resultado.json();
    })
    .then(dados =>{
        /* redirecionar o administrador para sua interface */
        window.location.href = "../views/admin.html";
    });
}

/* função para verificar se o numero inserido pelo usuário é maior que zero: */
function pontuacao_valida(pontuacao){
    if(pontuacao <= 0){
        return false;
    }else{
        return true;
    }
}

/* função para processar os dados do formulário: */
function processar_dados(evento){
    
    evento.preventDefault();

    const txt_pontuacao = window.document.querySelector("div#dados > input#nova_pontuacao");
    const nova_pontuacao = Number(txt_pontuacao.value);

    /* chamada a função para validação da nova pontuação, caso for válida retornará true,
    caso contrário, retornará false */
    var resultado = pontuacao_valida(nova_pontuacao);

    if(resultado != true){
        window.alert("[ERRO!]pontuação inválida!");
    }else{
        /* chamada a função para atualizar a pontuação de 1 tribo específica: */
        enviar_dados(nova_pontuacao);
    }
}

/* função principal que vai iniciar o consumo dos dados de minha API aṕos as 
devidas validações: */
function consumir_dados(){
    /* verificando se o usuário possui TOKEN para acesso a esse controle */
    const TOKEN = pegar_token();

    if(TOKEN == null){
        /* console.log('Administrador não fez login!'); */
        window.location.href = "../views/index.html";
    }else{
        /* console.log('Login realizado com sucesso!'); */
       pegar_tribo()
    }
}

const formulario = window.document.querySelector("main > form");

/* adicionando um ouvidor de submit ao formulário */
formulario.addEventListener("submit", processar_dados);

consumir_dados();
