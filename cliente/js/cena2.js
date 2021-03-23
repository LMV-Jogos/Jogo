import { cena1 } from "./cena1.js";

var cena2 = new Phaser.Scene("Cena 2");

var button;
var click;

cena2.preload = function () {
    this.load.image("fundo", "assets/fundoazul.png");
    this.load.image("botao", "assets/restart.png");
    this.load.image("fim", "assets/fim.png");
    this.load.audio("click", "assets/click.mp3");
}

cena2.create = function () {
    //fundo
    this.add.image(400, 300, "fundo");
    //nome
    this.add.image(400, 200, "fim");
    //botão
    button = this.add.image(390, 420, "botao").setInteractive();

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

cena2.update = function () { };

//exportar cena0
export { cena2 };