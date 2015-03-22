(function() {
    'use strict';

    function Game() {
        this.ns = window['hello-phaser'] || {};

        this.timerLabel = null;
        this.scoreLabel = null;
        this.effectsSounds = null;

        this.centerPoint = {
            x: 0,
            y: 0
        };

    }

    Game.prototype = {

        TOTAL_FRUIT: 4,
        // scroll down 4 pixel per second speed
        SCROLL_Y_PER_SECOND: 4,
        // game total time(second)
        TOTAL_TIME: 30,
		SCORE_PER: 10,

        create: function() {
			this.ns.score = 0;
            this.scrollHeight = this.world.height;
            this.initSpriteNum = this.rnd.integerInRange(30, 50);
            this.ns.score = 0;
            this.beginSecond = this.time.totalElapsedSeconds();
			
            this.sprites = this.add.group();
			this.bombs = this.add.group();
            this.effects = this.add.group();

            for (var i = 0; i < this.initSpriteNum; ++i) {
                this.randomSprite();
            }

            this.timerLabel = this.add.bitmapText(this.game.width - 65, 0, 'minecraftia', this.TOTAL_TIME + 's', 22);
            this.scoreLabel = this.add.bitmapText(15, 0, 'minecraftia', 'score: ' + this.ns.score, 22);


            this.effectsSounds = this.add.audio('effect_sounds');
            this.effectsSounds.addMarker('ping', 10, 1.0);

            //this.add.tween(this.sprites).to({
            //    y: -this.scrollHeight + this.world.height
            //}, this.TOTAL_TIME * 1000, Phaser.Easing.Linear.None, true);

        },
        enableDebug: function() {

        },

        generateScale: function() {
            return this.rnd.integerInRange(8, 15) / 10;
        },

        randomAngle: function(sprite) {
            sprite.angle = this.rnd.angle();
        },

        randomSprite: function() {
            var sprite = null;
            if (this.rnd.between(0, 100) > 95) {
                sprite = this.bombs.create(this.rnd.integerInRange(20, this.game.width-20), this.rnd.integerInRange(20, this.scrollHeight-20), 'assemble', 'bomb.png');
                sprite.tag = 'bomb';
            } else {
                sprite = this.sprites.create(this.rnd.integerInRange(20, this.game.width-20), this.rnd.integerInRange(20, this.scrollHeight-20), 'assemble', 'fruit_0' + this.rnd.integerInRange(0, this.TOTAL_FRUIT - 1) + '.png');
                sprite.tag = 'fruit';
            }

			sprite.anchor.set(0.5);
            sprite.inputEnabled = true;
            sprite.events.onInputUp.add(this.spriteInputUp, this);
            sprite.events.onKilled.add(this.spriteKilled, this);

            var scale = this.generateScale();
            sprite.scale.set(scale);

            this.randomAngle(sprite);

            return sprite;
        },

        spriteInputUp: function(sprite) {
            sprite.kill();
        },

        spriteKilled: function(sprite) {
			var flag = 'bomb'==sprite.tag ? -1:1;
            this.effectsSounds.play('ping');
            this.ns.score += this.SCORE_PER*flag;
            var effectLabel = this.game.add.bitmapText(this.scoreLabel.x + this.scoreLabel.width - 10, this.scoreLabel.y, 'minecraftia', (-1===flag?'-':'+')+this.SCORE_PER, 22, this.effects);
            this.game.add.tween(effectLabel).to({
                fontSize: 48,
                alpha: 0,
                alive: false
            }, 1000).start().onComplete.addOnce(this.onEffectLabelOnComplete, this);

            var deaded = null;
            while ((deaded = this.sprites.getFirstDead())) {
                this.sprites.removeChild(deaded);
            }
        },

        onEffectLabelOnComplete: function(sprite) {
            this.effects.removeChild(sprite);
        },

        update: function() {},

        render: function() {
            this.scoreLabel.text = 'score: ' + this.ns.score;
            var elapsedSeconds = this.time.totalElapsedSeconds() - this.beginSecond;
            var remainSecondes = this.TOTAL_TIME - elapsedSeconds;
            if (remainSecondes <= 0 || !this.sprites.length) {
                this.game.state.start('menu');
            }
            this.timerLabel.text = (parseInt(remainSecondes)) + 's';
        }
    };
    window['hello-phaser'] = window['hello-phaser'] || {};
    window['hello-phaser'].Game = Game;
}());
