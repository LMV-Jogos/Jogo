const config = {
    type: Phaser.AUTO,
    width: 608,
    height: 576,
    parent: "game-container",
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);

var agatha;
var cursors;
var beatriz;
var left;
var right;
var up;
var down;

function preload() {
    this.load.image("lab", "assets/lab_tileset.png");
    this.load.image("ambiente", "assets/tileset.png");
    this.load.tilemapTiledJSON("map", "assets/jogo.teste.json");
    this.load.spritesheet("agatha", "assets/agatha.png", {
        frameWidth: 32,
        frameHeight: 48
    });
    this.load.spritesheet("beatriz", "assets/beatriz.png", {
        frameWidth: 32,
        frameHeight: 48
    });
}

function create() {
    const map = this.make.tilemap({ key: "map" });

    const tileset0 = map.addTilesetImage("lab_tileset", "lab");
    const tileset1 = map.addTilesetImage("tileset", "ambiente");

    const sombra = map.createStaticLayer("sombra", tileset1, 0, 0);
    const chao = map.createStaticLayer("chao", tileset1, 0, 0);
    const paredes = map.createStaticLayer("paredes", tileset1, 0, 0);
    const moveis = map.createStaticLayer("moveis", tileset0, 0, 0);
    const sobreMesa = map.createStaticLayer("sobreMesa", tileset0, 0, 0);

    agatha = this.physics.add.sprite(400, 304, "agatha");
    beatriz = this.physics.add.sprite(400, 380, "beatriz");

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

function update(time, delta) {
    if (cursors.left.isDown) {
        agatha.body.setVelocityX(-100);
        agatha.anims.play("left", true);
    } else if (cursors.right.isDown) {
        agatha.body.setVelocityX(100);
        agatha.anims.play("right", true);
    } else {
        agatha.body.setVelocity(0);
        agatha.anims.play("stopped", true);
    }

    if (cursors.up.isDown) {
        agatha.body.setVelocityY(-100);
        agatha.anims.play("up", true);
    } else if (cursors.down.isDown) {
        agatha.body.setVelocityY(100);
        agatha.anims.play("down", true);
    } else {
        agatha.body.setVelocityY(0);
    }

    if (left.isDown) {
        beatriz.body.setVelocityX(-100);

        beatriz.anims.play("left1", true);
    }
    else if (right.isDown) {
        beatriz.body.setVelocityX(100);

        beatriz.anims.play("right1", true);
    }
    else {
        beatriz.body.setVelocity(0);
        beatriz.anims.play("stopped1", true);
    }
    if (up.isDown) {
        beatriz.body.setVelocityY(-100);
        beatriz.anims.play("up1", true);
    } else if (down.isDown) {
        beatriz.body.setVelocityY(100);
        beatriz.anims.play("down1", true);
    } else {
        beatriz.body.setVelocityY(0);
    }


}
