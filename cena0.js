import { cena1 } from "./cena1.js";

var cena0 = new Phaser.Scene("Cena 0");

cena0.preload = function () {
    this.load.image("fundo", "assets/fundoazul.png");
    this.load.image("botão", "assets/botao.png");
    this.load.image("nome", "assets/nome.png");
}

cena0.create = function () {
    //fundo
    this.add.image(450, 300, 'fundo');
    //nome
    this.add.image(270, 450, "nome");
    //botão
    var button = this.add.image(500, 420, "botão").setInteractive();

    //iniciar cena1
    button.on(
        "pointerdown",
        function () {
            this.scene.start(cena1);
        },
        this
    );
}

cena0.update = function () { };

//exportar cena0
export { cena0 };