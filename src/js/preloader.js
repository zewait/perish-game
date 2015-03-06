(function() {
    'use strict';

    function Preloader() {
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
            this.load.image('player', 'assets/player.png');
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
