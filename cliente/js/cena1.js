import { cena2 } from "./cena2.js";
import { cena3 } from "./cena3.js";

var cena1 = new Phaser.Scene("Cena 1");

var agatha;
var beatriz;
//var cursors;
var pointer;
var touchX;
var touchY;
var trilha;
var sup;
var lives = 3;
var lives1 = 3;
var livesText;
var livesText1;
var virus;
var cofre;
var dois;
var tres;
var cinco;
var seis;
var oito;
var ganho;
var perda;
var hist;
var hist2;
var hist3;
var hist5;
var hist6;
var hist8;
var achouCofre = 0;
var jogador;
var ice_servers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
var localConnection;
var remoteConnection;
var midias;
const audio = document.querySelector("audio");

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

    this.load.image("cofre", "assets/cofre.png");
    this.load.spritesheet("teste", "assets/teste.png", { frameWidth: 40, frameHeight: 40 });

    // controles para toque em tela
    this.load.spritesheet("cima", "assets/up.png", { frameWidth: 60, frameHeight: 60 });
    this.load.spritesheet("baixo", "assets/down.png", { frameWidth: 60, frameHeight: 60 });
    this.load.spritesheet("direita", "assets/right.png", { frameWidth: 60, frameHeight: 60 });
    this.load.spritesheet("esquerda", "assets/left.png", { frameWidth: 60, frameHeight: 60 });

    // história
    this.load.spritesheet("fim", "assets/fim.png", { frameWidth: 359.5, frameHeight: 520 });
    this.load.spritesheet("dois", "assets/dois.png", { frameWidth: 360, frameHeight: 444 });
    this.load.spritesheet("tres", "assets/tres.png", { frameWidth: 360, frameHeight: 425 });
    this.load.spritesheet("cinco", "assets/cinco.png", { frameWidth: 360, frameHeight: 488 });
    this.load.spritesheet("seis", "assets/seis.png", { frameWidth: 360, frameHeight: 449 });
    this.load.spritesheet("oito", "assets/oito.png", { frameWidth: 360, frameHeight: 436 });

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

    //cursors = this.input.keyboard.createCursorKeys();

    // Interação por toque de tela (até 2 toques simultâneos: 0 a 1)
    pointer = this.input.addPointer(1);

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

    cofre = this.physics.add.image(2550, 130, "cofre");
    dois = this.physics.add.image(438, 290, "teste", 0);
    dois.setFrame(0);
    tres = this.physics.add.image(1318, 1575, "teste", 0);
    tres.setFrame(0);
    cinco = this.physics.add.image(1140, 960, "teste", 0);
    cinco.setFrame(0);
    seis = this.physics.add.image(896, 96, "teste", 0);
    seis.setFrame(0);
    oito = this.physics.add.image(1780, 820, "teste", 0);
    oito.setFrame(0);

    hist = this.add.image(400, 300, "fim", 0).setScrollFactor(0);
    hist.setFrame(0);

    hist2 = this.add.image(400, 300, "dois", 0).setScrollFactor(0);
    hist2.setFrame(0);

    hist3 = this.add.image(400, 300, "tres", 0).setScrollFactor(0);
    hist3.setFrame(0);

    hist5 = this.add.image(400, 300, "cinco", 0).setScrollFactor(0);
    hist5.setFrame(0);

    hist6 = this.add.image(400, 300, "seis", 0).setScrollFactor(0);
    hist6.setFrame(0);

    hist8 = this.add.image(400, 300, "oito", 0).setScrollFactor(0);
    hist8.setFrame(0);



    livesText = this.add.text(10, 10, "Vidas Agatha: 3", {
        font: "25px monospace",
        fill: "#000",
        padding: { x: 10, y: 10 },
        backgroundColor: "#8C3A1C"
    });
    livesText.setScrollFactor(0);

    livesText1 = this.add.text(500, 10, "Vidas Beatriz: 3", {
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

    // D-pad
    var esquerda = this.add
        .image(50, 550, "esquerda", 0)
        .setInteractive()
        .setScrollFactor(0);
    var direita = this.add
        .image(125, 550, "direita", 0)
        .setInteractive()
        .setScrollFactor(0);
    var cima = this.add
        .image(750, 475, "cima", 0)
        .setInteractive()
        .setScrollFactor(0);
    var baixo = this.add
        .image(750, 550, "baixo", 0)
        .setInteractive()
        .setScrollFactor(0);

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

                // Detecção de colisão e disparo de evento: cofre
                physics.add.overlap(agatha, cofre, hitCofre, null, this);

                // Detecção de colisão e disparo de evento: dois
                physics.add.overlap(agatha, dois, hitDois, null, this);

                // Detecção de colisão e disparo de evento: tres
                physics.add.overlap(agatha, tres, hitTres, null, this);

                // Detecção de colisão e disparo de evento: cinco
                physics.add.overlap(agatha, cinco, hitCinco, null, this);

                // Detecção de colisão e disparo de evento: seis
                physics.add.overlap(agatha, seis, hitSeis, null, this);

                // Detecção de colisão e disparo de evento: oitp
                physics.add.overlap(agatha, oito, hitOito, null, this);

                // Câmera seguindo o personagem 1
                cameras.main.startFollow(agatha);

                // D-pad: para cada direção já os eventos
                // para tocar a tela ("pointerover")
                // e ao terminar essa interação ("pointerout")
                esquerda.on("pointerover", () => {
                    if (lives > 0) {
                        esquerda.setFrame(1);
                        agatha.setVelocityX(-200);
                        agatha.anims.play("left", true);
                    }
                });
                esquerda.on("pointerout", () => {
                    if (lives > 0) {
                        esquerda.setFrame(0);
                        agatha.setVelocityX(0);
                        agatha.anims.play("stopped", true);
                    }
                });
                direita.on("pointerover", () => {
                    if (lives > 0) {
                        direita.setFrame(1);
                        agatha.setVelocityX(200);
                        agatha.anims.play("right", true);
                    }
                });
                direita.on("pointerout", () => {
                    if (lives > 0) {
                        direita.setFrame(0);
                        agatha.setVelocityX(0);
                        agatha.anims.play("stopped", true);
                    }
                });
                cima.on("pointerover", () => {
                    if (lives > 0) {
                        cima.setFrame(1);
                        agatha.setVelocityY(-200);
                        agatha.anims.play("up", true);
                    }
                });
                cima.on("pointerout", () => {
                    if (lives > 0) {
                        cima.setFrame(0);
                        agatha.setVelocityY(0);
                        agatha.anims.play("stopped", true);
                    }
                });
                baixo.on("pointerover", () => {
                    if (lives > 0) {
                        baixo.setFrame(1);
                        agatha.setVelocityY(200);
                        agatha.anims.play("down", true);
                    }
                });
                baixo.on("pointerout", () => {
                    if (lives > 0) {
                        baixo.setFrame(0);
                        agatha.setVelocityY(0);
                        agatha.anims.play("stopped", true);
                    }
                });

                navigator.mediaDevices
                    .getUserMedia({ video: false, audio: true })
                    .then((stream) => {
                        midias = stream;
                    })
                    .catch((error) => console.log(error));

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

                // Detecção de colisão e disparo de evento: cofre
                physics.add.overlap(beatriz, cofre, hitCofre1, null, this);

                // Detecção de colisão e disparo de evento: dois
                physics.add.overlap(beatriz, dois, hitDois1, null, this);

                // Detecção de colisão e disparo de evento: tres
                physics.add.overlap(beatriz, tres, hitTres1, null, this);

                // Detecção de colisão e disparo de evento: cinco
                physics.add.overlap(beatriz, cinco, hitCinco1, null, this);

                // Detecção de colisão e disparo de evento: seis
                physics.add.overlap(beatriz, seis, hitSeis1, null, this);

                // Detecção de colisão e disparo de evento: oitp
                physics.add.overlap(beatriz, oito, hitOito1, null, this);

                // Câmera seguindo o personagem 2
                cameras.main.startFollow(beatriz);

                // D-pad: para cada direção já os eventos
                // para tocar a tela ("pointerover")
                // e ao terminar essa interação ("pointerout")
                esquerda.on("pointerover", () => {
                    if (lives1 > 0) {
                        esquerda.setFrame(1);
                        beatriz.setVelocityX(-200);
                        beatriz.anims.play("left1", true);
                    }
                });
                esquerda.on("pointerout", () => {
                    if (lives1 > 0) {
                        esquerda.setFrame(0);
                        beatriz.setVelocityX(0);
                        beatriz.anims.play("stopped1", true);
                    }
                });
                direita.on("pointerover", () => {
                    if (lives1 > 0) {
                        direita.setFrame(1);
                        beatriz.setVelocityX(200);
                        beatriz.anims.play("right1", true);
                    }
                });
                direita.on("pointerout", () => {
                    if (lives1 > 0) {
                        direita.setFrame(0);
                        beatriz.setVelocityX(0);
                        beatriz.anims.play("stopped1", true);
                    }
                });
                cima.on("pointerover", () => {
                    if (lives1 > 0) {
                        cima.setFrame(1);
                        beatriz.setVelocityY(-200);
                        beatriz.anims.play("up1", true);
                    }
                });
                cima.on("pointerout", () => {
                    if (lives1 > 0) {
                        cima.setFrame(0);
                        beatriz.setVelocityY(0);
                        beatriz.anims.play("stopped1", true);
                    }
                });
                baixo.on("pointerover", () => {
                    if (lives1 > 0) {
                        baixo.setFrame(1);
                        beatriz.setVelocityY(200);
                        beatriz.anims.play("down1", true);
                    }
                });
                baixo.on("pointerout", () => {
                    if (lives1 > 0) {
                        baixo.setFrame(0);
                        beatriz.setVelocityY(0);
                        beatriz.anims.play("stopped1", true);
                    }
                });

                navigator.mediaDevices
                    .getUserMedia({ video: false, audio: true })
                    .then((stream) => {
                        midias = stream;
                        localConnection = new RTCPeerConnection(ice_servers);
                        midias
                            .getTracks()
                            .forEach((track) => localConnection.addTrack(track, midias));
                        localConnection.onicecandidate = ({ candidate }) => {
                            candidate &&
                                socket.emit("candidate", jogadores.primeiro, candidate);
                        };
                        console.log(midias);
                        localConnection.ontrack = ({ streams: [midias] }) => {
                            audio.srcObject = midias;
                        };
                        localConnection
                            .createOffer()
                            .then((offer) => localConnection.setLocalDescription(offer))
                            .then(() => {
                                socket.emit(
                                    "offer",
                                    jogadores.primeiro,
                                    localConnection.localDescription
                                );
                            });
                    })
                    .catch((error) => console.log(error));
            }
            // Os dois jogadores estão conectados
            console.log(jogadores);
        }
    });
    this.socket.on("offer", (socketId, description) => {
        remoteConnection = new RTCPeerConnection(ice_servers);
        midias
            .getTracks()
            .forEach((track) => remoteConnection.addTrack(track, midias));
        remoteConnection.onicecandidate = ({ candidate }) => {
            candidate && socket.emit("candidate", socketId, candidate);
        };
        remoteConnection.ontrack = ({ streams: [midias] }) => {
            audio.srcObject = midias;
        };
        remoteConnection
            .setRemoteDescription(description)
            .then(() => remoteConnection.createAnswer())
            .then((answer) => remoteConnection.setLocalDescription(answer))
            .then(() => {
                socket.emit("answer", socketId, remoteConnection.localDescription);
            });
    });

    socket.on("answer", (description) => {
        localConnection.setRemoteDescription(description);
    });

    socket.on("candidate", (candidate) => {
        const conn = localConnection || remoteConnection;
        conn.addIceCandidate(new RTCIceCandidate(candidate));
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

    let frame;
    // Controle do personagem por direcionais
    if (jogador === 1) {
        // Testa se há animação do oponente,
        // caso contrário envia o primeiro frame (0)
        try {
            frame = agatha.anims.currentFrame.index;
        } catch (e) {
            frame = 0;
        }
        this.socket.emit("estadoDoJogador", {
            frame: frame,
            x: agatha.body.x,
            y: agatha.body.y,
        });
    } else if (jogador === 2) {
        // Testa se há animação do oponente,
        // caso contrário envia o primeiro frame (0)
        try {
            frame = beatriz.anims.currentFrame.index;
        } catch (e) {
            frame = 0;
        }
        this.socket.emit("estadoDoJogador", {
            frame: frame,
            x: beatriz.body.x,
            y: beatriz.body.y,
        });
    }
    /*if (jogador === 1) {
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
            beatriz.body.setVelocityX(-200);
        } else if (cursors.right.isDown) {
            beatriz.body.setVelocityX(200);
        } else {
            beatriz.body.setVelocityX(0);
        }
        if (cursors.up.isDown) {
            beatriz.body.setVelocityY(-200);
        } else if (cursors.down.isDown) {
            beatriz.body.setVelocityY(200);
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
    }*/

    // Vida agatha, caso chegue a 0 o jogo acaba e a tela de encerramento inicia
    if (lives <= 0) {
        this.scene.start(cena2);
        lives = 3
        trilha.stop();
    }

    // Vida beatriz, caso chegue a 0 o jogo acaba e a tela de encerramento inicia
    if (lives1 <= 0) {
        this.scene.start(cena2);
        lives = 3
        trilha.stop();
    }

    if (achouCofre === 1) {
        setTimeout(() => {
            this.scene.start(cena3);
            achouCofre = 0;
            trilha.stop();
        }, 20000);
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

function hitCofre(agatha, cofre) {
    hist.setFrame(1);
    achouCofre = 1;
}

function hitCofre1(beatriz, cofre) {
    hist.setFrame(1);
    achouCofre = 1;
}

function hitDois(agatha, dois) {
    hist2.setFrame(1);
    setTimeout(() => {
        hist2.setFrame(0);;
    }, 100);
}

function hitDois1(beatriz, dois) {
    hist2.setFrame(1);
    setTimeout(() => {
        hist2.setFrame(0);;
    }, 100);
}

function hitTres(agatha, tres) {
    hist3.setFrame(1);
    setTimeout(() => {
        hist3.setFrame(0);;
    }, 100);
}

function hitTres1(beatriz, tres) {
    hist3.setFrame(1);
    setTimeout(() => {
        hist3.setFrame(0);;
    }, 100);
}

function hitCinco(agatha, cinco) {
    hist5.setFrame(1);
    setTimeout(() => {
        hist5.setFrame(0);;
    }, 100);
}

function hitCinco1(beatriz, cinco) {
    hist5.setFrame(1);
    setTimeout(() => {
        hist5.setFrame(0);;
    }, 100);
}

function hitSeis(agatha, seis) {
    hist6.setFrame(1);
    setTimeout(() => {
        hist6.setFrame(0);;
    }, 100);
}

function hitSeis1(beatriz, seis) {
    hist6.setFrame(1);
    setTimeout(() => {
        hist6.setFrame(0);;
    }, 100);
}

function hitOito(agatha, oito) {
    hist8.setFrame(1);
    setTimeout(() => {
        hist8.setFrame(0);;
    }, 100);
}

function hitOito1(beatriz, oito) {
    hist8.setFrame(1);
    setTimeout(() => {
        hist8.setFrame(0);;
    }, 100);
}

export { cena1 };