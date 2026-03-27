const imagens = {
  normal: "Arombadinhos/normalido.webp",
  bravo: "Arombadinhos/tristenho.webp",
  morto: "Arombadinhos/morrido.webp",
  clicado: "Arombadinhos/comendo.webp",
  feliz: "Arombadinhos/comido.webp",
};

let contador = 0;
let horaAtual = 0;
let fome = 0;
let humor = 100;
let morto = false;
let modoNoiteManual = null;

let intervalControle = null;
let intervalFundo = null;
let timeoutClique = null;
let timeoutBack = null;

const img = document.getElementById("mainImage");
const avatarImg = document.getElementById("avatarImg");
const barFome = document.getElementById("barFome");
const barHumor = document.getElementById("barHumor");
const badge = document.getElementById("statusBadge");
const starsDiv = document.getElementById("stars");
const cloudsWrap = document.getElementById("cloudsWrap");
const toggleNoite = document.getElementById("toggleNoite");

window.addEventListener("load", () => {
  gerarEstrelas(80);
  controle();
  atualizarFundo();
  aplicarFundo();
});

function controle() {
  if (intervalControle) clearInterval(intervalControle);

  intervalControle = setInterval(() => {
    if (morto) return;

    contador++;
    fome = Math.min(100, fome + 2);
    humor = Math.max(0, humor - 1);

    atualizarBarras();

    if (contador >= 15) {
      morrer();
    } else if (contador >= 8) {
      img.src = imagens.bravo;
      img.classList.add("hungry");
      atualizarBadge("😤 Com fome!", "badge-warning");
    } else {
      if (img.src.includes("bravo") || img.src.includes("morto")) {
        img.src = imagens.normal;
        img.classList.remove("hungry");
      }
      atualizarBadge("😊 Feliz", "badge-success");
    }
  }, 1000);
}

function alimentar() {
  if (morto) {
    ressuscitar();
    return;
  }

  img.src = imagens.clicado;
  img.classList.remove("hungry");
  contador = 0;
  fome = Math.max(0, fome - 50);
  humor = Math.min(100, humor + 30);
  atualizarBarras();
  atualizarBadge("😋 Comendo...", "badge-info");

  if (timeoutClique) clearTimeout(timeoutClique);
  if (timeoutBack) clearTimeout(timeoutBack);

  timeoutClique = setTimeout(() => {
    img.src = imagens.feliz;
    atualizarBadge("🥰 Satisfeito!", "badge-success");

    timeoutBack = setTimeout(() => {
      img.src = imagens.normal;
      atualizarBadge("😊 Feliz", "badge-success");
    }, 2000);
  }, 1000);
}

function morrer() {
  morto = true;
  img.src = imagens.morto;
  img.classList.remove("hungry");
  fome = 100;
  humor = 0;
  atualizarBarras();
  atualizarBadge("💀 Morreu...", "badge-error");
  avatarImg.src = imagens.morto;
}

function ressuscitar() {
  morto = false;
  contador = 0;
  fome = 30;
  humor = 60;
  img.src = imagens.feliz;
  img.classList.remove("hungry");
  atualizarBarras();
  atualizarBadge("🌟 Ressuscitou!", "badge-success");
  avatarImg.src = imagens.clicado;

  timeoutBack = setTimeout(() => {
    img.src = imagens.normal;
    atualizarBadge("😊 Feliz", "badge-success");
  }, 2000);
}

function atualizarFundo() {
  if (intervalFundo) clearInterval(intervalFundo);

  intervalFundo = setInterval(() => {
    horaAtual = (horaAtual + 1) % 24;
    if (modoNoiteManual === null) aplicarFundo();
  }, 5000);
}

function aplicarFundo() {
  const ehNoite = modoNoiteManual !== null ? modoNoiteManual : horaAtual >= 12;

  document.body.classList.toggle("bg-dia", !ehNoite);
  document.body.classList.toggle("bg-noite", ehNoite);

  starsDiv.classList.toggle("visible", ehNoite);
  cloudsWrap.classList.toggle("hidden-clouds", ehNoite);

  if (modoNoiteManual === null) toggleNoite.checked = ehNoite;
}

function alternarFundoManual() {
  modoNoiteManual = toggleNoite.checked;
  aplicarFundo();
}

function atualizarBarras() {
  barFome.style.width = fome + "%";
  barHumor.style.width = humor + "%";

  barFome.className =
    "bar-inner h-full rounded-full " +
    (fome > 70 ? "bg-red-500" : fome > 40 ? "bg-orange-400" : "bg-green-400");
  barHumor.className =
    "bar-inner h-full rounded-full " +
    (humor < 30 ? "bg-red-500" : humor < 60 ? "bg-yellow-400" : "bg-pink-400");
}

function atualizarBadge(texto, classe) {
  badge.textContent = texto;
  badge.className = `badge badge-lg text-base font-bold shadow px-4 py-3 ${classe}`;
}

function atualizarNome() {
  const nome = document.getElementById("nomeInput").value.trim();
  const display = document.getElementById("nomeDisplay");
  if (nome) {
    display.textContent = nome;
    display.classList.remove("hidden");
  } else {
    display.classList.add("hidden");
  }
}

function resetarJogo() {
  morto = false;
  contador = 0;
  fome = 0;
  humor = 100;
  horaAtual = 0;
  modoNoiteManual = null;
  toggleNoite.checked = false;

  img.src = imagens.normal;
  img.classList.remove("hungry");
  avatarImg.src = imagens.clicado;
  atualizarBarras();
  atualizarBadge("😊 Feliz", "badge-success");

  if (timeoutClique) clearTimeout(timeoutClique);
  if (timeoutBack) clearTimeout(timeoutBack);

  controle();
  atualizarFundo();
  aplicarFundo();
}

function gerarEstrelas(qtd) {
  for (let i = 0; i < qtd; i++) {
    const s = document.createElement("div");
    s.className = "star";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.setProperty("--dur", 1.5 + Math.random() * 3 + "s");
    s.style.setProperty("--delay", Math.random() * 3 + "s");
    const size = Math.random() * 2 + 1.5 + "px";
    s.style.width = size;
    s.style.height = size;
    starsDiv.appendChild(s);
  }
}

function mostrarFerlini() {
  document.getElementById("ferliniModal").showModal();
}
