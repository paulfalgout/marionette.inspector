// Script loaded every time the devtools are started, the first time the panel is opened.

require.config({
    // paths configuration
    paths: {
        templates: '../../templates',

        jquery: '../lib/jquery',
        underscore: '../lib/underscore',
        backbone: '../lib/backbone',
        radio: '../lib/backbone.radio',
        marionette: '../lib/backbone.marionette',
        text: '../lib/text',
        bootstrap: '../lib/bootstrap.min',
        handlebars: '../lib/handlebars',
        'jquery.treegrid': '../lib/jquery.treegrid',
        logger: '../common/util/Logger'
    },
    // non-amd library loaders
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            init: function () {
                // exports
                return this.Backbone.noConflict();
            }
        },
        "jquery.treegrid": {
            deps: ["jquery"],
            exports: "jQuery.fn.treegrid",
        },
        // 'marionette': {
        //     deps: ['underscore', 'jquery'],
        //     init: function () {
        //         // exports
        //         console.log('require', this);
        //
        //         return this.Backbone.noConflict();
        //     }
        // },
        'bootstrap': {
            deps: ['jquery']
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

require([
  "jquery",
  "jquery.treegrid",
  "handlebars",
  "marionette",
  "logger",
  "app",
  "app/modules/Radio",
  "app/modules/UI",
  "app/modules/Data",
  "app/modules/Activity",
  "text!templates/devTools/partials/_property.html"
], function(
    $, treeGrid, Handlebars, Marionette,
    logger, App, RadioApp, UIApp, DataApp, ActivityApp,
    _property) {

    Marionette.Renderer.render = function(template, data, view) {
      return Handlebars.compile(template)(data);
    };

    $(document).ready(function() {
        // var router = new Router();
        // Backbone.history.start();

        Handlebars.registerPartial('templates/devTools/partials/_property.html', _property);

        window.app = new App();
        app.start();

        app.module('Data', DataApp);
        app.module('Radio', RadioApp);
        app.module('UI', UIApp);
        app.module('Activity', ActivityApp);
    });

    logger.log('devtools', 'started!')
});
