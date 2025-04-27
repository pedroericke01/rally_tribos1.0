/* script responsável por fazer a requisição AJAX */

/* função para criar as nação */
function criar_nacao(nome, pontuacao){
    /* criando as tags dinâmicamente: */
    const conteiner = window.document.createElement("div");
    const tag_imagem = window.document.createElement("div");
    const tag_progresso = window.document.createElement("div");
    const tag_pontuacao = window.document.createElement("p");

    /* atribuindo as respectivas classes a cada tag criada: */
    conteiner.className = "nacao";
    tag_imagem.className = "imagem-nacao";
    tag_progresso.className = "progresso";
    tag_pontuacao.className = "pontuacao";

    /* atualizando o conteúdo interno de cada tag criada: */
    tag_imagem.style.backgroundImage = `url("../imagens-nacao/${nome}2.png")`;
    tag_pontuacao.innerHTML = `${pontuacao}`

    /* estruturando a caixa das nações pelo DOM */
    conteiner_nacao.appendChild(conteiner);
    conteiner.appendChild(tag_imagem);
    conteiner.appendChild(tag_progresso);
    tag_progresso.appendChild(tag_pontuacao);

}

/* função para criar as tribos */
function criar_tribos(nome, pontuacao){
    /* criando as tags dinÂmicamente */
    const conteiner = window.document.createElement("div");
    const tag_nome = window.document.createElement("h3");
    const div_progresso = window.document.createElement("div");
    const div_barra = window.document.createElement("div");
    const tag_imagem = window.document.createElement("div");
    const tag_pontuacao = window.document.createElement("p");

    /* atribuir as respectivas classes aos elementos DOM criados: */
    conteiner.className = "tribos";
    div_progresso.className = "progresso";
    div_barra.className = "barra_progresso";
    tag_imagem.className = "imagem-tribo";
    tag_pontuacao.className = "pontuacao";

    /* atualizando os conteúdos dentro das tags específicas: */
    tag_nome.innerHTML = `${nome}`;
    tag_imagem.style.backgroundImage =`url("../imagens-tribos/${nome}.png")`;
    tag_pontuacao.innerHTML = `${pontuacao}`;

    /* estruturando a caixa das tribos pelo DOM */
    conteiner_tribo.appendChild(conteiner);
    conteiner.appendChild(tag_nome);
    conteiner.appendChild(div_progresso);
    div_progresso.appendChild(div_barra);
    div_barra.appendChild(tag_imagem);
    conteiner.appendChild(tag_pontuacao)

}

/* função para carregar todas as nações da minha base de dados via ajax: */
function carregar_nacao(){
    /* definindo a URL onde a requisição AJAX seerá enviada: */
    const url = `http://localhost:8080/nacoes`;
    /* criando a requisição AJAX */
    fetch(url)
    .then(resultado =>{
        return resultado.json();
    })
    .then(dados =>{
        /* criando um loop que percorre toda a extensão do objeto JSON retornado */
        for(let cont = 0; cont < dados.resultado.length; cont += 1){
            /* acessando os atributos 'nome' e 'pontuacao' de cada nação */
            var nome = dados.resultado[cont].nome;
            var pontuacao = dados.resultado[cont].pontuacao[0].sum;
            
            /* chamada a função que cria os elementos pelo DOM */
            criar_nacao(nome, pontuacao);
        }
    });
}

/* função para carregar todas as tribos da minha base de dados via ajax */
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
            /* salvando os atributos nome e pontuação: */
            var codigo = dados.resultado[cont].codigo_tribo;
            var nome = dados.resultado[cont].nome;
            var pontuacao = dados.resultado[cont].pontuacao;
            
            /* chamada a função para criar as tribos: */
            criar_tribos(nome, pontuacao);
        }
    });
}

/* função para recarregar a nação: */
function recarregar_nacao(elemento_pai){
    /* removendo todos os elementos filhos de um elemento pai, através do DOM 
    enquanto houver elementos filhos, vamos remover esses elementos filhos através
    do loop while:*/
    while(elemento_pai.firstChild){
        elemento_pai.removeChild(elemento_pai.firstChild);
    }

    /* chamada a função para carregar os dados das nações via AJAX */
    carregar_nacao()
}

/* função para recarregar a tribo: */
function recarregar_tribo(elemento_pai){    
    /* removendo todos os elementos filhos de um elemento pai, através do DOM 
    enquanto houver elementos filhos, vamos remover esses elementos filhos através
    do loop while:*/
    while(elemento_pai.firstChild){
        elemento_pai.removeChild(elemento_pai.firstChild);
    }

    /* chamada a função para carregar todos os dados das tribos via AJAX */
    carregar_tribos()
}

/* função onde a cada 10 segundos vamos recarregar a página e seus conteúdos internos
automaticament: */
function recarregar_dados(){

    intervalo = setInterval(()=>{
        /* acrescentando 10 novos milesegundos válidos: */
        quant_milesegundos += 10;

        /* 1 segundo equivale a 1000 milesegudos, 8.000 milesegundos equivale a
        8 segundos inteiros: */
        if(quant_milesegundos == 8000){
            /* chamada ao procedimento para recarregar a nação: */
            recarregar_nacao(conteiner_nacao);

            /* chamada ao procedimento para recarregar as tribos: */
            recarregar_tribo(conteiner_tribo);
                        
            /* zerando a quantidade de milesegundos antiga, visando iniciar outra 
            nova: */
            quant_milesegundos = 0;
        }
        
    }, 10);
}

const conteiner_nacao = window.document.querySelector("section#nacao-conteiner");
const conteiner_tribo = window.document.querySelector("section#tribos-conteiner");

/* variaveis com objetivo de controlar o tempo para realizar o reload automático 
da página e seus conteúdos internos: */
var intervalo = 0;
var quant_milesegundos = 0;

carregar_nacao();
carregar_tribos();

/* chamada a função para fazer o reload da página a cada 10 segundos */
recarregar_dados();
