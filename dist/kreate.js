/*!
 * Kreate.js
 * A tiny element creator plugin for jQuery. This plugin was inspired by the .create() method from the Zest.js library.
 * v0.0.1 (https://github.com/ItsJonQ/kreate)
 * Copyright 2014 Jon Q
 * Licensed under MIT (https://github.com/itsjonq/kreate/blob/master/LICENSE)
 */

/*!
 * Kreate.js
 * A tiny element creator plugin for jQuery.
 * v0.0.1 (https://github.com/ItsJonQ/kreate)
 * Copyright 2014 Jon Q
 * Licensed under MIT (https://github.com/itsjonq/kreate/blob/master/LICENSE)
 */

(function ($, undefined) { "use strict";

    // Return false if jQuery is not defined or valid
    if(!$ || typeof jQuery !== "function") {
        return false;
    }

    var kreate;

    // Defining kreate
    kreate = function(options) {

        var isString = typeof options === "string";
        var isObject = typeof options === "object";

        // Options must be defined
        // Options must be either a string or an object
        if( !options && !( isString || isObject ) ) {
            // Return and execute jQuery init
            return this(options);
        }

        /**
         * els
         * This is the array/collection were the generated HTML elements
         * will be pushed to.
         *
         * @type {Array}
         */
        var els = [];


        /**
         * Defining the settings
         * These are the default settings/options for the plugin
         */
        var settings;
        // Defining the default tagName
        var tag = "div";

        // Define the settins if the options is a string
        if(isString) {
            // If options contains spaces, <, >, =, or .
            if( options.indexOf(" ") >= 0 ||
                options.indexOf("<") >= 0 ||
                options.indexOf(">") >= 0 ||
                options.indexOf("=") >= 0 ||
                options.indexOf(".") >= 0 )
            {
                // Return and execute jQuery init
                return this(options);
            }
            // Update tag with options
            tag = options;
        }

        // Define the settings
        settings = $.extend({
            tagName: tag,
            id: "",
            content: "",
            class: "",
            length: 1,
            uniqueId: true,
            startId: 1,
            output: "jquery"
        }, options);

        // Ensure that the length is a number
        if(typeof settings.length !== "number") {
            // Set the length as 1 as default
            settings.length = 1;
        }

        // Convert the settings.output to lowercase
        settings.output = settings.output.toLowerCase();
        // Ensuring settings.output is set properly
        if( !(settings.output === "jquery" ||
            settings.output === "html") ) {
            settings.output = "jquery";
        }


        /**
         * Creating the Elements
         * Creating and pushing the elements to the els array to output
         * the jQuery object
         */
        // Defining the loop variables
        var i = 0;
        var len = settings.length;

        for( ; i < len; i++) {

            var el = document.createElement(settings.tagName);
            // Set the class
            if(settings.class) {
                el.class = settings.class;
            }
            // Set the ID
            if(settings.id) {
                if(len > 1 && settings.uniqueId) {
                    el.id = settings.id + "-" + (settings.startId + i);
                } else {
                    el.id = settings.id;
                }
            }
            // Adding the Content
            if(settings.content && typeof settings.content === "string") {
                // Setting the innerHTML of the el
                el.innerHTML = settings.content;
            }
            // Push it to els array
            els.push(el);
        }


        /**
         * Outputing jQuery Object
         * Returning the jQuery object with the generated elements
         */
        // Return jQuery object if els array has elements in it
        if(els.length > 0) {
            // Return the jQuery object with the newly created elements
            if(settings.output === "jquery") {
                return $(els);
            }

            if(settings.output === "html") {
                // Defining HTML
                var html = "";
                // Define loop variables
                i = 0;
                len = els.length;
                // Loop through els
                for( ; i < len; i++) {
                    // Add the outer HTML of the els to html string
                    html += els[i].outerHTML;
                }
                // Return the HTML
                return html;
            }

        } else {
            // Return jQuery
            return this;
        }

    };

    // Adding kreate to jQuery
    jQuery.kreate = kreate;

})(jQuery);