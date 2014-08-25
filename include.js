/*!
GitHub:    https://github.com/vitto/includejs
License:   MIT Licence
Version:   1.0.0
Date:      2014-08-25
Author:    Vittorio Vittori
Website:   http://vit.to
*/

var Include = (function () {

    "use strict";

    var useHandlebars = false;
    var elements = [];

    var getElements = function() {
        return document.getElementsByTagName("include");
    }

    var findElements = function() {
        elements = getElements();
        console.log("found " + elements.length + " element/s");
    }

    return {
        init : function() {
            console.log("document loaded");
            if (typeof Handlebars !== "undefined") {
                useHandlebars = true;
            } else {
                console.log("Warning: Handlebars is NOT loaded and will be not used to render HTML include elements");
            }
            findElements();
        },
        onLoad : function() {
            console.log("Notice: all incliude elements are loaded");
        }
    };
}());

document.addEventListener("DOMContentLoaded", function(){
    Include.init();
});
