(function() {
	'use strict';

    function Game() {
		this.sprites = [];
		this.centerPoint = {x:0, y:0};
    }

    Game.prototype = {

		INIT_SPRITES: 10+parseInt(Math.random()*40),

        create: function() {
            var x = this.game.width / 2,
                y = this.game.height / 2;
			var centerPoint = {x:x, y:y};
			this.centerPoint = centerPoint;

			for(var i=0; i<this.INIT_SPRITES; ++i) {
				this.sprites.push(this.randomSprite());
			}
        },

		generateScale: function() {
			return Math.random() + 0.1;
		},

		generateAngle: function() {
			var x = Math.random()*this.game.width,
				y = Math.random()*this.game.height;
			return Math.atan2(this.centerPoint.x-x, this.centerPoint.y-y) * (180/Math.PI);
		},

		randomPostion: function(sprite) {
			sprite.anchor.setTo(0,0);
			var x = this.game.width-sprite.width,
				y = this.game.height-sprite.height;
			sprite.reset(Math.random()*x, Math.random()*y);
		},

		randomSprite: function() {
			var sprite = this.add.sprite(0, 0, 'player');
			sprite.inputEnabled = true;
			sprite.events.onInputUp.add(this.spriteInputUp, this);
			sprite.events.onKilled.add(this.spriteKilled, this);

			var scale = this.generateScale();
			sprite.scale.set(scale, scale);

			sprite.anchor.setTo(0.5, 0.5);
			sprite.angle = this.generateAngle();

			this.randomPostion(sprite);
			

			return sprite;
		},

        spriteInputUp: function(sprite) {
			sprite.kill();
			for(var i=0; i<this.sprites.length; i++) {
				if(!this.sprites[i].alive) {
					this.sprites.splice(i, 1);
					break;
				}
			}
			console.log('sprites: ', this.sprites.length);
			if(this.sprites.length <= 0) {
				this.game.state.start('end');
			}
        },

		spriteKilled: function(sprite) {
			console.dir(sprite);
			var p = sprite.world;
			console.dir(p);
			
			var txt = this.game.add.bitmapText(this.centerPoint.x, this.centerPoint.y, 'minecraftia', '+5');
			txt.fontSize = 32;
			txt.fill = '#ffffff';
			txt.font = 'minecraftia';
			txt.align = 'center';
			this.game.add.tween(txt).to({fontSize: 64, alpha: 0}, 1000).start();
			console.dir(txt);
		},
		
        update: function() {},

       // update: function() {
       //     var x, y, cx, cy, dx, dy, angle, scale;

       //     x = this.input.position.x;
       //     y = this.input.position.y;
       //     cx = this.world.centerX;
       //     cy = this.world.centerY;

       //     angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
       //     this.player.angle = angle;

       //     dx = x - cx;
       //     dy = y - cy;
       //     scale = Math.sqrt(dx * dx + dy * dy) / 100;

       //     this.player.scale.x = scale * 0.6;
       //     this.player.scale.y = scale * 0.6;
       // },

        onInputDown: function() {
            this.game.state.start('menu');
        }

    };

    window['hello-phaser'] = window['hello-phaser'] || {};
    window['hello-phaser'].Game = Game;

}());
