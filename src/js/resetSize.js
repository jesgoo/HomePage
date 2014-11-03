(function () {
    var html = document.documentElement;
    var field = 'currentFontSize';
    var setFontSize = function () {
        var w = html.clientWidth;
        var h = html.clientHeight;
        var baseSize = 12;
        //var baseScale = 1.15;
        var baseScale = 1;
        var baseWidth = 1700;
        var scale = w / baseWidth / baseScale;
        var fontSize = scale * baseSize;
        fontSize = fontSize < baseSize ? baseSize : fontSize;
        if (fontSize === html[field]) {
            return false;
        }
        html.style.fontSize = fontSize + 'px';
        html[field] = fontSize;
    };
    window.addEventListener('resize', setFontSize);
    setFontSize();
})();
