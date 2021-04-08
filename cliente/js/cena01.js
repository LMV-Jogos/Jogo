import { cena1 } from "./cena1.js";

var cena01 = new Phaser.Scene("Cena 01");

var intro;

cena01.preload = function () {
    this.load.spritesheet("intro", "assets/introdução.png", {
        frameWidth: 800,
        frameHeight: 600
    });
}

cena01.create = function () {
    this.anims.create({
        key: "intro",
        frameRate: 1,
        frames: this.anims.generateFrameNumbers("intro", { start: 0, end: 11 }),
        repeat: -1
    });
    intro = this.add.sprite(400, 300, "intro");
    intro.play("intro");

    this.time.addEvent({
        delay: 3000,
        callback: () => {
            intro.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            intro.destroy();
            this.scene.start(cena1);    

        });
    }
    });

}
   

cena01.update = function () { };

export { cena01 };