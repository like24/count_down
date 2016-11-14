function lazyloading(options) {
    var id = options.Id ? document.getElementById(options.Id) : document;
    if (id === null) return;
    var imgall = id.getElementsByTagName("img"),
        dataimg = [];
    //用for循环便利出所有含有data的img
    for (var i = 0; i < imgall.length; i++) {
        console.log(imgall[i].offsetTop)
        _imgall = imgall[i];
        if (_imgall.getAttribute("data-src") !== null) {
            if (isload(_imgall)) {
                setsrc(_imgall);
            } else {
                dataimg.push(_imgall)
            }
        }
    }


    function setsrc(ele) {

        ele.src = ele.getAttribute("data-src");
    }

    function isload(ele) {
        var scrtop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset,
            //edit = ~~ele.getAttribute("data-range") || options.Range,
            scrHeight = document.documentElement.clientHeight + scrtop;
        offtop = ele.offsetTop;
        return (scrHeight > offtop);
        console.log(scrHeight > offtop)
    }

    function handler() {
        for (var i = 0; i < dataimg.length; i++) {
            _dataimg = dataimg[i];
            if (isload(_dataimg)) {
                _setsrc(_dataimg);
                dataimg.splice(i, 1);
                if (dataimg.length === 0) {
                    unadd();
                }
            }
        }
    }

    function _setsrc(ele) {
        options.Time ? setTimeout(function () {
            setsrc(ele)
        }, options.Time) : setsrc(ele);
    }

    function unadd() {
        window.removeEventListener ? window.removeEventListener("scroll", handler, false) : window.detachEvent("onscroll", handler);
    }
    /*   window.addEventListener ? window.addEventListener("scroll", handler, false) : window.attachEvent("onscroll", handler);*/
    window.handler = handler;
}