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
    var requests = [];

    var getElements = function() {
        return document.getElementsByTagName("include");
    };

    var findElements = function() {
        elements = getElements();
        requests = [];
      //console.log("Notice: found " + elements.length + " element/s");
        if (elements.length > 0) {
            loadElements();
        } else {
            Include.onLoad();
        }
    };

    var loadElements = function() {
      //console.log("Notice: started load elements...");
        var i;
        for (i = 0; elements.length > i; i += 1) {
            appendRequest(elements[i], i);
        }
    };

    var appendRequest = function(element, i) {
        requests[i] = {
            client   : new XMLHttpRequest(),
            isLoaded : false
        };

      //console.log(element.parentNode);

        requests[i].client.open("GET", element.getAttribute("src"));

        requests[i].client.element   = element;
        requests[i].client.id        = i;
        requests[i].client.onloadend = function(e) {
            var element, htmlString;

            element    = e.currentTarget.element;

            htmlString = getCompiledHTML(e.currentTarget.responseText, element);

            element.insertAdjacentHTML("beforeBegin", htmlString);
            element.parentNode.removeChild(element);

            requests[e.currentTarget.id].isLoaded = true;

            if (checkRequestsStatus()) {
                findElements();
            }
        };

        requests[i].client.send();
      //console.log(requests[i].client);
    };

    var checkRequestsStatus = function() {
      //console.log("Notice: checking if all elemnts are loaded");
        var i;
        for (i = 0; requests.length > i; i += 1) {
            if (!requests[i].isLoaded) {
                return false;
            }
        }
        return true;
    };

    var getCompiledHTML = function(htmlString, element) {
        var template, textContent;
        textContent = element.textContent.trim();
        if (textContent.length > 0 && useHandlebars) {
            template = Handlebars.compile(htmlString);
            return template(getJSON(textContent));
        } else {
            return htmlString;
        }
    };

    var getJSON = function(textContent) {
        try {
            var jsonData = eval("(" + textContent + ")");
            if (jsonData.constructor === {}.constructor) {
                return jsonData;
            } else {
                console.log("Warning: the constructor is not an Object. Empty object will be returned.");
                return {};
            }
        } catch (e) {
            console.log("Warning: syntax error encountered. Empty object will be returned.");
            return {};
        }
    };

    return {
        init : function() {
          //console.log("Notice: document loaded");
            if (typeof Handlebars !== "undefined") {
                useHandlebars = true;
              //console.log("Notice: found Handlebars js library");
            } else {
                useHandlebars = false;
              //console.log("Warning: Handlebars is NOT loaded and will be not used to render HTML include elements");
            }
            findElements();
        },
        onLoad : function() {
          //console.log("Notice: all incliude elements are loaded");
        }
    };
}());

document.addEventListener("DOMContentLoaded", function(){
    "use strict";
    Include.init();
});
