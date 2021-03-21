import { cena1 } from "./cena1.js";

var cena2 = new Phaser.Scene("Cena 2");

cena2.preload = function () {
    this.load.image("fundo", "assets/fundoazul.png");
    this.load.image("botao", "assets/restart.png");
    this.load.image("fim", "assets/fim.png");    
}

cena2.create = function () {
    //fundo
    this.add.image(450, 300, "fundo");
    //nome
    this.add.image(270, 450, "fim");
    //botão
    var button = this.add.image(500, 420, "botao").setInteractive();

    //iniciar cena1
    button.on(
        "pointerdown",
        function () {
            this.scene.start(cena1);
        },
        this
    );
}

cena2.update = function () { };

//exportar cena0
export { cena2 };