/* ligando as principais variáveis da interface ao
javascript: */
const navegacao = window.document.querySelector("header > nav");
const menu = window.document.querySelector("header > span.material-symbols-outlined");

/* implementando meio de carregamento automático da tag de navegação do site.
a partido do momento que houver mudança no tamanho da tela do meu dispositivo, será 
exibido automaticamente minha tag de navegação e seus links internos: */
window.addEventListener("resize", ()=>{
    if(window.innerWidth >= 768){
        navegacao.style.display = "block";
    };
});

/* adicionando um ouvidor de eventos de 'cliques' no
botão de menu: */
menu.addEventListener("click", ()=>{
    if(navegacao.style.display != "block"){
        navegacao.style.display = "block";
    }else{
        navegacao.style.display = "none";
    }
});
