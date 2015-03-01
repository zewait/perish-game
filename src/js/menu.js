(function() {
    'use strict';

    function Menu() {
        this.titleTxt = null;
        this.startTxt = null;
    }

    Menu.prototype = {

        create: function() {
            var x = this.game.width / 2,
                y = this.game.height / 2;


            this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'DOME GAME', 22);
            this.titleTxt.align = 'center';
            this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

            y = y + this.titleTxt.height + 5;
			this.createBy = this.add.bitmapText(x, y, 'minecraftia', 'BY {WAIT}', 20);
			this.createBy.align = 'center';
            this.createBy.x = this.game.width / 2 - this.createBy.textWidth / 2;
			
			
			y += this.createBy.height+5;
            this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'START', 22);
            this.startTxt.align = 'center';
            this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

            this.input.onDown.add(this.onDown, this);
			
			this.add.button(x, y);
        },

        update: function() {

        },

        onDown: function() {
            this.game.state.start('game');
        }
    };

    window['hello-phaser'] = window['hello-phaser'] || {};
    window['hello-phaser'].Menu = Menu;

}());
