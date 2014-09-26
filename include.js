/*!
GitHub:    https://github.com/vitto/includejs
License:   MIT Licence
Version:   1.1.0
Date:      2014-09-26
Author:    Vittorio Vittori
Website:   http://vit.to
*/

var Include = (function () {

    "use strict";

    var useMarkdown = false;
    var useHandlebars = false;
    var elements = [];
    var requests = [];

    var getElements = function() {
        return document.getElementsByTagName("include");
    };

    var findElements = function() {
        elements = getElements();
        requests = [];
        if (elements.length > 0) {
            loadElements();
        } else {
            Include.onLoad();
        }
    };

    var loadElements = function() {
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

        requests[i].client.open("GET", element.getAttribute("src"));

        requests[i].client.ext       = getExtension(element.getAttribute("src"));
        requests[i].client.element   = element;
        requests[i].client.id        = i;
        requests[i].client.onloadend = function(e) {
            var element, htmlString, extension;

            element    = e.currentTarget.element;
            extension  = e.currentTarget.ext;

            if (extension === "html" || extension === "htm") {
                htmlString = getCompiledHTML(e.currentTarget.responseText, element);
            } else if (extension === "md" || extension === "markdown") {
                htmlString = getCompiledMarkdown(e.currentTarget.responseText, element);
            }

            element.insertAdjacentHTML("beforeBegin", htmlString);
            element.parentNode.removeChild(element);

            requests[e.currentTarget.id].isLoaded = true;

            if (checkRequestsStatus()) {
                findElements();
            }
        };

        requests[i].client.send();
    };

    var checkRequestsStatus = function() {
        var i;
        for (i = 0; requests.length > i; i += 1) {
            if (!requests[i].isLoaded) {
                return false;
            }
        }
        return true;
    };

    var getExtension = function(filename) {
        return filename.substr(filename.lastIndexOf(".") + 1).toLowerCase();
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

    var getCompiledMarkdown = function(markdownString) {
        if (useMarkdown) {
            return marked(markdownString);
        } else {
            return markdownString;
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
            if (typeof Handlebars !== "undefined") {
                useHandlebars = true;
              //console.log("Notice: found Handlebars js library");
            } else {
                useHandlebars = false;
              //console.log("Warning: Handlebars is NOT loaded and will be not used to render HTML include elements");
            }
            if (typeof marked !== "undefined") {
                useMarkdown = true;
            } else {
                useMarkdown = false;
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
