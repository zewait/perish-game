window.onload = function() {
    'use strict';

    var game, ns = window['hello-phaser'];
	ns.url = {
		leaderboard: 'assets/demo/data/leaderboard.json'
	};
	ns.setBg = function(state) {
		var bg = state.add.image(state.world.centerX, state.world.centerY, 'bg');
		bg.anchor.set(0.5);
		bg.smoothed = false;
		var scaleW = state.game.width/bg.width;
		var scaleH = state.game.height/bg.height;
		
		console.log(bg.width, bg.height);
		console.log(state.stage.width, state.stage.height);
		console.log(state.world.width, state.world.height);
		console.log(state.game.width, state.game.height);
		var scale = scaleW>scaleH ? scaleW:scaleH;
		console.log(scale);
		bg.scale.set(scale);
	};

    //game = new Phaser.Game(320, 480, Phaser.AUTO, 'hello-phaser-game');
    game = new Phaser.Game('100', '100', Phaser.AUTO, 'hello-phaser-game');
    game.state.add('boot', ns.Boot);
    game.state.add('preloader', ns.Preloader);
    game.state.add('menu', ns.Menu);
    game.state.add('game', ns.Game);
    game.state.add('game2', ns.Game2);
    game.state.add('end', ns.End);
    /* yo phaser:state new-state-files-put-here */

    game.state.start('boot');
};
