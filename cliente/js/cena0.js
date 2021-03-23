import { cena1 } from "./cena1.js";

var cena0 = new Phaser.Scene("Cena 0");

var button;
var click;

cena0.preload = function () {
    this.load.image("fundo", "assets/fundoazul.png");
    this.load.image("botão", "assets/botao.png");
    this.load.image("nome", "assets/nome.png");
    this.load.audio("click", "assets/click.mp3");
}

cena0.create = function () {
    //fundo
    this.add.image(400, 300, 'fundo');
    //nome
    this.add.image(220, 450, "nome");
    //botão
    button = this.add.image(390, 420, "botão").setInteractive();

    click = this.sound.add("click");

    //iniciar cena1
    button.on(
        "pointerdown",
        function () {
            this.scene.start(cena1);
            click.play();
        },
        this
    );
}

cena0.update = function () { };

export { cena0 };