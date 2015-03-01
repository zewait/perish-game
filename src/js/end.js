(function() {
	'use strict';
	function End() {}

	End.prototype = {
		create: function() {
			this.center = {x:this.game.width/2, y:this.game.height/2};
			this.titleTxt = this.game.add.bitmapText(this.center.x, this.center.y, 'minecraftia', 'WIN', 22);
			this.titleTxt.align = 'center';
			this.titleTxt.x = this.center.x - this.titleTxt.width/2;
			this.input.onUp.add(this.onUp, this);
		},
		
		onUp: function() {
			this.game.state.start('menu');
		}
	};

	window['hello-phaser'] = window['hello-phaser'] || {};
	window['hello-phaser'].End = End;
})();
