(function() {
    'use strict';

    function Preloader() {
        this.ns = window['hello-phaser'] || {};
        this.asset = null;
        this.ready = false;
    }
	

    Preloader.prototype = {

        preload: function() {
            this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');

            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.load.setPreloadSprite(this.asset);

            this.loadResources();
        },

        loadResources: function() {
			this.load.json('leaderboard.json', this.ns.url.leaderboard, true);
			//this.load.spritesheet('giphy', 'assets/giphy_4x1.png', 22, 33, 4);
			this.load.image('bg', 'assets/bg.jpg');
			this.load.spritesheet('nyan_cat', 'assets/nyan_cat_3x4.png', 272, 168);
			this.load.spritesheet('nyan_cat_cool', 'assets/nyan_cat_cool_3x4.png', 258, 159);
			this.load.atlas('assemble', 'assets/assemble.png', 'assets/assemble.json');

            this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
			this.load.audio('bgm', ['assets/bgm.mp3', 'assets/bgm.ogg']);
			this.load.audio('effect_sounds', ['assets/fx_mixdown.mp3', 'assets/fx_mixdown.ogg']);
			this.load.audio('happy', ['assets/happy.mp3', 'assets/happy.ogg']);

        },

        create: function() {
            this.asset.cropEnabled = false;
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

    window['hello-phaser'] = window['hello-phaser'] || {};
    window['hello-phaser'].Preloader = Preloader;

}());
