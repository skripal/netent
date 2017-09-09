var imageService = {
    getImages: function (url) {
        return _getImages(url);
    }
};

var _getImages = function (url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        return ( xhr.responseText );
    }
};