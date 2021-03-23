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
    agatha = this.physics.add.sprite(200, 1600, "agatha");
    beatriz = this.physics.add.sprite(220, 1600, "beatriz");
    const sobreMesa = map.createStaticLayer("sobreMesa", tileset, 0, 0);

    // colisao com bordas
    agatha.setCollideWorldBounds(true);
    beatriz.setCollideWorldBounds(true);

    // colisao com cenario
    worldLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(agatha, worldLayer);
    this.physics.add.collider(beatriz, worldLayer);

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
}

cena1.update = function () {

    // Controle de movimentação de Agatha
    if (cursors.left.isDown) {
        agatha.body.setVelocityX(-150);
        // agatha.anims.play("left", true);
    } else if (cursors.right.isDown) {
        agatha.body.setVelocityX(150);
        // agatha.anims.play("right", true);
    } else {
        agatha.body.setVelocity(0);
    }
    if (cursors.up.isDown) {
        agatha.body.setVelocityY(-150);
        // agatha.anims.play("up", true);
    } else if (cursors.down.isDown) {
        agatha.body.setVelocityY(150);
        // agatha.anims.play("down", true);
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
        // beatriz.anims.play("left1", true);
    } else if (right.isDown) {
        beatriz.body.setVelocityX(150);
        // beatriz.anims.play("right1", true);
    } else {
        beatriz.body.setVelocity(0);
        // beatriz.anims.play("stopped1", true);
    }
    if (up.isDown) {
        beatriz.body.setVelocityY(-150);
        // beatriz.anims.play("up1", true);
    } else if (down.isDown) {
        beatriz.body.setVelocityY(150);
        // beatriz.anims.play("down1", true);
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

}

//exportar a cena
export { cena1 };