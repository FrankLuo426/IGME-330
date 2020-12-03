import * as utils from "./utils.js";
import * as classes from "./classes.js"
const imageURL = "garfield.jpg";
let spriteImage;
let ctx, canvas
let gradient;
let sprites = [];
const canvasWidth = 600,
    canvasHeight = 400;


function init() {
    canvas = document.querySelector('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");
    gradient = utils.createLinearGradient(ctx, 0, 0, 0, canvasHeight, [{
        percent: 0,
        color: "blue"
    }, {
        percent: .25,
        color: "green"
    }, {
        percent: .5,
        color: "yellow"
    }, {
        percent: .75,
        color: "red"
    }, {
        percent: 1,
        color: "magenta"
    }])

    // #5 - make 2 different kinds of sprites and use `array.concat()` to append them to 
    // the `sprites` array
    sprites = sprites.concat(sprites, createSprites(10, classes.Sprite));
    sprites = sprites.concat(sprites, createSprites(20, classes.RingSprite));

    // But cool kids use the spread operator instead of `array.concat()`
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    // sprites =  [...createSprites(10,Sprite), ...createSprites(20,RingSprite)];

    // hook up event handlers
    setupUI();

    utils.preloadImage(imageURL, function (image) {
        spriteImage = image;
        createImageSprites(20);
        loop();
    });

    //createImageSprites(20);
}

function loop() {
    // schedule a call to loop() in 1/60th of a second
    requestAnimationFrame(loop);
    // draw background
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // move and draw sprites
    moveAndDrawSprites(ctx);
}

function setupUI() {
    // #6 - note the attribute selector we are using here
    let radioButtons = document.querySelectorAll("input[type=radio][name=speed]");
    for (let r of radioButtons) {
        r.onchange = function (e) {
            // #7 - form values are returned as Strings, so we have to convert them to a Number
            let speed = Number(e.target.value);
            for (let s of sprites) {
                s.speed = Math.random() + speed;
            }
        }
    }
}

// #8 - Note that here we take a Class as a function to an argument
// That means that in JS, classes (as well as functions) are "first class" types like
// String, Number etc in that they can be passed as arguments to functions, and also
// returned from functions.
function createSprites(num = 5, classRef = classes.Sprite) {
    // create array to hold all of our sprites
    let array = [];

    // make some sprites
    for (let i = 0; i < num; i++) {
        // determine random properties and instantiate new sprite
        let x = Math.random() * (canvasWidth - 100) + 50;
        let y = Math.random() * (canvasHeight - 100) + 50;
        let span = 15 + Math.random() * 25;
        let fwd = utils.getRandomUnitVector();
        let speed = Math.random() + 2;
        let color = utils.getRandomColor();
        let s = new classRef(x, y, span, fwd, speed, color);

        // add to end of array
        array.push(s);
    } // end for

    return array;
}

// #9 - standard "move and check world boundaries" code
function moveAndDrawSprites(ctx) {
    ctx.save();
    for (let s of sprites) {
        // move sprite
        s.move();

        // check sides and bounce
        if (s.x <= s.span / 2 || s.x >= canvasWidth - s.span / 2) {
            s.reflectX();
            s.move();
        }
        if (s.y <= s.span / 2 || s.y >= canvasHeight - s.span / 2) {
            s.reflectY();
            s.move();
        }

        // draw sprite
        s.draw(ctx);

    } // end for
    ctx.restore();
}

function createImageSprites(num) {
    let imgList = [];
    for (let i = 0; i < num; i++) {
        imgList[i] = new classes.ImageSprite(utils.getRandom(0, 550), utils.getRandom(0, 350), 50, {
            x: 1,
            y: 0
        }, 2, spriteImage);
        sprites.push(imgList[i]);
    }
}

export {init};