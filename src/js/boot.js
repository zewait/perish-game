(function() {
    'use strict';

    function Boot() {}

    Boot.prototype = {

        preload: function() {
            this.load.image('preloader', 'assets/preloader.gif');
        },

        create: function() {
            this.game.input.maxPointers = 1;
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

            if (this.game.device.desktop) {
                this.game.scale.pageAlignHorizontally = true;
            } else {
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
				if(this.world.height < 480) {
					this.game.scale.setGameSize(320, 480);
				}
                this.game.scale.minWidth = 320;
                this.game.scale.minHeight = 372;
                this.game.scale.maxWidth = 800;
                this.game.scale.maxHeight = 1024;
                this.game.scale.forceOrientation(true);
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.setScreenSize(true);
				console.log('aspectRatio', this.scale.aspectRatio);
            }
            this.game.state.start('preloader');
        }
    };

    window['hello-phaser'] = window['hello-phaser'] || {};
    window['hello-phaser'].Boot = Boot;

}());
