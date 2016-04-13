/**
 * validPic.js v.0.0.1 (Alpha) -
 * https://github.com/alvarotrigo/validPic.js
 *
 * Copyright (C) 2013 alvarotrigo.com - A project by Alvaro Trigo
 */
(function( root, window, document, factory, undefined ) {
    if( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define( function() {
            root.validpic = factory(window, document);
            return root.validpic;
        } );
    } else if( typeof exports === 'object' ) {
        // Node. Does not work with strict CommonJS.
        module.exports = factory(window, document);
    } else {
        // Browser globals.
        root.validpic = factory(window, document);
    }
}(this, window, document, function(window, document, undefined){
    'use strict';

    var ERROR_MESSAGE = 'Please upload a valid image file';

    (function () {
        if(typeof window.CustomEvent === "function") return false;

        function CustomEvent(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
    })();


    function validPic(){
        var self = this;
        var allowedFormats = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];

        self.currentFile = null;
        self.currentInput = null;
        self.base64 = null;

        self.init = function(){
            var inputs = document.querySelectorAll('.valid-pic');

            if(inputs){
                [].forEach.call(inputs, function(input){
                    input.onchange = function(){
                        self.currentFile = input.files[0];
                        self.currentInput = input;

                        if(self.validExtension() && self.validMimeType()){
                            self.checkRealMimeType();
                        }
                        else{
                            self.triggerError();
                        }
                    };

                    //reseting the value in case they choose the same file later on
                    input.onclick = function(){
                        this.value = null;
                    };
                });
            }
        };

        // -1st check: valid extension ?
        self.validExtension = function(){
            //using a regular expression to trim everything before final dot (image.gif.php returns php)
            var extension = self.currentFile.name.replace(/^.*\./, '');

            //no dot at all?  extension == filename
            extension = (extension == self.currentFile.name) ? '' : extension.toLowerCase();

            return allowedFormats.indexOf(extension) > -1;
        };

        //-2nd echeck: validating mime type (can be foolet, so this is just a quick check )
        self.validMimeType = function(){
            return self.currentFile.type.match('image.*') && allowedFormats.indexOf(self.currentFile.type.split("/")[1]) > -1;
        };

        //reads the image and validates real mime type   http://stackoverflow.com/a/29672957/1081396
        // magic numbers: http://www.garykessler.net/library/file_sigs.html
        self.checkRealMimeType = function(){
            var reader = new FileReader();
            var readerBase64 = new FileReader();

            reader.readAsArrayBuffer(self.currentFile);

            //running asynchronously!
            reader.onloadend = function(event) {
                var realMimeType = self.getRealMimeType(reader.result);

                if(realMimeType !== 'unknown'){
                    readerBase64.readAsDataURL(self.currentFile);
                }else{
                    self.triggerError();
                }
            };

            readerBase64.onloadend = function(){
                self.base64 = this.result;
                self.triggerValid();
            };

        };

        self.getRealMimeType = function(result){
            var arr = (new Uint8Array(result)).subarray(0, 4);
            var header = '';
            var event;
            var realMimeType;

            for(var i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }

            //magic numbers
            switch (header) {
                case "89504e47":
                    realMimeType = "image/png";
                    break;
                case "47494638":
                    realMimeType = "image/gif";
                    break;
                case "ffd8ffDB":
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8":
                    realMimeType = "image/jpeg";
                    break;
                default:
                    realMimeType = "unknown"; // Or you can use the blob.type as fallback
                    break;
            }
            return realMimeType;
        };

        //error custom event
        self.triggerError = function(){
            // create and dispatch the event
            var event = new CustomEvent('error', {
                detail: {
                    file: self.currentFile,
                    input: self.currentInput,
                    error: ERROR_MESSAGE
                },
                bubbles: true,
                cancelable: true
            });

            self.currentInput.dispatchEvent(event);
        };

        //success custom event
        self.triggerValid = function(){
            // create and dispatch the event
            event = new CustomEvent('success', {
                detail: {
                    file: self.currentFile,
                    input: self.currentInput,
                    base64: self.base64
                },
                bubbles: true,
                cancelable: true
            });

            self.currentInput.dispatchEvent(event);
        };

        return self;
    }

    //document ready?
    document.addEventListener('DOMContentLoaded',function(){
        new validPic().init();
     }, false);
}));