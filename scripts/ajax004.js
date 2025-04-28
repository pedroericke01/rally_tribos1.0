/* função que captura o elemento específico clicado pelo usuário */
function pegar_elemento(target){
}

/* ligando as principais variáveis da interface ao javascript */
const tabela = window.document.querySelector("main > div.dados > table");

tabela.addEventListener("click", pegar_elemento);
