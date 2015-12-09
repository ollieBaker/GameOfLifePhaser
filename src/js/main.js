window.addEventListener('load', function() {
    'use strict';

    var ns = window['gameoflifephaser'];

    //get the small of the two dimensions use the full screen (ignore browser chrome)
    var h = window.screen.height < window.screen.width ? window.screen.height : window.screen.width;

    //use a height of 480 or less;
    var game = new Phaser.Game(640, h < 480 ? h : 480, Phaser.AUTO, 'gameoflifephaser-game');

    game.state.add('boot', ns.Boot);
    game.state.add('preloader', ns.Preloader);
    game.state.add('menu', ns.Menu);
    game.state.add('game', ns.Game);
    /* yo phaser:state new-state-files-put-here */
    game.state.start('boot');
}, false);
