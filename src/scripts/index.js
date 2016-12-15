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
        this.arrow = $(this.options.arrow);
        this.body = $('html, body');
        this.main = this.body;
        this.window = $(window);
        this.pageheight = this.window.height();
        this.mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
        this.loadresize.call(this);
        this.click.call(this);
    }
    loadresize() {
        this.window.on("load resize", () => {
            this.pageheight = this.window.height();
            this.animatepage.call(this);
            this.scaleVideo.call(this);
        });
    }
    scaleVideo() {
        var $video = $('#full-video'),
                $videoWrapper = $video.parent();
        var isWider = ($video.width() > $videoWrapper.width()) ? true : false,
                isTaller = ($video.height() > this.pageheight) ? true : false,
                widthDifference = $video.width() - $videoWrapper.width(),
                heightDifference = $video.height() - $videoWrapper.height();
        (isWider) ? $video.css('left', -parseInt(widthDifference / 2)) : $video.css('left', '0');
        (isTaller) ? $video.css('top', -parseInt(heightDifference / 2)) : $video.css('top', '0');
    }
    click() {
        this.navIcon.on('click', () => {
            this.openMenu.call(this);
        });
        this.arrow.on("click", () => {
            this.body.stop(true, false).animate({
                scrollTop: this.pageheight - 120
            }, 600, "easeOutCubic");
            if (!this.navIcon.hasClass('open')) {
                this.openMenu.call(this);
            }
        });
    }
    openMenu() {
        this.navIcon.toggleClass('open');
        this.whiteheader.toggleClass('open');
    }

    animatepage() {
        this.window.bind(this.mousewheelevt, (e) => {
            var evt = this.window.event || e;
            evt = evt.originalEvent ? evt.originalEvent : evt;
            const delta = evt.detail ? evt.detail * (-40) : evt.wheelDelta;
            if (delta > 0 && getPageScroll() < this.pageheight + 120) {
                if (this.body.is(':animated')) {
                    return false;
                } else {
                    if (this.main.hasClass('homepage')) {
                        if (this.navIcon.hasClass('open')) {
                            this.openMenu.call(this);
                        }
                        this.body.stop(true, false).animate({
                            scrollTop: 0
                        }, 600, "easeOutCubic");
                    }
                }
            } else if (getPageScroll() > -1 && getPageScroll() < this.pageheight - 120) {
                if (this.body.is(':animated')) {
                    return false;
                } else {
                    if (!this.navIcon.hasClass('open')) {
                        this.openMenu.call(this);
                    }
                    if (this.main.hasClass('homepage')) {
                        this.body.stop(true, false).animate({
                            scrollTop: this.pageheight - 120
                        }, 600, "easeOutCubic");
                    }
                }
            }
            if (!this.main.hasClass('homepage')) {
                if (getPageScroll() === 0) {
                    if (this.navIcon.hasClass('open')) {
                        this.openMenu.call(this);
                    }
                }
            }
        });
    }
}
animateMenu.defaults = {
    Container: 'header',
    navIcon: '#nav-icon',
    arrow: '.white_down_arrow'
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


(function loop() {
    $('.white_down_arrow').delay(500).fadeTo(1000, 0.2).fadeTo(1000, 1, loop);
})();

class person {
    constructor(options) {
        this.wrap = options.wrap;
        this.items = this.wrap.find('.teamitem');

        this.click.call(this);
    }
    animate() {
        this.items.each(function () {
            console.log(this)
        });
    }
    click() {
        this.items.on('click', function () {
            var tl = new TimelineLite();
            var windowwidth = $(window).width() / 2;
            var windowheight = $(window).height() / 2;
            var itemleftpos = $(this).offset();

            var left = windowwidth - (itemleftpos.left) - 87.5;
            var right = windowheight - itemleftpos.top - 87.5 + getPageScroll();
            var item = $(this);

            tl.from(item, 0.4, {autoAlpha: 0, ease: Back.easeOut})
                    .set(item, {css: {zIndex: 100}})
                    .to(item, 0.4, {x: left, y: right, ease: Back.easeInOut, onComplete: togleclass})
                    .set(item, {className: "+=show-details"})
                    .to(item.find('.hiddenbubble'), 0.6, {scale: 20, ease: Back.easeOut})

//            TweenMax.staggerTo($(this), 2, {scale: 1.1, delay: 0.1, ease: Elastic.easeOut, force3D: true}, 0.2);

            function togleclass() {
//                item.toggleClass('show-details');              
            }

        });

    }
}

// init Isotope
var $grid = $('.grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows'
});


// layout Isotope after each image loads
$grid.imagesLoaded().progress(function () {
    $grid.isotope('layout');
});

// bind filter button click
$('.filters-button-group').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({filter: filterValue});
});

// change is-checked class on buttons
$('.button-group').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
});


//var style = {
//    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
//    transform: `translate3d(0, ${y}px, 0) scale(${scale})`
//};
