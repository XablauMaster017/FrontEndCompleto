function revelar() {
    document.querySelector('.card-img-top').setAttribute('src', 'img/_vinicius_junior.png');

    var nomeSpan = document.querySelector('#Nome span.placeholder');
    nomeSpan.textContent = 'Vinícius José Paixão de Oliveira Júnior';
    nomeSpan.classList.remove('placeholder', 'col-6');
    nomeSpan.classList.add('card-text');

    var rank = document.getElementById('Rank');
    rank.textContent = '9,5';

    var dataNas = document.getElementById('Data_Nas');
    dataNas.textContent = '12/07/2000 (25 anos)';
    dataNas.classList.remove('placeholder', 'col-4');
    dataNas.classList.add('card-text');

    var altura = document.getElementById('Alutra');
    altura.textContent = '1,76 m';
    altura.classList.remove('placeholder', 'col-4');
    altura.classList.add('card-text');

    var posicao = document.querySelector('[id="Posição "]');
    posicao.textContent = 'Ponta-esquerda / Atacante';
    posicao.classList.remove('placeholder', 'col-6');
    posicao.classList.add('card-text');

    document.getElementById('Nome').classList.remove('placeholder-glow');
    document.querySelector('p.placeholder-glow').classList.remove('placeholder-glow');
}
