const terrainImage = new Image();
terrainImage.src = '/client/src/Images/Terrain/Grass Terrain(16x64).jpg'


class Platform {
    constructor({ x, y, width, height }) {
        this.position = {
            x,
            y
        };
        this.width = width || 400;
        this.height = height || 40;
        this.terrainImage = terrainImage || defaultTerrainImage; //Example
    }

    draw(type) {
        let image;
        switch (type) {
            case 'terrain':
                image = this.terrainImage;
                break;
            case 'platform':
                image = this.platformImage;
                break;
            case 'blade':
                image = this.bladeImage;
                break;
            default:
                image = this.terrainImage;
        }

        c.drawImage(image, this.position.x, this.position.y, this.width, this.height);
    }
}

//Example file Will Edit later

let platforms = [
    new Platform({
        x: 0,
        y: 536
    }),
    new Platform({
        x: 400,
        y: 536
    }),
    new Platform({
        x: 800,
        y: 536
    }),
    new Platform({          //<- Example
        x: 800,
        y: 536,
        width: 300,
        height: 30,
        type: 'terrainImage'
    }),
];

export { Platform, createPlatforms };
