import { cena2 } from "./cena2.js";

var cena1 = new Phaser.Scene("Cena 1");

var agatha;
var cursors;
var beatriz;
var left;
var right;
var up;
var down;
var trilha;
//var timedEvent;
//var timer = 300;
//var timerText;
var sup;
var lives = 10;
var lives1 = 10;
var livesText;
var livesText1;
var virus;
var cofre;

cena1.preload = function () {
    // tilesets
    this.load.image("tileset", "assets/tileset_final.png");
    //mapa
    this.load.tilemapTiledJSON("map", "assets/jogo.json");
    // personagens
    this.load.spritesheet("agatha", "assets/agatha.png", {
        frameWidth: 40,
        frameHeight: 60
    });
    this.load.spritesheet("beatriz", "assets/beatriz.png", {
        frameWidth: 40,
        frameHeight: 60
    });
    // carregar trilha sonora
    this.load.audio("trilha", "assets/trilha.mp3");
    // carregar supressor
    this.load.image("sup", "assets/seringa.png");
    //carregar virus
    this.load.image("virus", "assets/virus.png");
    // carregar ícone tela fullscreen
    this.load.spritesheet('fullscreen', 'assets/fullscreen.png', { frameWidth: 46, frameHeight: 50 });

    this.load.spritesheet('hitA', 'assets/agathahit.png', { frameWidth: 40, frameHeight: 60 });

    this.load.image("cofre", "assets/cofre.png");

}

