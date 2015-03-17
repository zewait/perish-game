(function() {
    'use strict';

    function Game() {
        this.ns = window['hello-phaser'] || {};

        this.timerLabel = null;
        this.scoreLabel = null;
        this.effectsSounds = null;
        this.level = 0;

        this.centerPoint = {
            x: 0,
            y: 0
        };

    }

    Game.prototype = {

        // game total time(second)
        TOTAL_TIME: 30,
        SCORE_PER: 10,

        create: function() {
            this.ns.score = 0;
            this.scrollHeight = this.world.height;
            this.ns.score = 0;
            this.beginSecond = this.time.totalElapsedSeconds();

            this.sprites = this.add.physicsGroup(Phaser.Physics.ARCADE);
            this.bombs = this.add.group();
            this.effects = this.add.group();

            this.level1();

            this.timerLabel = this.add.bitmapText(this.game.width - 65, 0, 'minecraftia', this.TOTAL_TIME + 's', 22);
            this.scoreLabel = this.add.bitmapText(15, 0, 'minecraftia', 'score: ' + this.ns.score, 22);


            this.effectsSounds = this.add.audio('effect_sounds');
            this.effectsSounds.addMarker('ping', 10, 1.0);


        },

        showLevel: function(level) {
            var effectLabel = this.game.add.bitmapText(this.world.centerX, this.world.centerY, 'minecraftia', 'Level ' + level, 32, this.effects);
            effectLabel.x -= effectLabel.width / 2;
            effectLabel.y -= effectLabel.height / 2;
            this.game.add.tween(effectLabel).to({
                fontSize: 50,
                alpha: 0,
                alive: false,
				x:(effectLabel.x - 10),
				y:(effectLabel.y -10)
            }, 1000, Phaser.Easing.Linear.None, true, 1000).onComplete.addOnce(this.onEffectLabelOnComplete, this);
        },



        level1: function() {
            this.level = 1;
            this.showLevel(this.level);
            this.initSpriteNum = this.rnd.integerInRange(30, 50);

            for (var i = 0; i < this.initSpriteNum; ++i) {
				this.randSprite();

            }

            this.beginSecond = this.time.totalElapsedSeconds();
        },


        level2: function() {
            this.level = 2;
            this.showLevel(this.level);
			var num = this.rnd.between(5, 20);

            for (var i = 0; i < num; ++i) {
				this.randSprite();
            }

            this.beginSecond = this.time.totalElapsedSeconds();
        },

        randSprite: function() {
            var s = null;

            if (this.level === 2 && this.rnd.between(0, 100) > 60) {
                s = this.sprites.create(this.rnd.between(100, this.world.width - 100), this.rnd.between(100, this.world.height - 100), 'nyan_cat_cool');
            } else {
                s = this.sprites.create(this.rnd.between(100, this.world.width - 100), this.rnd.between(100, this.world.height - 100), 'nyan_cat');
            }
            s.animations.add('walk');
            s.animations.play('walk', 10, true);
            s.body.velocity.set(this.rnd.between(-60, 60), this.rnd.between(-60, 60));

			s.body.collideWorldBounds = true;
			s.body.bounce.x = 1;
			s.body.bounce.y = 1;
			s.inputEnabled = true;
			s.scale.set(0.2);
			s.events.onInputUp.add(this.spriteInputUp, this);
			s.events.onKilled.add(this.spriteKilled, this);

        },

        spriteInputUp: function(sprite) {
            console.log('kill');
            sprite.kill();
        },

        spriteKilled: function(sprite) {
            var flag = 'nyan_cat_cool' === sprite.key ? -1 : 1;
            this.effectsSounds.play('ping');
            this.ns.score += this.SCORE_PER * flag;
            var effectLabel = this.game.add.bitmapText(this.scoreLabel.x + this.scoreLabel.width - 10, this.scoreLabel.y, 'minecraftia', (-1 === flag ? '-' : '+') + this.SCORE_PER, 22, this.effects);
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

        update: function() {
            this.physics.arcade.collide(this.sprites);
			if(this.rnd.between(0,100) > 99) {
				this.randSprite();
			}
        },

        render: function() {
            this.scoreLabel.text = 'score: ' + this.ns.score;
            if (1 === this.level && this.ns.score >= 300) {
                this.level2();
            }
            var elapsedSeconds = this.time.totalElapsedSeconds() - this.beginSecond;
            var remainSecondes = this.TOTAL_TIME - elapsedSeconds;
            if (remainSecondes <= 0 || !this.sprites.length) {
                this.game.state.start('menu');
            }
            this.timerLabel.text = (parseInt(remainSecondes)) + 's';
        }
    };
    window['hello-phaser'] = window['hello-phaser'] || {};
    window['hello-phaser'].Game2 = Game;
}());
