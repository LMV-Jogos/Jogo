const config = {
    type: Phaser.AUTO, 
    width: 320, 
    height: 320, 
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

function preload() {
    this.load.image("lab", "assets/lab_tileset.png");
    this.load.tilemapTiledJSON("map", "assets/jogo.teste.json");
} 

function create() {
    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("lab_tileset", "lab");

    const ambiente = map.createStaticLayer("ambiente", tileset, 0, 0);
    const sala = map.createStaticLayer("moveis", tileset, 0, 0);
    const sobreMesa = map.createStaticLayer("sobreMesa", tileset, 0, 0);
    
}

function update(time, delta) {
    
}