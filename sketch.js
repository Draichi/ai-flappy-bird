const TOTAL    = 250
let birds      = []
let savedBirds = []
let pipes      = []
let counter    = 0
var score = 0
var maxScore = 0
let slider
let pipeSprite
let birdSprite
let bgImg
var bgX = 0
let parallax = 0.8
var speedSlider
var oi

function preload () {
	pipeSprite = loadImage('graphics/pipe2.jpeg')
	birdSprite = loadImage('graphics/bird4.jpg')
	bgImg = loadImage('graphics/bkgr2.jpg')
}

function setup () {
	var oi = select('#chip')
	var canvas = createCanvas(400, 480)
	canvas.parent('page-content')
	reset()

	slider = select('#slider');
	// slider = createSlider(1, 100, 1)
	for (let i=0; i<TOTAL; i++) {
		birds[i] = new Bird()
	}
}

function draw () {
	background(0)

	image(bgImg, bgX, 0, bgImg.width, height)
	bgX -= 3 * parallax
	if (bgX <= -bgImg.width + width) {
		image(bgImg, bgX + bgImg.width, 0, bgImg.width, height)
		if (bgX <= -bgImg.width) {
			bgX = 0
		}
	}

	for (let n=0; n<slider.value(); n++) {

		showScores()
		if (counter % 123 == 0) {
			pipes.push(new Pipe())
		}
		counter++
	
		for (let i=pipes.length-1; i>=0; i--) {
			pipes[i].update()

	
			for (let j=birds.length-1; j>=0; j--) {
				if (pipes[i].pass(birds[j])) {
					score++
				}
				
				if (pipes[i].hits(birds[j])) {
					//u get as a return the spliced object
					savedBirds.push(birds.splice(j, 1)[0])
				}
			}
	
			if (pipes[i].offscreen()) {
				pipes.splice(i, 1)
			}
		}
	
		for (let bird of birds) {
			bird.think(pipes)
			bird.update()
		}
	
		if (birds.length === 0) {
			counter = 0
			nextGeneration()
			reset()
			pipes = []
		}
	}

	// drawing stuff
	

	for (let bird of birds) {
		bird.show()
	}

	for (let pipe of pipes) {
		pipe.show()
	}

}

function reset () {
	maxScore = max(score, maxScore)
	score = 0
	bgX = 0
}

function showScores () {
	textSize(20);
	text('score: ' + score, 1, 40);
	fill(0, 255, 255, 255);
	text('record: ' + maxScore, 1, 60);
	text('generation: ' + generation, 1, 80);
	text('birds: ' + birds.length, 1, 100);
}


oi.html(score)

function keyPressed () {
	if (key === 'S') {
		let bird = birds[0]
		let json = JSON.stringify(bird.brain)
		saveJSON(json, 'best_bird.json')
	}
}