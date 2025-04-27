/* script responsável por fazer a requisição AJAX */

/* estrutura das nação:
<div class="nacao">

    <img src="../imagens-nacao/nacao-imbativel/imbativel2.png" alt="logo-imbatível">

    <div class="progresso">
        <p class="pontuacao">123456</p>
    </div>

</div>
*/
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

/*
<div class="tribos">
    <h3>Tribo A</h3>
    <div class="progresso">
        <div class="barra_progresso">
            <div class="imagem-tribo"></div>
        </div>
    </div>
    <p class="pontuacao">123456</p>
</div>
*/
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

/* função para carregar todas as nações da minha base de dados genêrica: */
function carregar_nacao(){
    /* loop que vai percorrer toda a extensão da estrutura e criar dinâmicamente a estrutura
    da nação: */
    for(let cont=0; cont < array_nacao.length; cont += 1){
        /* salvando o nome de cada nação presente na base de dados genêrica: */
        var nome = array_nacao[cont];
        var pontuacao = 300;
    
        /* fazendo chamada a função que constroi toda a estrutura da caixa da minha nacao
        pelo DOM */
        criar_nacao(nome, pontuacao);
    }
}

/* função para carregar todas as tribos existentes na base de dados genêrica: */
function carregar_tribos(){
    /* loop que vai percorrer toda a extensão da estrutura e criar dinâmicamente
    a estrutura das tribos: */
    for(let cont=0; cont < array_tribos.length; cont += 1){
        /* salvando o nome de cada tribo presente na base de dados genêrica: */
        var nome = array_tribos[cont];
        var pontuacao = 100;

        /* fazendo chamada a função que constroi toda a estrutura da caixa
        da minha tribo pelo DOM */
        criar_tribos(nome, pontuacao);
    }
}

const conteiner_nacao = window.document.querySelector("section#nacao-conteiner");
const conteiner_tribo = window.document.querySelector("section#tribos-conteiner");

const array_nacao = [
    "imbativel",
    "impacto",
    "infalivel",
    "invencivel"
]

const array_tribos = [
    'asser',
    'benjamin',
    'efraim',
    'gade',
    'issacar',
    'juda',
    'levi',
    "manasses",
    'naftali',
    'ruben',
    'simeao',
    'zebulom'
]

/* fazendo chamada as funções de carregamento das nações e tribos respectivamente: */
carregar_nacao();
carregar_tribos();
