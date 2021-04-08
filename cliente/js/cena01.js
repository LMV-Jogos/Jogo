import { cena1 } from "./cena1.js";

var cena01 = new Phaser.Scene("Cena 01");

var intro;
var timedEvent;

cena01.preload = function () {
    this.load.spritesheet("intro", "assets/introdução.png", {
        frameWidth: 800,
        frameHeight: 600
    });
}

cena01.create = function () {
    this.anims.create({
        key: "intro",
        frameRate: 0.3,
        frames: this.anims.generateFrameNumbers("intro", { start: 0, end: 11 }),
        repeat: 0
    });
    intro = this.add.sprite(400, 300, "intro");
    intro.play("intro");

    setTimeout(() => {
        this.scene.start(cena1);
    }, 40000);

}
   

cena01.update = function () { };

export { cena01 };