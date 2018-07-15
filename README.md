# Reinforcement learning in Flappy Bird

Genetic algorithm using the 'toy' library applaied to a custom flappy bird version built using p5.js

## Getting Started

See [here](https://draichi.github.io/ai-flappy-bird/index.html) - the live demo

or run locally:

```sh
npm i -g http-server
git clone
cd ai-flappy-bird
http-server

# Press 's' to save the model of best bird
```

## Files

- `sketch.js` - Setup the canvas and draw the objects
- `bird.js` - Setup of bird's neural network and setup of major physics of the game
- `genetic.js` - The algorithm who will save the best neural net configs and keep iterating
- `pipe.js` - Physics and speed of the obstacle
- `nn.js and matrix.js` - Neural net libs
- `p5.js` - Canvas lib

## To-do

- [x] work on mobile
- [x] velocity selector
- [ ] run the best bird
- [ ] use tensorflow.js

## Credits

- @shiffman