document.write('<link rel="stylesheet" href="css/font-awesome.min.css">');
document.write('<link rel="stylesheet" href="css/common.css">');
document.write('<link rel="stylesheet" href="css/touchswipe.css">');
document.write('<link rel="stylesheet" href="css/icheck/red.css">');
document.write('<link rel="stylesheet" href="css/universe.css">');

if (MOBILE) {
    document.write('<link rel="stylesheet" href="css/css.css">');
    WIDTH = $(window).width(),
        HEIGHT = $(window).height();
}
else {
    document.write('<link rel="stylesheet" href="css/css_pc.css">');
    WIDTH = 640,
        HEIGHT = $(window).height();
    document.write('<style> .main{min-height:' + HEIGHT + 'px} </style>');
}

seajs.config({
    base: "./js/",
    alias: {
        "jquery": "jquery.min.js",
        "fastclick": "fastclick.js",
        "imagesloaded": "imagesloaded.pkgd.js",
        "wookmark": "jquery_wookmark_min.js",
        "template": "template.js",
        "layer": "layer.m.js",
        "icheck": "icheck.min.js",
        "pingpp": "pingpp_pay.js"
    }
});
seajs.use('fastclick', function () {
    FastClick.attach(document.body);
});
