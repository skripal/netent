;(function slotGame() {
    var app = new PIXI.Application(1366, window.innerHeight);
    document.body.appendChild(app.view);

    //get external file
    var symbolsArray = [];
    var elementsArray = [];
    (function getSymbols() {
        var data = JSON.parse(imageService.getImages('../models/external.json'));
        symbolsArray = data.symbols;
        elementsArray = data.elements;
    })();

    //add background
    var background = new PIXI.Sprite.fromImage(elementsArray.background);
    background.width = app.renderer.width;
    background.height = app.renderer.height;
    app.stage.addChild(background);

    //add play button
    var buttonTexture = new PIXI.Texture.fromImage(elementsArray.button);
    var buttonDisabledTexture = new PIXI.Texture.fromImage(elementsArray.buttonDisabled);
    var button = new PIXI.Sprite(buttonTexture);
    button.anchor.set(0.5);
    button.width = 140;
    button.height = 140;
    button.x = 1242;
    button.y = app.renderer.height / 2;
    button.interactive = true;
    button.buttonMode = true;
    button.on('pointerdown', rotate);
    app.stage.addChild(button);

    // draw "You won!" message
    var drawWinMessage = function() {
        var graphics = new PIXI.Graphics();
        graphics.interactive = true;
        graphics.buttonMode = true;
        graphics.beginFill(0x003333, 0.8);
        graphics.lineStyle(0, 0x003333, 0.8);
        graphics.drawRect(100, 100, 1020, 600);
        graphics.endFill();
        app.stage.addChild(graphics);

        var style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 180,
            fill: ['#ffff00'],
            wordWrap: true,
            wordWrapWidth: 1000
        });
        var winText = new PIXI.Text('YOU WON!', style);
        winText.anchor.set(0.5);
        winText.x = (app.renderer.width / 2) - 75;
        winText.y = app.renderer.height / 2;
        app.stage.addChild(winText);
        graphics.on('pointertap', dismissMessage);
        function dismissMessage() {
            graphics.clear();
            winText.destroy();
            releaseButton.call(button);
        }
    };

    // create 3 columns of symbols
    var firstStripe = new PIXI.Container();
    var secondStripe = new PIXI.Container();
    var thirdStripe = new PIXI.Container();
        //add 3 repeating symbols to the beginning for smooth rotation animation
    var extendedSymbolsArray = [];
    for (var i = 0; i < symbolsArray.length; i++) {
        extendedSymbolsArray.push(symbolsArray[i]);
    }
    for (i = 1; i <= 3; i++) {
        extendedSymbolsArray.unshift(symbolsArray[symbolsArray.length - i]);
    }
        //fill columns with symbols (3 + 6 symbols)
    function fillStripe(stripe, xCoord) {
        for (i = 0; i < extendedSymbolsArray.length; i++) {
            var item = PIXI.Sprite.fromImage(extendedSymbolsArray[i].path);
            item.y = -450 + (i * 250);
            stripe.addChild(item);
        }
        stripe.x = xCoord;
        app.stage.addChild(stripe);
    }

    fillStripe(firstStripe, 150);
    fillStripe(secondStripe, 500);
    fillStripe(thirdStripe, 850);

    //add horizontal line
    var line = new PIXI.Sprite.fromImage(elementsArray.line);
    line.y = 380;
    line.x = 100;
    line.width = 1020;
    app.stage.addChild(line);

    // play button event handler
    function rotate() {
        //animation and disabling play button
        button.texture = buttonDisabledTexture;
        decreaseMe.call(button);
        button.interactive = false;
        button.buttonMode = false;

        //call for results
        var combination = resultService.getResult();

        //animation of rotation for 3 stripes
        var rotator1 = setInterval(rotation, 100, firstStripe);
        var rotator2 = setInterval(rotation, 100, secondStripe);
        var rotator3 = setInterval(rotation, 100, thirdStripe);
        function rotation(stripe) {
            var rotationSpeed = 150;

            stripe.y += rotationSpeed;
            if (stripe.y > 500) {
                stripe.y = -900;
            }
        }

        function finishRotation(stripe, rotator, index) {
            stripe.y = combination[index];
            clearInterval(rotator);

            if (rotator === rotator3) {
                checkWinning(combination);
            }
        }

        setTimeout(finishRotation, 1000, firstStripe, rotator1, 0);
        setTimeout(finishRotation, 1500, secondStripe, rotator2, 1);
        setTimeout(finishRotation, 2000, thirdStripe, rotator3, 2);
    }

    // make play button active
    function releaseButton() {
        this.texture = buttonTexture;
        this.interactive = true;
        this.buttonMode = true;
    }

    function decreaseMe() {
        this.scale.x -= 0.1;
        this.scale.y -= 0.1;
    }

    //logic for win/loose scenario
    function checkWinning(combination) {
        setTimeout(function () {
            if (combination[0] == combination[1] && combination[0] == combination[2]) {
                drawWinMessage();
            } else {
                releaseButton.call(button);
            }
        }, 200);
    }
})();
