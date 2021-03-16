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

function preload() {
    this.load.image("lab", "assets/lab_tileset.png");
    this.load.image("ambiente", "assets/tileset.png");
    this.load.tilemapTiledJSON("map", "assets/teste.json");
} 

function create() {
    const map = this.make.tilemap({ key: "map" });

    const tileset0 = map.addTilesetImage("lab_tileset", "lab");
    const tileset1 = map.addTilesetImage("tileset", "ambiente");

    const paredes = map.createStaticLayer("paredes", tileset1, 0, 0);
    const chao = map.createStaticLayer("chao", tileset1, 0, 0);
    const moveis = map.createStaticLayer("moveis", tileset0, 0, 0);
    const sombra = map.createStaticLayer("sombra", tileset1, 0, 0);
    const sobreMesa = map.createStaticLayer("sobreMesa", tileset0, 0, 0);
    
} 

function update(time, delta) {
    
}