/* script responsável por realizar a requisição AJAX ao back end da aplicação */

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
        /* console.log('Login realizado com sucesso!'); */
       return TOKEN;
    }
}

/* função para acessar todos os dados da tribo que foi clicada pelo usuário: */
function pegar_id(target){
    /* garantindo que em todo lugar da caixa que o usuário clique, seja extraido o ID
    da tribo pelo DOM */
    if(target.target.nodeName == "H3" || target.target.nodeName == "P"){ 
        /* pegando o atributo Codigo da tribo pelo DOM e salvando em uma variável*/
        var id = target.target.parentNode.childNodes[1].getAttribute("codigo_tribo");
        
        /* salvar esse id no sessionstorage: */
        sessionStorage.setItem("Codigo_tribo", id);
    }else{
        /* acessando o atributo 'codigo_tribo' do elemento pelo DOM e salvando
        em uma variável; */
        var id = target.target.parentNode.getAttribute("codigo_tribo");
        
        /* salvar esse id no sessionstorage: */
        sessionStorage.setItem("Codigo_tribo", id);
    }
}

function criar_tribos(codigo, nome, pontuacao){
    /* criando as tags dinÂmicamente */
    const tribo = window.document.createElement("div");
    const tag_nome = window.document.createElement("h3");
    const tag_link = window.document.createElement("a");
    const tag_imagem = window.document.createElement("div");
    const tag_pontuacao = window.document.createElement("p");

    /* atribuir as respectivas classes aos elementos DOM criados: */
    tribo.className = "tribos";
    tag_imagem.className = "imagem-tribo";
    tag_pontuacao.className = "pontuacao";
    
    /* criando o atributo que permitirá identificar cada tribo individualmente pelo DOM*/
    tag_link.setAttribute("codigo_tribo", codigo);

    /* atualizando os conteúdos dentro das tags específicas: */
    tag_nome.innerHTML = `${nome}`;

     
    tag_link.href = "../views/admin-tribo.html";
    
    tag_imagem.style.backgroundImage =`url("../imagens-tribos/${nome}.png")`;
    tag_pontuacao.innerHTML = `${pontuacao}`;

    /* estruturando a caixa das tribos pelo DOM */
    conteiner_tribo.appendChild(tribo);
    tribo.appendChild(tag_nome);
    tribo.appendChild(tag_link);
    tag_link.appendChild(tag_imagem);
    tribo.appendChild(tag_pontuacao);
    
    /* adicionando um ouvidor de cliques para cada tribo: */
    tribo.addEventListener("click", pegar_id);

    return tribo
}

/* função para carregar todas as tribos existentes na base de dados via ajax: */
function carregar_tribos(){
    /* definindo a URL onde a requisição AJAX será realizada */
    const url = `http://localhost:8080/tribos`;
    
    /* criando a requisição AJAX */
    fetch(url)
    .then(resultado =>{
        return resultado.json();
    })
    .then(dados =>{
        
        /* armazeanndo o tamanho do array retornado pelo ajax: */
        var tam_array = dados.resultado.length;

        /* percorrendo os dados internos do array retornado pelo ajax: */
        for(let cont=0; cont < tam_array; cont += 1){
            /* salvando os atributos da tribo: */
            var codigo = dados.resultado[cont].codigo_tribo;
            var nome = dados.resultado[cont].nome;
            var pontuacao = dados.resultado[cont].pontuacao;

            /* chamada a função que cria toda a estrutura das tribos */
            criar_tribos(codigo, nome, pontuacao);
        }
    });
}

/* função AJAX para reiniciar o rally */
function reiniciar_rally(senha){

    /* é necessário enviar o TOKEN do 
    administrador, uma vez que essa
    rota é privada: */
    const TOKEN = pegar_token();

    /*definindo a URL onde a requisição AJAX será realizada */
    const url = `http://localhost:8080/tribos/reiniciar`;

    const dados = {
        senha:`${senha}`
    };

    fetch(url, {
        method:"POST",
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

        if(dados.resultado == "Senha inválida!" || dados.resultado == "Token Inválido"){
            
            /* apagando o TOKEN que esse administrador possuia*/
            const token = sessionStorage.removeItem("TOKEN");
            
            /* redirecionando esse usuário para a interface publica */
            window.location.href = '../views/index.html';

        }
        else{
            /* redirecionando o administrador para a interface dos administradores */
            window.location.href = '../views/admin.html';
        }
    });
}

/* função para receber o input da senha do administrador no momento que ele desejar
reiniciar o Rally */
function reiniciar(){

    const senha = String(window.prompt("Digite sua senha de acesso:")).trim();

    if(senha.length <= 0 || senha.length > 10){
        /* senha inválida! */
        window.location.href = '../views.index.html';

        /* apagando o TOKEN que o administrador tinha */
        const token = sessionStorage.removeItem("TOKEN");

    }else{
        /* senha válida! */

        /* chamada a função assíncrona para validar e enviar os dados */
        reiniciar_rally(senha);
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
        /* possui TOKEN */
       carregar_tribos()
    }
}

/* principais variáveis interativas do meu sistema: */
const conteiner_tribo = window.document.querySelector("section#tribos-conteiner");
const botao_reiniciar = window.document.querySelector("header > div#botao-reiniciar");

/* adicionando um ouvidor de cliques no botão de reiniciar, quando tal evento acontecer
uma função callback será imediatamente ativada: */
botao_reiniciar.addEventListener("click", reiniciar);

consumir_dados();
