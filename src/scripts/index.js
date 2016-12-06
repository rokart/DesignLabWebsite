//'use strict';

//var $ = require('jQuery');
//window.jQuery = require("jquery");
//require("jquery-ui-browserify");
////require("easing-js");



//var ScrollMagic = require('scrollmagic');
//var controller = new ScrollMagic.Controller();
//
//var scene = new ScrollMagic.Scene({
//    triggerElement: "#trigger1"
//})
//        .setTween("header h1", 0.5, {
//            backgroundColor: "green"
//        })
//
//        .addTo(controller);


class animateMenu {
    constructor(options) {
        this.options = $.extend({}, animateMenu.defaults, options);
        this.Container = $(this.options.Container);
        this.whiteheader = this.Container.find('.whiteheader');
        this.navIcon = $(this.options.navIcon);
        this.click.call(this);
    }
    click() {
        this.navIcon.on('click', () => {
            this.navIcon.toggleClass('open');
            this.whiteheader.toggleClass('open');
        });
    }
}

//function animateMenu(options) {
//    this.options = $.extend({}, animateMenu.defaults, options);
//    this.Container = $(this.options.Container);
//    this.whiteheader = this.Container.find('.whiteheader');
//    this.navIcon = $(this.options.navIcon);
//    this.events.click.call(this);
//}
//animateMenu.prototype.events = {
//    click: function () {
//        this.navIcon.on('click', () => {
//            this.navIcon.toggleClass('open');
//            this.whiteheader.toggleClass('open');
//        });
//    }
//};
animateMenu.defaults = {
    Container: 'header',
    navIcon: '#nav-icon'
};
new animateMenu();

function getPageScroll() {
    var yScroll;
    if (document.documentElement && document.documentElement.scrollTop) {
        yScroll = document.documentElement.scrollTop;
    } else if (document.body) {
        yScroll = document.body.scrollTop;
    }
    return yScroll;
}

//home page first slide scroll animation
var pageheight = $(window).height();
$(window).on("load resize", function () {
    pageheight = $(this).height();
});
var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
var body = $('html, body');
$(window).bind(mousewheelevt, function (e) {
    var evt = window.event || e;
    evt = evt.originalEvent ? evt.originalEvent : evt;
    var delta = evt.detail ? evt.detail * (-40) : evt.wheelDelta;
    if (delta > 0 && getPageScroll() < pageheight + 120) {
        if (body.is(':animated')) {
            return false;
        } else {
            body.stop(true, false).animate({
                scrollTop: 0
            }, 600, "easeOutCubic");
        }
    } else if (getPageScroll() > -1 && getPageScroll() < pageheight) {
        if (body.is(':animated')) {
            return false;
        } else {
            body.stop(true, false).animate({
                scrollTop: pageheight
            }, 600, "easeOutCubic");
        }
    }
});
//home page down arrow click event and loop animation    
$(".white_down_arrow").on("click", function () {
    body.stop(true, false).animate({
        scrollTop: pageheight
    }, 600, "easeOutCubic");
});
(function loop() {
    $('.white_down_arrow').delay(500).fadeTo(1000, 0.2).fadeTo(1000, 1, loop);
})();