(function() {
    'use strict';

    function Game() {
        this.ns = window['hello-phaser'] || {};
        this.ns.score = 0;
        this.ns.win = false;
        this.beginSecond = 0;

        this.sprites = [];
        this.timerLabel = null;
        this.scoreLabel = null;
        this.effectsSounds = null;

		
        this.centerPoint = {
            x: 0,
            y: 0
        };

    }
	
    Game.prototype = {

        INIT_SPRITES: 10 + parseInt(Math.random() * 10),

        // game total time(second)
        TOTAL_TIME: 30,

        create: function() {
            this.ns.score = 0;
            this.ns.win = false;
            this.beginSecond = 0;
            this.sprites = [];

            this.beginSecond = this.time.totalElapsedSeconds();
            var x = this.game.width / 2,
                y = this.game.height / 2;
            var centerPoint = {
                x: x,
                y: y
            };
            this.centerPoint = centerPoint;

            for (var i = 0; i < this.INIT_SPRITES; ++i) {
                this.sprites.push(this.randomSprite());
            }

            this.timerLabel = this.add.bitmapText(this.game.width - 65, 0, 'minecraftia', this.TOTAL_TIME + 's', 22);
            this.scoreLabel = this.add.bitmapText(0, 0, 'minecraftia', 'score: ' + this.ns.score, 22);


            this.effectsSounds = this.add.audio('effect_sounds');
            this.effectsSounds.addMarker('ping', 10, 1.0);
        },
        enableDebug: function() {

        },

        generateScale: function() {
            return Math.random() + 0.1;
        },

        randomAngle: function(sprite) {
            var x = sprite.width / 2 + Math.random() * (this.game.width - sprite.width),
                y = sprite.width / 2 + Math.random() * (this.game.height - sprite.height);
            var angle = this.math.angleBetween(this.centerPoint.x, this.centerPoint.y, x, y);
            sprite.angle = angle * (180 / Math.PI);
        },

        randomPostion: function(sprite) {
            var x = this.game.width - sprite.width,
                y = this.game.height - sprite.height;
            sprite.reset(Math.random() * x, Math.random() * y);
        },

        randomSprite: function() {
            var sprite = this.add.sprite(0, 0, 'player');
            sprite.anchor.setTo(0.5, 0.5);
            sprite.inputEnabled = true;
            sprite.events.onInputUp.add(this.spriteInputUp, this);
            sprite.events.onKilled.add(this.spriteKilled, this);

            var scale = this.generateScale();
            sprite.scale.set(scale, scale);

            this.randomAngle(sprite);

            this.randomPostion(sprite);


            return sprite;
        },

        spriteInputUp: function(sprite) {
            sprite.kill();
            for (var i = 0; i < this.sprites.length; i++) {
                if (!this.sprites[i].alive) {
                    this.sprites.splice(i, 1);
                    break;
                }
            }
            console.log('sprites: ', this.sprites.length);
            if (this.sprites.length <= 0) {
                this.ns.win = true;
                this.game.state.start('end');
            }
        },

        spriteKilled: function() {
            this.effectsSounds.play('ping');
            this.ns.score += 5;
            console.log(this.ns.score);
            var effectLabel = this.game.add.bitmapText(this.scoreLabel.x + this.scoreLabel.width - 10, this.scoreLabel.y, 'minecraftia', '+5', 22);
            console.dir(effectLabel);
            this.game.add.tween(effectLabel).to({
                fontSize: 48,
                alpha: 0
            }, 1000).start();
        },

        update: function() {},

        render: function() {
            this.scoreLabel.text = 'score: ' + this.ns.score;
            var elapsedSeconds = this.time.totalElapsedSeconds() - this.beginSecond;
            var remainSecondes = this.TOTAL_TIME - elapsedSeconds;
            if (remainSecondes <= 0) {
                this.game.state.start('end');
            }
            this.timerLabel.text = (parseInt(remainSecondes)) + 's';
        },
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