cena1.create = function () {

    // trilha sonora
    trilha = this.sound.add("trilha");
    trilha.loop = true;
    trilha.play();

    // tilemap
    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("tileset_final", "tileset");

    // camadas
    const belowLayer = map.createStaticLayer("belowLayer", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("worldLayer", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("aboveLayer", tileset, 0, 0);
    agatha = this.physics.add.sprite(350, 1800, "agatha");
    beatriz = this.physics.add.sprite(320, 1800, "beatriz");
    const sobreMesa = map.createStaticLayer("sobreMesa", tileset, 0, 0);

    // colisao com bordas
    agatha.setCollideWorldBounds(true);
    beatriz.setCollideWorldBounds(true);

    // colisao com cenario
    worldLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(agatha, worldLayer);
    this.physics.add.collider(beatriz, worldLayer);

    this.cameras.main.setBounds(0, 0, 2720, 2240);
    this.physics.world.setBounds(0, 0, 2720, 2240);

    this.cameras.main.startFollow(agatha);

    // frames para movimentaçao agatha
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("agatha", {
            start: 4,
            end: 7
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("agatha", {
            start: 8,
            end: 11
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "stopped",
        frames: this.anims.generateFrameNumbers("agatha", {
            start: 0,
            end: 0
        }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: "up",
        frames: this.anims.generateFrameNumbers("agatha", {
            start: 12,
            end: 15
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("agatha", {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    /* this.anims.create({
        key: "hit",
        frames: this.anims.generateFrameNumbers("hitA", {
            start: 0,
            end: 3
        }),

    })
    */

    // frames para movimentaçao beatriz
    this.anims.create({
        key: "left1",
        frames: this.anims.generateFrameNumbers("beatriz", {
            start: 4,
            end: 7
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "right1",
        frames: this.anims.generateFrameNumbers("beatriz", {
            start: 8,
            end: 11
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "stopped1",
        frames: this.anims.generateFrameNumbers("beatriz", {
            start: 0,
            end: 0
        }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: "up1",
        frames: this.anims.generateFrameNumbers("beatriz", {
            start: 12,
            end: 15
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "down1",
        frames: this.anims.generateFrameNumbers("beatriz", {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
    up = this.input.keyboard.addKey("W");
    left = this.input.keyboard.addKey("A");
    right = this.input.keyboard.addKey("D");
    down = this.input.keyboard.addKey("S");

    sup = this.physics.add.group();

    sup.create(200, 1750, "sup");
    sup.create(384, 1024, "sup"); // 12, 32
    sup.create(1024, 1870, "sup"); // 32, 58
    sup.create(1312, 1504, "sup"); // 41, 47
    sup.create(2560, 1800, "sup"); // 80, 56
    sup.create(2240, 1556, "sup"); // 70, 48
    sup.create(1216, 900, "sup"); // 38, 28

    this.physics.add.overlap(agatha, sup, collectSup, null, this);
    this.physics.add.overlap(beatriz, sup, collectSup1, null, this);

    virus = this.physics.add.staticGroup();

    virus.create(416, 1344, "virus");// 
    virus.create(80, 1312, "virus"); //
    virus.create(512, 160, "virus"); //
    virus.create(80, 160, "virus");  // 
    virus.create(256, 300, "virus"); // 8, 9
    virus.create(1184, 1792, "virus"); // 37, 56
    virus.create(1088, 1568, "virus"); // 34, 49
    virus.create(1120, 1450, "virus"); // 35, 45
    virus.create(2592, 1696, "virus"); // 81, 53
    virus.create(2208, 1600, "virus"); // 69, 50
    virus.create(2112, 1824, "virus"); // 66, 57
    virus.create(1216, 1000, "virus"); // 38, 31
    virus.create(1120, 800, "virus"); // 35, 25
    virus.create(1216, 550, "virus"); // 37, 17

    this.physics.add.collider(agatha, virus, hitVirus, null, this);
    this.physics.add.collider(beatriz, virus, hitVirus1, null, this);

    cofre = this.physics.add.staticGroup();

    cofre.create(2500, 300, "cofre");


    livesText = this.add.text(10, 10, "Vidas Agatha: 10", {
        font: "25px monospace",
        fill: "#000",
        padding: { x: 10, y: 10 },
        backgroundColor: "#8C3A1C"
    });
    livesText.setScrollFactor(0);

    livesText1 = this.add.text(400, 10, "Vidas Beatriz: 10", {
        font: "25px monospace",
        fill: "#000",
        padding: { x: 10, y: 10 },
        backgroundColor: "#8C3A1C"
    });
    livesText1.setScrollFactor(0);

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

    /* Contagem regressiva em segundos (1.000 milissegundos)
     timedEvent = this.time.addEvent({
        delay: 1000,
        callback: countdown,
        callbackScope: this,
        loop: true,
    });

    // Mostra na tela o contador
        timerText = this.add.text(32, 32, "300", {
        fontSize: "32px",
        fill: "#000",
    });
    timerText.setScrollFactor(0);
}*/

    cena1.update = function (time, delta) {

        // Controle de movimentação de Agatha
        if (cursors.left.isDown) {
            agatha.body.setVelocityX(-200);
        } else if (cursors.right.isDown) {
            agatha.body.setVelocityX(200);
        } else {
            agatha.body.setVelocity(0);
        }
        if (cursors.up.isDown) {
            agatha.body.setVelocityY(-200);
        } else if (cursors.down.isDown) {
            agatha.body.setVelocityY(200);
        } else {
            agatha.body.setVelocityY(0);
        }

        // Animação de Agatha
        if (cursors.left.isDown) {
            agatha.anims.play("left", true);
        } else if (cursors.right.isDown) {
            agatha.anims.play("right", true);
        } else if (cursors.up.isDown) {
            agatha.anims.play("up", true);
        } else if (cursors.down.isDown) {
            agatha.anims.play("down", true);
        } else {
            agatha.anims.play("stopped", true);
        }

        // Controle de movimentação de Beatriz
        if (left.isDown) {
            beatriz.body.setVelocityX(-150);
        } else if (right.isDown) {
            beatriz.body.setVelocityX(150);
        } else {
            beatriz.body.setVelocity(0);
        }
        if (up.isDown) {
            beatriz.body.setVelocityY(-150);
        } else if (down.isDown) {
            beatriz.body.setVelocityY(150);
        } else {
            beatriz.body.setVelocityY(0);
        }

        // Animação de Beatriz
        if (left.isDown) {
            beatriz.anims.play("left1", true);
        } else if (right.isDown) {
            beatriz.anims.play("right1", true);
        } else if (up.isDown) {
            beatriz.anims.play("up1", true);
        } else if (down.isDown) {
            beatriz.anims.play("down1", true);
        } else {
            beatriz.anims.play("stopped1", true);
        }

        // vida agatha, caso chegue a 0 o jogo acaba e a tela de encerramento inicia
        if (lives <= 0) {
            this.scene.start(cena2);
            lives = 2
            trilha.stop();
        }

        // vida beatriz, caso chegue a 0 o jogo acaba e a tela de encerramento inicia
        if (lives1 <= 0) {
            this.scene.start(cena2);
            lives = 2
            trilha.stop();
        }
    }

    // coletar supressores
    function collectSup(agatha, sup) {
        // com colisão o sprite sup desaparece
        sup.disableBody(true, true);
        // adiciona uma vida
        lives += 1;
        livesText.setText('Vidas Agatha: ' + lives);
    }

    function collectSup1(beatriz, sup) {
        sup.disableBody(true, true);

        lives1 += 1;
        livesText1.setText('Vidas Beatriz: ' + lives1);
    }

    // colidir com obstáculo
    function hitVirus(agatha, virus) {

        //agatha.setTint(0xffffff); 

        // reação à colisão
        if (agatha.anims.getCurrentKey() === "up") {
            agatha.body.y += 35;
        }
        if (agatha.anims.getCurrentKey() === "left") {
            agatha.body.x += 35;
        }
        if (agatha.anims.getCurrentKey() === "right") {
            agatha.body.x -= 35;
        }
        if (agatha.anims.getCurrentKey() === "down") {
            agatha.body.y -= 35;
        }

        lives -= 1;
        livesText.setText("Vidas Agatha: " + lives);

        //agatha.setTint(0xffffff);   
    }

    function hitVirus1(beatriz, virus) {

        //beatriz.setTint(0xffffff); 

        // reação à colisão
        if (beatriz.anims.getCurrentKey() === "up1") {
            beatriz.body.y += 35;
        }
        if (beatriz.anims.getCurrentKey() === "left1") {
            beatriz.body.x += 35;
        }
        if (beatriz.anims.getCurrentKey() === "right1") {
            beatriz.body.x -= 35;
        }
        if (beatriz.anims.getCurrentKey() === "down1") {
            beatriz.body.y -= 35;
        }

        lives1 -= 1;
        livesText1.setText("Vidas Beatriz: " + lives1);

        //beatriz.setTint(0xffffff);   
    }
}

//function countdown() {
// Reduz o contador em 1 segundo
//    timer -= 1;
//  timerText.setText(timer);

// Se o contador chegar a zero, inicia a cena 2
//    if (timer === 0) {
//        trilha.stop();
//        this.scene.start(cena2);
//        timer = 300;

//    }
//}

//exportar a cena
export { cena1 };