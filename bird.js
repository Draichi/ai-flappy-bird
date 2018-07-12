// regex to convert es5 functions to es6 classes
// find: this\.(.*?)\s*=\s*function
// replace: $1

function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class Bird {
  constructor(brain) {
    this.y = height/2
    this.x = 64
    this.gravity = .6
    this.velocity = 0
    this.lift = -7
    this.score = 0
    this.fitness = 0
    this.icon = birdSprite
    this.width = 30
    this.height = 30
    if (brain) {
      this.brain = brain.copy()
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(
        5, // inputs
        6, // hidden layers
        2  // output
      )
    }
  }
  copy() {
    return new Bird(this.brain);
  }

  show () {
    image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
  }

  up () {
    this.velocity =+ this.lift

  }

  think(pipes) {

    // find the closest pipe
    let closestPipe = null
    let closestPipeDistance = Infinity
    for (let i=0; i<pipes.length; i++) {
      let distance = (pipes[i].x + pipes[i].w) - this.x
      if (distance < closestPipeDistance && distance > 0) {
        closestPipe = pipes[i]
        closestPipeDistance = distance
      }
    }

    let inputs = []
    inputs[0] = this.y / height
    inputs[1] = closestPipe.top / height
    inputs[2] = closestPipe.bottom / height
    inputs[3] = closestPipe.x / width
    inputs[4] = this.velocity / 33 // just trying to normalize this value

    let output = this.brain.predict(inputs)
    if (output[0] > output[1]) {
      this.up()
    }
  }

  update () {
    this.score ++
    this.velocity += this.gravity
    this.y += this.velocity

    if (this.y > height) {
      this.y = height
      this.velocity = 0
    }
    if (this.y < 0) {
      this.y = 0
      this.velocity = 0
    }
  }
}