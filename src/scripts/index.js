//'use strict';

jQuery(document).ready(function ($) {
    new animateMenu();
});
$(window).on("load scroll resize", function () {

});
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
//            this.scaleVideo.call(this);
        });
    }
    scaleVideo() {

//        var $video = $('#full-video'),
//                $videoWrapper = $video.parent();
//        var isWider = ($video.width() > $videoWrapper.width()) ? true : false,
//                isTaller = ($video.height() > this.pageheight) ? true : false,
//                
//                widthDifference = $video.width() - $videoWrapper.width(),
//                heightDifference = $video.height() - $videoWrapper.height();
//        
//        (isWider) ? $video.css('left', -parseInt(widthDifference / 2)) : $video.css('left', '0');
//        (isTaller) ? $video.css('top', -parseInt(heightDifference / 2)) : $video.css('top', '0');
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
        this.wrap = $(options);
        this.items = this.wrap.find('.bubble');
        this.window = $(window);
        this.curentitem;
        this.loadresize.call(this);
        this.click.call(this);
    }

    loadresize() {
        this.window.on("load resize scroll", () => {

        });
    }
    click() {
        this.items.on('click', (event) => {
            this.curentitem = $(event.currentTarget);
            this.animate();
            $(event.currentTarget).toggleClass('active');
        });
    }
    animate() {
        let tl = new TimelineLite();
        let windowwidth = this.window.width() / 2;
        let windowheight = this.window.height() / 2;
        let itempos = this.curentitem.offset();

        let left = windowwidth - (itempos.left) - 87.5;
        let top = (this.curentitem.hasClass('active')) ? 0 : windowheight - itempos.top - 87.5 + getPageScroll();

        tl.from(this.curentitem, 0.4, {autoAlpha: 0, ease: Back.easeOut})
                .set(this.curentitem, {css: {zIndex: 100}})
                .to(this.curentitem, 0.4, {x: left, y: top, ease: Back.easeInOut, onComplete: togleclass})
                //.set(this.curentitem, {className: "+=show-details"})

                .to(this.wrap.find('.hiddenbubble'), 0.6, {scale: 20, ease: Back.easeOut})

//            TweenMax.staggerTo($(this), 2, {scale: 1.1, delay: 0.1, ease: Elastic.easeOut, force3D: true}, 0.2);

        function togleclass() {
            $('.hiddenbubble').toggleClass()
//                item.toggleClass('show-details');              
        }
    }
}
new person(".team");
// init Isotope
var $grid = $('.grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress(function () {
    $grid.isotope('layout');
});
//// bind filter button click
//$('.filterbutton').on('click', function () {
//    var filterValue = $(this).attr('data-filter');
//    $grid.isotope({filter: filterValue});
//});



var filters = {};
$('.filters').on('click', 'button', function () {
    var $this = $(this);
    var $buttonGroup = $this.parents('.button-group');
    var filterGroup = $buttonGroup.attr('data-filter-group');
    filters[ filterGroup ] = $this.attr('data-filter');
    var filterValue = concatValues(filters);
    $grid.isotope({filter: filterValue});
});
function concatValues(obj) {
    var value = '';
    for (var prop in obj) {
        value += obj[ prop ];
    }
    return value;
}


// change is-checked class on buttons
$('.button-group').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
});
var integer = window.location.hash.match(/\d+/) | 0;


$('.productsAudiowrap').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var curentslide = $(this).find('.slideritem').eq(currentSlide);
    curentslide.find("video").each(function () {
        this.pause();
    });
//    console.log(curentslide);
});
$('.servisesslider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $(this).find("video").each(function () {
        this.pause();
    });
});

var aavideos = $("video");
aavideos.on('playing', function (e) {
    aavideos.not(this).each(function () {
        this.pause();
    });
});

$('.productsAudiowrap').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    lazyLoad: 'ondemand'
});

$('.productswrap').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    lazyLoad: 'ondemand'
});

$('.productcategories').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    autoplay: true
});

$('.servisesslider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    autoplay: false,
    arrows: false
});
setTimeout(function () {
    $('.productswrap, .productsAudiowrap').slick('slickGoTo', integer, true);
}, 1000);
//var style = {
//    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
//    transform: `translate3d(0, ${y}px, 0) scale(${scale})`
//};

var videoimg = $(".playbut");
var lightbox = $(".lightbox, .vidclose");
var videomainwrap = $(".videomainwrap");
var slidevideo = $('.videowrap');
var obj = {
    doIt: function () {
        var videowrap = $(this).find(videomainwrap);
        var light = $(this).find(lightbox);
        var videoplay = $(this).find("video").get(0);
        if (slidevideo.is(':animated')) {
        } else {
            slidevideo.animate({'margin-top': 100}, 600, "easeOutBack");
            videowrap.show();
            light.fadeIn(800);
            videoplay.play();
        }
    }
};
videoimg.click(function () {
    var myvar = $(this).parents('.playvid');
    obj.doIt.call(myvar);
});
//close video popup
lightbox.click(function () {
    videomainwrap.fadeOut(700);
    lightbox.fadeOut(700);
    slidevideo.animate({'margin-top': -300}, 600, "easeInBack");
    myVideostop();
});
function myVideostop() {
    setTimeout(function () {
        $("video").each(function () {
            this.pause();
        });
    }, 100);
}


$(function () {
    $(document).tooltip();

});

$('.teamitem').tooltip({
    tooltipClass: "tooltip",
    track: true
});