import { cena0 } from "./cena0.js";

var cena3 = new Phaser.Scene("Cena 3");

var fim;

cena3.preload = function () {
    this.load.spritesheet("encerramento", "assets/encerramento.png", {
        frameWidth: 800,
        frameHeight: 600
    });
}

cena3.create = function () {
    this.anims.create({
        key: "encerramento",
        frameRate: 0.1,
        frames: this.anims.generateFrameNumbers("encerramento", { start: 0, end: 3 }),
        repeat: 0
    });

    fim = this.add.sprite(400, 300, "encerramento");
    fim.play("encerramento");
}

cena3.update = function () { };

export { cena3 };