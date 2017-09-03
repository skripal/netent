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




var container = new PIXI.Container();
app.stage.addChild(container);

var symbols = ['img/SYM5.png', 'img/SYM6.png','img/SYM7.png','img/SYM1.png','img/SYM3.png','img/SYM4.png','img/SYM5.png','img/SYM6.png','img/SYM7.png'];
for (var i = 0; i < symbols.length; i++) {
    var item = PIXI.Sprite.fromImage(symbols[i]);
    item.x = 150;
    item.y =  -450 + (i*250);
    container.addChild(item);
}

function onClickMe() {
    container.y = parseInt(Math.random()*125) * 10 - 750;
    console.log("random: ", container.y);
    var rotator = setInterval(rotation, 10);
    var c = 5;
    var step = parseInt(Math.exp(c));

    function rotation() {
        container.y += step;
        c = c - 0.05;
        step = parseInt(Math.exp(c));
        console.log("step: ", step);
        if (container.y > 500) {
            container.y = -900;
        }

        if (step <= 10) {
            clearInterval(rotator);
            finishRotation();
        }
    }
        function finishRotation() {
            setInterval(stopR, 100);
            function stopR () {
                if (container.y % 250 != 0) {
                    if (container.y%10 != 0) {
                        container.y = container.y - container.y%10;
                    }
                    container.y += 10;
                } else {
                    clearInterval(stopR);
                }
            }
        }
}
