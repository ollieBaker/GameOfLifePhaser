(function() {
    'use strict';

    function Menu() {}

    Menu.prototype = {
        create: function() {
            this.titleTxt = this.add.text(this.game.width * 0.5, this.game.height * 0.5,
                'This is an implementation of\nConway\'s Game of Life \n using JavaScript and Phaser', {
                    font: '32px Arial',
                    fill: '#ffffff',
                    align: 'center'
                });
            this.titleTxt.anchor.set(0.5);
            this.input.onDown.add(this.onDown, this);
        },

        update: function() {

        },

        onDown: function() {
            this.game.add.tween(this.titleTxt).to({
                alpha: 0
            }, 700, Phaser.Easing.Linear.None, true).onComplete.addOnce(function() {
                this.game.state.start('game')
            }, this);

        }
    };

    window['gameoflifephaser'] = window['gameoflifephaser'] || {};
    window['gameoflifephaser'].Menu = Menu;
}());
