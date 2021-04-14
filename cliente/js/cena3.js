import { cena0 } from "./cena0.js";

var cena3 = new Phaser.Scene("Cena 3");

cena3.preload = function () {
    this.load.image("fundo", "assets/fundoazul.png");
}

cena3.create = function () {
    this.add.image(400, 300, 'fundo');

    this.add.text(100, 122, "Você finalizou o jogo!", {
        font: "52px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff"
    })

}

cena3.update = function () { };

export { cena3 };