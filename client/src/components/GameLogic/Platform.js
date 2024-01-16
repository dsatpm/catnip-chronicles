class Platform {
  constructor(x, y, width, height, death) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.death = death;
  }

  draw(context) {
    context.fillStyle = '#000000';
    context.fillRect(this.x, this.y, this.height, this.width);
  }
}

export default Platform;