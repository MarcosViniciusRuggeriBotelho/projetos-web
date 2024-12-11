const emojis = [
    "./src/img/angular.png",
    "./src/img/css.png",
    "./src/img/github.png",
    "./src/img/html5.png",
    "./src/img/java.png",
    "./src/img/javascript.png",
    "./src/img/python.png",
    "./src/img/mongodb.png",
    "./src/img/mongodb.png",
    "./src/img/python.png",
    "./src/img/javascript.png",
    "./src/img/java.png",
    "./src/img/html5.png",
    "./src/img/github.png",
    "./src/img/css.png",
    "./src/img/angular.png"
];

let OpenCards = [];

// Embaralha os emojis
let shufleEmojis = emojis.sort(() => (Math.random() > 0.25) ? 2 : -1);

// Cria os elementos do jogo dinamicamente
for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";

    if (shufleEmojis[i].startsWith("./src/img/")) {
        let img = document.createElement("img");
        img.src = shufleEmojis[i];
        img.alt = "imagem";
        img.className = "emoji-img";
        box.appendChild(img);
    } else {
        box.innerHTML = shufleEmojis[i];
    }

    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function playSound(audioNome) {
    let audio = new Audio(`./src/audios/${audioNome}.mp3`);
    audio.volume = 0.2;
    audio.play();
}

function handleClick() {
    if (OpenCards.length < 2) {
        this.classList.add("boxOpen");
        OpenCards.push(this);
    }
    if (OpenCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (OpenCards[0].innerHTML === OpenCards[1].innerHTML) {
        OpenCards[0].classList.add("boxMatch");
        OpenCards[1].classList.add("boxMatch");
        playSound("acerto");
    } else {
        OpenCards[0].classList.remove("boxOpen");
        OpenCards[1].classList.remove("boxOpen");
        playSound("erro");
    }
    OpenCards = [];

    // Verifica se o jogador venceu
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        const divVitoria = document.getElementById("mensagemVitoria");
        divVitoria.classList.add("show"); // Exibe o modal
        const container = document.getElementById("container");
        container.classList.add("oculto"); // Oculta o jogo principal
        playSound("vitoria");
    }
}
