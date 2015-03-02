(function() {
	'use strict';
	function End() {
		this.ns = window['hello-phaser'] || {};
		this.sound = null;
	}


	End.prototype = {
		create: function() {
			this.center = {x:this.game.width/2, y:this.game.height/2};
			var label = this.ns.win ? 'WIN' : 'LOSE';
			this.titleTxt = this.game.add.bitmapText(this.center.x, this.center.y, 'minecraftia', label, 22);
			this.titleTxt.align = 'center';
			this.titleTxt.x = this.center.x - this.titleTxt.width/2;
			this.input.onUp.add(this.onUp, this);
			this.sound = this.add.audio('happy');
			this.sound.play();
		},
		
		onUp: function() {
			this.game.state.start('menu');
		}
	};

	window['hello-phaser'] = window['hello-phaser'] || {};
	window['hello-phaser'].End = End;
})();
