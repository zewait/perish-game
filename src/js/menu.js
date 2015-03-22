(function() {
    'use strict';

    function Menu() {
        this.ns = window['hello-phaser'] || {};

        this.titleTxt = null;
        this.startTxt = null;
    }

    Menu.prototype = {

        preload: function() {
            this.load.json('leaderboard.json', this.ns.url.leaderboard, true);

            var data = this.cache.getJSON('leaderboard.json');
            if (0 === data.code) {
                // data success
                // player rank array
                this.leaderboards = data.data;
                if (!this.leaderboards) {
                    return;
                }
                for (var i = 0; i < this.leaderboards.length; i++) {
                    var l = this.leaderboards[i];
                    this.load.image(l.avatar, l.avatar);
                }
            } else {
                // data error
                alert(data.msg);
            }

        },

		generateCircleImg: function(key) {
			var avatar = this.make.image(0,0,key);
			avatar.scale.set(60 / avatar.height);
			var mask = this.make.image(0, 0, 'assemble' ,'circle.png');

			var bd = this.make.bitmapData(60, 60);
			bd.alphaMask(avatar, mask);

			return bd;
		},

        create: function() {

			this.ns.setBg(this);
            //this.stage.setBackgroundColor('#c1ebf9');
            if (!this.ns.bgm) {
                this.ns.bgm = this.add.audio('bgm', 0.6, true);
				// TODO toggle it
                this.ns.bgm.play('', 0, 0.6, true);
            }


			// titile
			this.title = this.add.image(this.world.centerX, 60, 'assemble', 'txt_title.png');
			this.title.anchor.set(0.5);


            // --- btn begin ----
            this.btnStart = this.add.button(this.world.centerX,
                this.world.centerY-40,
                'assemble', this.onStart, this,
                'btn_start_00.png',
                'btn_start_00.png',
                'btn_start_01.png',
                'btn_start_00.png');
            this.btnStart.anchor.set(0.5);

            this.btnStart2 = this.add.button(this.world.centerX,
                this.world.centerY + 20,
                'assemble', this.onStart2, this,
                'btn_start_2_00.png',
                'btn_start_2_00.png'
,
                'btn_start_2_01.png',
                'btn_start_2_00.png');
            this.btnStart2.anchor.set(0.5);

            this.btnLeaderboard = this.add.button(this.btnStart2.position.x,
                this.btnStart2.position.y + this.btnStart.height + 10,
                'assemble', this.onLeaderboardOpen, this,
                'btn_leaderboard_00.png',
                'btn_leaderboard_00.png',
                'btn_leaderboard_01.png',
                'btn_leaderboard_00.png');
            this.btnLeaderboard.anchor.set(0.5);
            // --- btn end -----

            this.initLeaderboard();

            this.initCoupon();

			//for(var i=0; i<4; i++) {
			//	for(var j=0; j<3;j++) {
			//		var s = this.add.sprite((j)*55+10, (i)*40+10, 'nyan_cat_cool', i*3+j);
			//		console.log(i*3+j);
			//		s.scale.set(0.2);
			//	}
			//}
			//var testS = this.add.sprite(200, 200, 'nyan_cat_cool');
			//testS.scale.set(0.2);
			//testS.animations.add('walk');
			//testS.animations.play('walk', 10, true);
        },


        /**
         * enable btnLeaderboard and btnStart
         */
        enableGameBtn: function(enable) {
            var flag = enable ? 2 : -1;
            this.btnLeaderboard.input.priorityID = flag;
            this.btnStart.input.priorityID = flag;
            this.btnStart2.input.priorityID = flag;
        },

        initCoupon: function() {

            if (undefined !== this.ns.score) {
                this.sound = this.add.audio('happy');
                this.sound.play();

                var scoreLabel = this.game.add.bitmapText(this.world.centerX, 90, 'minecraftia', 'score: ' + this.ns.score, 22, this.effects);
                scoreLabel.x -= scoreLabel.width / 2;
                if (this.ns.score >= 320) {
                    var coupon = this.add.sprite(this.world.centerX, 0, 'assemble', 'coupon.jpg');
                    coupon.anchor.set(0.5);

                    coupon.inputEnabled = true;
                    coupon.input.priorityID = 3;
                    coupon.events.onInputUp.add(function(sprite) {
                        this.add.tween(coupon).to({
                            y: -sprite.height / 2
                        }, 2000, Phaser.Easing.Bounce.In, true);
                    }, this);

                    this.add.tween(coupon).to({
                        y: this.world.height / 2
                    }, 2000, Phaser.Easing.Bounce.Out, true);
                }
            }
        },

        initLeaderboard: function() {
            // --- leaderboard begin -----
            this.dialogLeaderboard = this.add.sprite(this.world.centerX, this.world.centerY, 'assemble', 'dialog_leaderboard.png');
            this.dialogLeaderboard.anchor.set(0.5);
            this.dialogLeaderboard.alpha = 0.9;

            // temp bitmap data
            this.bmd = this.make.bitmapData(this.dialogLeaderboard.width - 22, this.dialogLeaderboard.height);

            // leaderboard container
            this.dialogLeaderboardContent = this.make.sprite(-this.dialogLeaderboard.width / 2 + 10, -this.dialogLeaderboard.height / 2 + 10, this.bmd);
            // mask
            var mask = this.add.graphics(0, 0);
            // set mask
            mask.beginFill();
            mask.drawRect(this.dialogLeaderboard.x - this.dialogLeaderboardContent.width / 2, this.dialogLeaderboard.y - this.dialogLeaderboard.height / 2 + 10, this.dialogLeaderboardContent.width, this.dialogLeaderboard.height - 20);
            mask.endFill();
            this.dialogLeaderboardContent.mask = mask;

            // enable physics
            this.game.physics.arcade.enable(this.dialogLeaderboardContent);
            this.dialogLeaderboardContent.body.velocity.y = 0;
            this.dialogLeaderboardContent.body.drag.set(100);
            this.dialogLeaderboardContent.body.maxVelocity.set(200);
            //this.dialogLeaderboardContent.body.allowRotation = false;
            //this.dialogLeaderboardContent.body.rotation = 90;

            // set drag
            this.dialogLeaderboardContent.inputEnabled = true;
            this.dialogLeaderboardContent.input.allowHorizontalDrag = false;
            this.dialogLeaderboardContent.input.enableDrag(false, false, false, 255, new Phaser.Rectangle(this.dialogLeaderboardContent.x, this.dialogLeaderboardContent.y - this.dialogLeaderboardContent.height + this.dialogLeaderboard.height - 20, this.dialogLeaderboardContent.width, this.dialogLeaderboardContent.height * 2 - this.dialogLeaderboard.height + 20));
            this.dialogLeaderboardContent.input.enableDrag();
            this.dialogLeaderboardContent.events.onDragStart.add(this.onLeaderboardDragStart, this);
            this.dialogLeaderboardContent.events.onDragStop.add(this.onLeaderboardDragStop, this);

            this.dialogLeaderboard.addChild(this.dialogLeaderboardContent);

            this.btnClose = this.make.button(this.dialogLeaderboard.width / 2 - 5, -(this.dialogLeaderboard.height / 2 - 5),
                'assemble', this.onLeaderboardClose, this,
                'btn_close_00.png',
                'btn_close_00.png',
                'btn_close_01.png',
                'btn_close_00.png');
            this.btnClose.anchor.set(0.5);
            this.btnClose.input.priorityID = 1;
            this.btnClose.useHandCursor = true;


            this.dialogLeaderboard.addChild(this.btnClose);
            this.setupLeaderboardContent();

            this.dialogLeaderboard.scale.set(0);
            this.enableGameBtn(true);
            // --- leaderboard begin -----


        },

        setupLeaderboardContent: function() {
            var itemHeight = 100;

            // set height
            var hight = this.dialogLeaderboard.height;
            if (this.leaderboards) {
                var tempHight = itemHeight * this.leaderboards.length;
                if (tempHight > hight) {
                    (hight = tempHight);
                }
            }
            var tempBd = this.make.bitmapData(this.dialogLeaderboardContent.width, hight);
            tempBd.rect(0, 0, tempBd.width, tempBd.height, '#ffffff');
            // set rank
            if (this.leaderboards) {
                var offsetHight = 20;
                for (var i = 0; i < this.leaderboards.length; i++, offsetHight += itemHeight) {
                    var leader = this.leaderboards[i];

					//TODO
                    var avatar =this.generateCircleImg(leader.avatar);
				//	this.make.sprite(0, 0, leader.avatar);
					
                    tempBd.draw(avatar, 0, offsetHight);

                    var name = this.make.text(0, 0, (i + 1) + '.' + leader.nick_name, {
                        font: '18px Arial',
                        align: 'left'
                    });
                    tempBd.draw(name, avatar.width + 10, offsetHight + 10);


                    var score = this.make.text(0, 0, leader.score, {
                        font: '16px Arial',
                        align: 'left'
                    });
                    tempBd.draw(score, avatar.width + 10, offsetHight + 40);
                }
            }

            this.dialogLeaderboardContent.loadTexture(tempBd);


            // set drag area
            this.dialogLeaderboardContent.input.enableDrag(false, false, false, 255, new Phaser.Rectangle(this.dialogLeaderboardContent.x, this.dialogLeaderboardContent.y - this.dialogLeaderboardContent.height + this.dialogLeaderboard.height - 20, this.dialogLeaderboardContent.width, this.dialogLeaderboardContent.height * 2 - this.dialogLeaderboard.height + 20));
        },


        onLeaderboardDragStart: function(sprite) {
            sprite.draging = true;
            sprite.body.velocity.setTo(0);
        },

        onLeaderboardDragMove: function(point) {
            if (this.lastDragPoint && this.lastDragPoint.time + 500 > this.time.now) {
                return;
            }
            this.lastDragPoint = {
                x: point.x,
                y: point.y,
                time: this.time.now
            };
        },

        onLeaderboardDragStop: function(sprite) {
            sprite.draging = false;
            this.lastDragStopPoint = {
                x: this.input.position.x,
                y: this.input.position.y,
                time: this.time.now
            };
        },

        onLeaderboardClose: function() {
            if (this.dialogLeaderboard.tween && this.dialogLeaderboard.tween.isRunning || 0 === this.dialogLeaderboard.scale.x) {
                return;
            }
            this.dialogLeaderboard.tween = this.add.tween(this.dialogLeaderboard.scale).to({
                x: 0,
                y: 0
            }, 500, Phaser.Easing.Elastic.In, true);
            this.enableGameBtn(true);
        },

        onLeaderboardOpen: function() {
            if (this.dialogLeaderboard.tween && this.dialogLeaderboard.tween.isRunning || 1 === this.dialogLeaderboard.scale.x) {
                return;
            }
            this.dialogLeaderboard.tween = this.add.tween(this.dialogLeaderboard.scale).to({
                x: 1,
                y: 1
            }, 1000, Phaser.Easing.Elastic.Out, true);

            this.enableGameBtn();
        },

        onStart: function() {
            this.game.state.start('game');
        },

        onStart2: function() {
            this.game.state.start('game2');
        },

        update: function() {
            if (this.dialogLeaderboardContent && this.dialogLeaderboardContent.draging) {
                this.onLeaderboardDragMove(this.input.position);
            }
        }

    };

    window['hello-phaser'] = window['hello-phaser'] || {};
    window['hello-phaser'].Menu = Menu;

}());
