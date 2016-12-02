'use strict';
var $ = require('jQuery');

$('header h1').html('Works');

var ScrollMagic = require('scrollmagic');
var controller = new ScrollMagic.Controller();

var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger1"
    })
    .setTween("header h1", 0.5, {
        backgroundColor: "green"  
    })

.addTo(controller);

//new ScrollMagic.Scene({
//    triggerElement: "#trigger1"
//})
//        .setClassToggle("header h1", "active") // add class toggle
//        .addTo(controller);