class Pipe {
  constructor() {
    this.spacing = 125
    this.top = random(height/6, 3/4 *height)
    this.bottom = height - (this.top + this.spacing)
    this.x = width 
    this.w = 80
    this.speed = 3
    this.icon = pipeSprite
    this.passed = false
  }

  show () {
    image(this.icon, this.x, 0, this.w, this.top)
    image(this.icon, this.x, height-this.bottom, this.w, this.bottom)
  }

  update () {
    this.x -= this.speed
  }

  hits (bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true
      }
    }
    if (bird.y == height || bird.y == 0) {
      return true
    }
    return false
  }

  pass (bird) {
    if (bird.x > this.x && !this.passed) {
      this.passed = true
      return true
    }
    return false
  }

  offscreen () {
    if (this.x < -this.w) {
      return true
    } else {
      return false
    }
  }
}