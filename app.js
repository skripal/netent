var app = new PIXI.Application(outerWidth, outerHeight);
document.body.appendChild(app.view);

var background = new PIXI.Sprite.fromImage('img/BG.png');
background.width = app.renderer.width;
background.height = app.renderer.height;

app.stage.addChild(background);

var button = new PIXI.Sprite.fromImage('img/BTN_Spin.png');
button.width = 140;
button.height = 140;
button.x = 1172;
button.y = 292;
button.interactive = true;
button.buttonMode = true;
button.on('pointerdown', onClickMe);
app.stage.addChild(button);


var firstStripe = new PIXI.Container();
var secondStripe = new PIXI.Container();
var thirdStripe = new PIXI.Container();
app.stage.addChild(firstStripe);
app.stage.addChild(secondStripe);
app.stage.addChild(thirdStripe);

var symbols = ['img/SYM5.png', 'img/SYM6.png', 'img/SYM7.png', 'img/SYM1.png', 'img/SYM3.png', 'img/SYM4.png', 'img/SYM5.png', 'img/SYM6.png', 'img/SYM7.png'];
for (var i = 0; i < symbols.length; i++) {
    var item = PIXI.Sprite.fromImage(symbols[i]);
    item.x = 150;
    item.y = -450 + (i * 250);
    firstStripe.addChild(item);
}

for (i = 0; i < symbols.length; i++) {
    item = PIXI.Sprite.fromImage(symbols[i]);
    item.x = 500;
    item.y = -450 + (i * 250);
    secondStripe.addChild(item);
}

for (i = 0; i < symbols.length; i++) {
    item = PIXI.Sprite.fromImage(symbols[i]);
    item.x = 850;
    item.y = -450 + (i * 250);
    thirdStripe.addChild(item);
}

function onClickMe() {

    var combination = [];
    firstStripe.y = parseInt(Math.random() * 125) * 10 - 750;
    secondStripe.y = parseInt(Math.random() * 125) * 10 - 750;
    thirdStripe.y = parseInt(Math.random() * 125) * 10 - 750;

    var rotator1 = setInterval(rotation, 100, firstStripe);
    var rotator2 = setInterval(rotation, 100, secondStripe);
    var rotator3 = setInterval(rotation, 100, thirdStripe);
    var rotationSpeed = 150;

    function rotation(stripe) {
        stripe.y += rotationSpeed;
        if (stripe.y > 500) {
            stripe.y = -900;
        }
    }

    function finishRotation(stripe, rotator) {

        if (stripe.y % 250 != 0) {
            if (stripe.y < 0) {
                stripe.y -= stripe.y % 250;
            } else {
                stripe.y += 250 - stripe.y % 250;
            }
        }
        combination.push(stripe.y);
        clearInterval(rotator);

        if (rotator === rotator3) {
            checkWinning(combination);
        }
    }

    setTimeout(finishRotation, 1000, firstStripe, rotator1);
    setTimeout(finishRotation, 1500, secondStripe, rotator2);
    setTimeout(finishRotation, 2000, thirdStripe, rotator3);

}


var line = new PIXI.Sprite.fromImage('img/Bet_Line.png');
line.y = 380;
line.x = 225;
app.stage.addChild(line);
