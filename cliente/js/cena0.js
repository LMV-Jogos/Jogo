import { cena01 } from "./cena01.js";

var cena0 = new Phaser.Scene("Cena 0");

var button;
var click;

cena0.preload = function () {
    this.load.image("fundo", "assets/fundoazul.png");
    this.load.image("botão", "assets/botao.png");
    this.load.image("capa", "assets/capa.png");
    this.load.audio("click", "assets/click.mp3");
}

cena0.create = function () {
    //fundo
    this.add.image(400, 300, 'fundo');
    //nome
    this.add.image(400, 300, "capa");
    //botão
    button = this.add.image(550, 420, "botão").setInteractive();

    click = this.sound.add("click");

    //iniciar cena1
    button.on(
        "pointerdown",
        function () {
            this.scene.start(cena01);
            click.play();
        },
        this
    );
}

cena0.update = function () { };

export { cena0 };