/* script responsável por realizar a requisição AJAX ao back end da aplicação */

function pegar_tribo(target){
    console.log(target.target.parentNode);
    
    var nome = target.target.parentNode.getAttribute('nome-tribo');
    
    console.log(nome);
}

/* estrutura das tribos:
<div class="tribos">
    <h3>Tribo A</h3>
    <a href="admin2.html">
        <img src="../imagens-tribos/asser.png" alt="logo-asser">
    </a>
    <p class="pontuacao">123456</p>

</div>
*/
function criar_tribos(nome, pontuacao){
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
    tribo.setAttribute("nome-tribo", nome);
    
    tag_link.setAttribute("nome-tribo", nome);
    
    /* atualizando os conteúdos dentro das tags específicas: */
    
    tag_nome.innerHTML = `${nome}`;
    tag_link.href = "../views/admin2.html";
    tag_imagem.style.backgroundImage =`url("../imagens-tribos/${nome}.png")`;
    tag_pontuacao.innerHTML = `${pontuacao}`;

    /* estruturando a caixa das tribos pelo DOM */
    conteiner_tribo.appendChild(tribo);
    tribo.appendChild(tag_nome);
    tribo.appendChild(tag_link);
    tag_link.appendChild(tag_imagem);
    tribo.appendChild(tag_pontuacao);
    
    tribo.addEventListener("click", pegar_tribo);

    return tribo
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

/* função para resetar o rally */
function reiniciar_rally(){
    window.alert("Reiniciando o rally...");
}

/* principais variáveis interativas do meu sistema: */
const conteiner_tribo = window.document.querySelector("section#tribos-conteiner");
const botao_resetar = window.document.querySelector("header > div#botao-reiniciar > input");

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

/* adicionando um ouvidor de eventos de clique ao botão de resetar o rally, quando tal
evento ocorrer vamos ativar uma função callback que vai realizar tal operação na base
de dados futura: */
botao_resetar.addEventListener("click", reiniciar_rally);


/* chamada a função para carregamento de todas as tribos: */
carregar_tribos();
