import { cena2 } from "./cena2.js";

var cena1 = new Phaser.Scene("Cena 1");

var agatha;
var cursors;
var beatriz;
/*var left;
var right;
var up;
var down;*/
var trilha;
var sup;
var lives = 10;
var lives1 = 10;
var livesText;
var livesText1;
var virus;
var cofre;
var ganho;
var perda;
var jogador;

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
    // efeito sonoro ganho de vida
    this.load.audio("ganho", "assets/ganho.mp3");
    // efeito sonoro perda de vida
    this.load.audio("perda", "assets/perda.mp3");
    // carregar ícone tela fullscreen
    this.load.spritesheet('fullscreen', 'assets/fullscreen.png', { frameWidth: 46, frameHeight: 50 });

    this.load.spritesheet('hitA', 'assets/agathahit.png', { frameWidth: 40, frameHeight: 60 });

    this.load.image("cofre", "assets/cofre.png");

}

cena1.create = function () {

    // Trilha Sonora
    trilha = this.sound.add("trilha");
    trilha.loop = true;
    trilha.play();

    // Tilemap
    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("tileset_final", "tileset");

    // Camadas
    const belowLayer = map.createStaticLayer("belowLayer", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("worldLayer", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("aboveLayer", tileset, 0, 0);
    agatha = this.physics.add.sprite(350, 1800, "agatha");
    beatriz = this.physics.add.sprite(320, 1800, "beatriz");
    const sobreMesa = map.createStaticLayer("sobreMesa", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });

    // Colisao com Bordas
    //agatha.setCollideWorldBounds(true);
    //beatriz.setCollideWorldBounds(true);

    // Colisao com Cenario
    //this.physics.add.collider(agatha, worldLayer);
    //this.physics.add.collider(beatriz, worldLayer);

    // Limites de Câmera
    this.cameras.main.setBounds(0, 0, 2720, 2240);
    this.physics.world.setBounds(0, 0, 2720, 2240);

    //this.cameras.main.startFollow(agatha);

    // Frames para movimentaçao agatha
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

    // Frames para movimentaçao beatriz
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
    /*up = this.input.keyboard.addKey("W");
    left = this.input.keyboard.addKey("A");
    right = this.input.keyboard.addKey("D");
    down = this.input.keyboard.addKey("S");
    */
    sup = this.physics.add.group();

    sup.create(200, 1750, "sup");
    sup.create(384, 1024, "sup"); // 12, 32
    sup.create(1024, 1870, "sup"); // 32, 58
    sup.create(1312, 1504, "sup"); // 41, 47
    sup.create(2560, 1800, "sup"); // 80, 56
    sup.create(2240, 1556, "sup"); // 70, 48
    sup.create(1216, 900, "sup"); // 38, 28
    sup.create(720, 100, "sup"); // 22, 3
    sup.create(1641, 70, "sup"); // 51, 2
    sup.create(1480, 105, "sup"); // 46, 3
    sup.create(1990, 1024, "sup"); // 62, 32
    sup.create(1930, 966, "sup"); // 60, 30
    sup.create(2016, 1184, "sup"); // 63, 37
    sup.create(2432, 1056, "sup"); // 76, 33

    //this.physics.add.overlap(agatha, sup, collectSup, null, this);
    //this.physics.add.overlap(beatriz, sup, collectSup1, null, this);

    ganho = this.sound.add("ganho");

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
    virus.create(640, 576, "virus"); // 20, 18
    virus.create(955, 135, "virus"); // 30, 4
    virus.create(890, 340, "virus"); // 27, 11
    virus.create(1700, 105, "virus"); // 53, 3
    virus.create(1824, 530, "virus"); // 57, 17
    virus.create(1926, 774, "virus"); // 60, 24
    virus.create(1592, 758, "virus"); // 50, 23
    virus.create(2000, 870, "virus"); // 62, 27
    virus.create(2432, 680, "virus"); // 76, 21
    virus.create(2368, 710, "virus"); // 74, 22
    virus.create(2624, 840, "virus"); // 82, 26
    virus.create(2240, 646, "virus"); // 70, 20
    virus.create(1590, 1927, "virus"); // 49, 60
    virus.create(1626, 1820, "virus"); // 51, 57
    virus.create(1760, 1718, "virus"); // 55, 53

    //this.physics.add.collider(agatha, virus, hitVirus, null, this);
    //this.physics.add.collider(beatriz, virus, hitVirus1, null, this);

    perda = this.sound.add("perda");

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

    // Conectar no servidor via WebSocket
    this.socket = io();

    // Disparar evento quando jogador entrar na partida
    var self = this;
    var physics = this.physics;
    var cameras = this.cameras;
    var socket = this.socket;

    this.socket.on("jogadores", function (jogadores) {
        if (jogadores.primeiro !== undefined && jogadores.segundo !== undefined) {
            if (jogadores.primeiro === self.socket.id) {
                // Define jogador como o primeiro
                jogador = 1;

                // Personagens colidem com os limites da cena
                agatha.setCollideWorldBounds(true);

                // Detecção de colisão: cenário
                physics.add.collider(agatha, worldLayer);

                // Detecção de colisão e disparo de evento: sup
                physics.add.overlap(agatha, sup, collectSup, null, this);

                // Detecção de colisão e disparo de evento: vírus
                physics.add.collider(agatha, virus, hitVirus, null, this);

                // Câmera seguindo o personagem 1
                cameras.main.startFollow(agatha);

            } else if (jogadores.segundo === self.socket.id) {
                // Define jogador como o segundo
                jogador = 2;

                // Personagens colidem com os limites da cena
                beatriz.setCollideWorldBounds(true);

                // Detecção de colisão: cenário
                physics.add.collider(beatriz, worldLayer);

                // Detecção de colisão e disparo de evento: sup
                physics.add.overlap(beatriz, sup, collectSup1, null, this);

                // Detecção de colisão e disparo de evento: vírus
                physics.add.collider(beatriz, virus, hitVirus1, null, this);

                // Câmera seguindo o personagem 2
                cameras.main.startFollow(beatriz);
            }
        }
    });

    // Desenhar o outro jogador
    this.socket.on("desenharOutroJogador", ({ frame, x, y }) => {
        if (jogador === 1) {
            beatriz.setFrame(frame);
            beatriz.x = x + 20;
            beatriz.y = y + 25;
        } else if (jogador === 2) {
            agatha.setFrame(frame);
            agatha.x = x + 20;
            agatha.y = y + 25;
        }
    });

}

cena1.update = function (time, delta) {

    if (jogador === 1) {
        // Controle agatha
        if (cursors.left.isDown) {
            agatha.body.setVelocityX(-200);
        } else if (cursors.right.isDown) {
            agatha.body.setVelocityX(200);
        } else {
            agatha.body.setVelocityX(0);
        }
        if (cursors.up.isDown) {
            agatha.body.setVelocityY(-200);
        } else if (cursors.down.isDown) {
            agatha.body.setVelocityY(200);
        } else {
            agatha.body.setVelocityY(0);
        }
        // Animação agatha
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
        this.socket.emit("estadoDoJogador", {
            frame: agatha.anims.currentFrame.index,
            x: agatha.body.x,
            y: agatha.body.y,
        });
    } else if (jogador === 2) {
        // Controle beatriz
        if (cursors.left.isDown) {
            beatriz.body.setVelocityX(-150);
        } else if (cursors.right.isDown) {
            beatriz.body.setVelocityX(150);
        } else {
            beatriz.body.setVelocityX(0);
        }
        if (cursors.up.isDown) {
            beatriz.body.setVelocityY(-150);
        } else if (cursors.down.isDown) {
            beatriz.body.setVelocityY(150);
        } else {
            beatriz.body.setVelocityY(0);
        }
        // Animação de Beatriz
        if (cursors.left.isDown) {
            beatriz.anims.play("left1", true);
        } else if (cursors.right.isDown) {
            beatriz.anims.play("right1", true);
        } else if (cursors.up.isDown) {
            beatriz.anims.play("up1", true);
        } else if (cursors.down.isDown) {
            beatriz.anims.play("down1", true);
        } else {
            beatriz.anims.play("stopped1", true);
        }
        this.socket.emit("estadoDoJogador", {
            frame: beatriz.anims.currentFrame.index,
            x: beatriz.body.x,
            y: beatriz.body.y,
        });
    }

    // Vida agatha, caso chegue a 0 o jogo acaba e a tela de encerramento inicia
    if (lives <= 0) {
        this.scene.start(cena2);
        lives = 2
        trilha.stop();
    }

    // Vida beatriz, caso chegue a 0 o jogo acaba e a tela de encerramento inicia
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
    ganho.play();
}

function collectSup1(beatriz, sup) {
    sup.disableBody(true, true);

    lives1 += 1;
    livesText1.setText('Vidas Beatriz: ' + lives1);
    ganho.play();
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
    perda.play();
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
    perda.play();
    lives1 -= 1;
    livesText1.setText("Vidas Beatriz: " + lives1);

    //beatriz.setTint(0xffffff);   
}

export { cena1 };