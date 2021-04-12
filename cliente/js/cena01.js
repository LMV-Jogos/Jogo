import { cena1 } from "./cena1.js";

var cena01 = new Phaser.Scene("Cena 01");

var intro;
var timedEvent;
var introducao;

cena01.preload = function () {
    this.load.spritesheet("intro", "assets/introdução.png", {
        frameWidth: 800,
        frameHeight: 600

    });
    // carregar ícone tela fullscreen
    this.load.spritesheet('fullscreen', 'assets/fullscreen.png', { frameWidth: 46, frameHeight: 50 });

    // carregar música de fundo
    this.load.audio("introducao", "assets/introducao.mp3");
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
        introducao.stop();

    }, 40000);

    // tocar música fundo 
    introducao = this.sound.add("introducao");
    introducao.loop = true;
    introducao.play();

    // ativar/desativar tela cheia
    var button = this.add.image(800, 0, "fullscreen", 0).setOrigin(1, 0).setInteractive().setScrollFactor(0);
    button.on(
        "pointerup",
        function () {
            if (this.scale.isFullscreen) {
                button.setFrame(0);
                this.scale.stopFullscreen();
            } else {
                button.setFrame(1);
                this.scale.startFullscreen();
            }
        },
        this
    );

    // Tecla "F" também ativa/desativa tela cheia
    var FKey = this.input.keyboard.addKey("F");
    FKey.on(
        "down",
        function () {
            if (this.scale.isFullscreen) {
                button.setFrame(0);
                this.scale.stopFullscreen();
            } else {
                button.setFrame(1);
                this.scale.startFullscreen();
            }

        },
        this
    );

}


cena01.update = function () { };

export { cena01 };