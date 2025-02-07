/* função que verifica se o nome que foi extraido no localstorage existe na
base de dados genêrica */
function nome_valido(nome){
    var indice = array_tribos.indexOf(nome)

    if(indice != -1){
        var pontuacao = 100;
        criar_tribo(nome, pontuacao);
    }else{
        window.alert("[ERRO!] NOME NÃO ENCONTRADO!");
    }
}

/* função que acessa o localstorage e extrai o nome da tribo que o usuário clicou: */
function pegar_nome(){
    var nome = localStorage.getItem("nome-tribo");
    
    /* chamada a função que verifica se o nome extraido no localstorage é valido: */
    nome_valido(nome);
}

/* estrutura das tribos:
<div id="imagem"></div>
<div id="dados">
    <input type="text" name="nome" id="nome" placeholder="Nome:" disabled>
    <input type="number" name="pontuacao" id="pontuacao" placeholder="Pontuação:" disabled>
    <input type="number" name="nova_pontuacao" id="nova_pontuacao" min="1" placeholder="Insira a nova pontuação" required>
    <input type="submit" value="Atualizar" id="enviar">
    <input type="reset" value="Limpar" id="limpar">
    <a href="admin.html">
        <input type="button" value="Cancelar" id="cancelar">
    </a>
</div>

*/
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
    link_retornar.href = "../views/admin.html";
    imagem_tribo.style.backgroundImage =`url("../imagens-tribos/${nome}.png")`;

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

/* função que verifica a nova pontuação que o usuário inserir no input, sabendo que 
a mesma não pode ser negativa nem igual a zero: */
function pontuacao_valida(pontuacao){
    if(pontuacao <=0){
        return false;
    }else{
        return true;
    }
}

/* função que no momento que o usuário clicar em 'atualizar' será ativada: */
function enviar_dados(evento){
    evento.preventDefault();

    /* acessando o input nova pontuação: */
    const txt_nova_pontuacao = window.document.querySelector("div#dados > input#nova_pontuacao");
    
    /* convertendo o dado da nova pontuação para o formato numérico: */
    const nova_pontuacao = Number(txt_nova_pontuacao.value);

    /* chamada a função para validar esse dado: */
    var resultado_validação = pontuacao_valida(nova_pontuacao);
    if(resultado_validação != true){
        window.alert("[ERROR!] pontuação inválida!");
    }else{
        window.alert("Enviando os dados...");   
    }
    /* limpando o input para inserir novas pontuações: */
    txt_nova_pontuacao.value = "";
}

const formulario = window.document.querySelector("main > form");

/* adicionando um ouvidor de evento de submit ao formulário */
formulario.addEventListener("submit", enviar_dados);

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
];

pegar_nome()
