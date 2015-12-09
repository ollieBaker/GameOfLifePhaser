(function() {
    'use strict';

    function Preloader() {
        this.asset = null;
        this.ready = false;
    }

    Preloader.prototype = {
        preload: function() {
            this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
            this.load.setPreloadSprite(this.asset);

            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.loadResources('assets/');

            this.ready = true;
        },

        loadResources: function(directory) {
            // load your assets here
            this.game.load.atlas('shapes', directory + 'shapes.png', directory + 'shapes.json');
        },

        create: function() {

        },

        update: function() {
            if (!!this.ready) {
                this.game.state.start('menu');
            }
        },

        onLoadComplete: function() {
            this.ready = true;
        }
    };

    window['gameoflifephaser'] = window['gameoflifephaser'] || {};
    window['gameoflifephaser'].Preloader = Preloader;
}());
