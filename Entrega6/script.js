const produtos = {
  123: { nome: "Suco", preco: 7.5 },
  456: { nome: "Arroz", preco: 12.5 },
  678: { nome: "Feijão", preco: 11.0 },
  910: { nome: "Pipoca", preco: 18.0 },
};

let carrinho = [];

const audio = new Audio("bip.mp3");

window.onload = () => {
  document.getElementById("cod").focus();
};

function addProduto() {
  const codElemento = document.getElementById("cod");
  const qtdElemento = document.getElementById("qtd");

  const codValue = codElemento.value;
  const qtdValue = qtdElemento.value;

  if (!produtos[codValue]) {
    alert("Produto não cadastrado");
    return;
  }

  const produtoBase = produtos[codValue];

  const item = {
    nome: produtoBase.nome,
    preco: produtoBase.preco,
    quantidade: qtdValue,
    subtot: produtoBase.preco * qtdValue,
  };

  carrinho.push(item);
  audio.currentTime = 0;
  audio.play();
}
