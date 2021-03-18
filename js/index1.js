//importar todas as cenas
import { cena0 } from "./cena0.js";

//configuração do jogo
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
        },
    },
    scene: [cena0],
}

// Criar o objeto principal
const game = new Phaser.Game(config);