/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    events = require('events');

var RemoteResource = BObject.extend(/** @lends cocos.RemoteResource# */{
    /**
     * The URL to the remote resource
     * @type String
     */
    url: null,

    /**
     * The path used to reference the resource in the app
     * @type String
     */
    path: null,

    /**
     * @memberOf cocos
     * @extends BObject
     * @constructs
     */
    init: function (opts) {
        RemoteResource.superclass.init.call(this, opts);

        this.set('url', opts.url);
        this.set('path', opts.path);
        
    },

    /**
     * Load the remote resource via ajax
     */
    load: function () {
        var self = this;

        $.ajax({
            url: this.get('url'),
            success: function (data) {
                var path = self.get('path');
                
                var r = __remote_resources__[path];
                __resources__[path] = util.copy(r);
                __resources__[path].data = data;
                __resources__[path].meta.remote = true;

                events.trigger(self, 'load', self);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                events.trigger(self, 'fail', textStatus, errorThrown);
            }
        });
    }
});


exports.RemoteResource = RemoteResource;
