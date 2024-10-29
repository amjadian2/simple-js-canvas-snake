// most of the code is written by myself
let FPS = 10
// this is the main game class keeping track of 
// the main scene and the main grid
// this is the canvas element , its context and the game object
const canvas = document.getElementById("main-canvas")
let ctx    = canvas.getContext("2d")
let game;


// here are the init or setup and the draw function 
// the init is ran before everything else and 
// the draw runs each frame

function init() {
    game = new Game(canvas)
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.draw()
    // console.log("g")
}


// this part is used for controlling the fps and is 

var stop = false;
var fps, fpsInterval, startTime, now, then, elapsed;

startAnimating(FPS);

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    init();
    animate();
}


function animate() {
    if (stop){return}
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        draw()
    }
    requestAnimationFrame(animate);
}


// {37 : left , 38 : up , 39 : right , 40 : down}
document.addEventListener('keydown', event => game.keyDown(event.keyCode,event), true);
document.addEventListener("click", event => game.onClick(event.clientX,event.clientY,event), false);

