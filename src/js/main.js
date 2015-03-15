window.onload = function() {
    'use strict';

    var game, ns = window['hello-phaser'];
	ns.score = 0;
	ns.url = {
		leaderboard: 'assets/demo/data/leaderboard.json'
	};

    //game = new Phaser.Game(320, 480, Phaser.AUTO, 'hello-phaser-game');
    game = new Phaser.Game('100', '100', Phaser.AUTO, 'hello-phaser-game');
    game.state.add('boot', ns.Boot);
    game.state.add('preloader', ns.Preloader);
    game.state.add('menu', ns.Menu);
    game.state.add('game', ns.Game);
    game.state.add('end', ns.End);
    /* yo phaser:state new-state-files-put-here */

    game.state.start('boot');
};
