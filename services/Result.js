var resultService = {
    getResult: function () {
        return _getResult();
    }
};

var _getResult = function () {
    var result = [];
    for (var i = 0; i < 3; i++) {
        var randomNumber = parseInt(Math.random() * 125) * 10 - 750;

        if (randomNumber % 250 != 0) {
            if (randomNumber < 0) {
                randomNumber -= randomNumber % 250;
            } else {
                randomNumber += 250 - randomNumber % 250;
            }
        }

        result.push(randomNumber)
    }
    return result;
};