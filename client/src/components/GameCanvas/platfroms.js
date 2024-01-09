
class Platform {
    constructor({ x, y, width, height, terrainImage, platformImage, bladeImage }) {
        this.position = {
            x,
            y
        };
        this.width = width || 400;
        this.height = height || 40;
        this.terrainImage = terrainImage || defaultTerrainImage;
        this.platformImage = platformImage || defaultPlatformImage;
        this.bladeImage = bladeImage || defaultBladeImage;
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
        y: 536,
        type: 'terrain'
    }),
    new Platform({
        x: 400,
        y: 536,
        width: 200,
        height: 20,
        type: 'platform'
    }),
    new Platform({
        x: 800,
        y: 536,
        width: 300,
        height: 30,
        type: 'blade'
    }),
];

export { Platform, platforms };