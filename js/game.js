
    var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    var bikergirl;
    var game = new Phaser.Game(config);
    var gameScene
    var cursors;
    var bluecar;
    var frameNames;
    var crashed = false;
    var carCollider;
    var manCollider;
    var score = 0;
    var scoreText;
    var finishLine;
    var roadmap;
    var paused = false;
    var movingCamera;


    function preload() {
      this.load.image('roadmap', '../assets/TestRoadMapwFinishLinev4.png');
      this.load.atlas('finishLine', '../assets/FinishLinev2.png', '../assets/finishLine.json');
      this.load.atlas('bikergirl', '../assets/bikergirl.png', '../assets/bikergirl.json')
      this.load.atlas('businessMan', '../assets/businessMan.png', '../assets/businessMan.json')
      this.load.image('bluecar', '../assets/vehicles/carBlue2_up.png');
      this.load.image('redcarUp', '../assets/vehicles/carRed2_up.png');
      this.load.image('redcarDown', '../assets/vehicles/carRed2_down.png');
      this.load.image('taxiDown', '../assets/vehicles/taxi_down.png');
      this.load.image('garbageTruckUp', '../assets/vehicles/garbage_up.png')
      this.load.image('garbageTruckDown', '../assets/vehicles/garbage_down.png')
      this.load.audio('crashAudio', '../assets/qubodup-crash.ogg');
      this.load.audio('bodyFallAudio', '../assets/fall.wav');
    }

    function create() {

      roadmap = this.add.image(800, 50, 'roadmap');

      scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
      bikergirl = this.physics.add.sprite(150, 700, 'bikergirl', 'bikergirl_07.gif')
      bluecar = this.physics.add.sprite(200, 100, 'bluecar');
      redcarUp = this.physics.add.sprite(200, 100, 'redcarUp');
      redcarDown = this.physics.add.sprite(200, 100, 'redcarDown');
      redcarDown2 = this.physics.add.sprite(200, 100, 'redcarDown');
      taxiDown = this.physics.add.sprite(1000, 0, 'taxiDown');
      garbageTruckUp = this.physics.add.sprite(1000, 0, 'garbageTruckUp');
      garbageTruckDown = this.physics.add.sprite(1000, 0, 'garbageTruckDown');
      businessMan = this.physics.add.sprite(225, 400, 'businessMan', 'business_guy_01.gif')

      bluecar.crashed = false
      redcarUp.crashed = false
      redcarDown.crashed = false
      redcarDown2.crashed = false
      taxiDown.crashed = false
      garbageTruckUp.crashed = false
      garbageTruckDown.crashed = false

      bluecar.disableBody(true, true)
      redcarUp.disableBody(true, true)
      redcarDown.disableBody(true, true)
      redcarDown2.disableBody(true, true)
      taxiDown.disableBody(true, true)
      garbageTruckUp.disableBody(true, true)
      garbageTruckDown.disableBody(true, true)

      manCollider = this.physics.add.collider(businessMan, bikergirl, smack, null, this)

      bluecarCollider = this.physics.add.collider(bluecar, bikergirl, bluecarCrash, null, this)
      redcarUpCollider = this.physics.add.collider(redcarUp, bikergirl, redcarUpCrash, null, this)
      redcarDownCollider = this.physics.add.collider(redcarDown, bikergirl, redcarDownCrash, null, this)
      redcarDown2Collider = this.physics.add.collider(redcarDown2, bikergirl, redcarDown2Crash, null, this)
      taxiDownCollider = this.physics.add.collider(taxiDown, bikergirl, taxiCrash, null, this)
      garbageTruckUpCollider = this.physics.add.collider(garbageTruckUp, bikergirl, garbageTruckUpCrash, null, this)
      garbageTruckDownCollider = this.physics.add.collider(garbageTruckDown, bikergirl, garbageTruckDownCrash, null, this)

      bikergirl.setBounce(0.2);
      bikergirl.setCollideWorldBounds(true);


      cursors = this.input.keyboard.createCursorKeys();

      createAnims(this);

      this.time.addEvent(
        {
          delay: 4000,
          callback: function () {
            bluecar.enableBody(true, 100, 600, true, true) // GOOD!
          }
        }
      );

      this.time.addEvent(
        {
          delay: 2000,
          callback: function () {
            redcarDown.enableBody(true, 1500, 0, true, true) // GOOD!
          }
        }
      );

      this.time.addEvent(
        {
          delay: 5000,
          callback: function () {
            redcarUp.enableBody(true, 50, 575, true, true) // GOOD!
          }
        }
      );

      this.time.addEvent(
        {
          delay: 10000,
          callback: function () {
            redcarDown2.enableBody(true, 50, 600, true, true) // GOOD!
          }
        }
      );

      this.time.addEvent(
        {
          delay: 4000,
          callback: function () {
            taxiDown.enableBody(true, 1500, 0, true, true) // GOOD!
          }
        }
      );

      this.time.addEvent(
        {
          delay: 8000,
          callback: function () {
            garbageTruckUp.enableBody(true, 50, 575, true, true) // GOOD!
          }
        }
      );

      this.time.addEvent(
        {
          delay: 14000,
          callback: function () {
            garbageTruckDown.enableBody(true, 1500, 0, true, true) // GOOD!
          }
        }
      );

      this.time.addEvent(
        {
          delay: 6500,
          callback: function () {
            redcarDown.enableBody(true, 1600, 0, true, true)
          }
        }
      );

      this.time.addEvent(
        {
          delay: 10000,
          callback: function () {
            businessMan.disableBody(true, true) // GOOD!
          }
        }
      );

      this.time.addEvent(
        {
          delay: 10000,
          callback: function () {
            redcarDown2.enableBody(true, 1500, 0, true, true)
          }
        }
      );

      businessMan.anims.play("walk")
    }


    function update() {

      if (cursors.space.isDown) {
        if (!paused)
          console.log('hit pause',this.scene)
          console.log('keys', cursors);
          console.log(this);
          paused = true;
          this.scene.pause();
      } else {

        paused = false;
        this.scene.resume();
      }

      score += 1;

      scoreText.setText('Score: ' + score);

      if (!businessMan.crashed) {
        businessMan.setVelocityX(-20);
        businessMan.setVelocityY(10);
      } else {
        businessMan.setVelocityX(-60);
        businessMan.setVelocityY(30);
      }

      if (!bluecar.crashed) {
        bluecar.setVelocityX(120);
        bluecar.setVelocityY(-60);
      } else {
        bluecar.setVelocityX(-60);
        bluecar.setVelocityY(30);
      }

      if (!redcarUp.crashed) {
        redcarUp.setVelocityX(120);
        redcarUp.setVelocityY(-60);
      } else {
        redcarUp.setVelocityX(-60);
        redcarUp.setVelocityY(30);
      }

      if (!redcarDown.crashed) {
        redcarDown.setVelocityX(-120);
        redcarDown.setVelocityY(60);
      } else {
        redcarDown.setVelocityX(-60);
        redcarDown.setVelocityY(30);
      }

      if (!taxiDown.crashed) {
        taxiDown.setVelocityX(-120);
        taxiDown.setVelocityY(60);
      } else {
        taxiDown.setVelocityX(-60);
        taxiDown.setVelocityY(30);
      }

      if (!redcarDown2.crashed) {
        redcarDown2.setVelocityX(-120);
        redcarDown2.setVelocityY(60);
      } else {
        redcarDown2.setVelocityX(-60);
        redcarDown2.setVelocityY(30);
      }

      if (!garbageTruckUp.crashed) {
        garbageTruckUp.setVelocityX(80);
        garbageTruckUp.setVelocityY(-40);
      } else {
        garbageTruckUp.setVelocityX(-60);
        garbageTruckUp.setVelocityY(30);
      }

      if (!garbageTruckDown.crashed) {
        garbageTruckDown.setVelocityX(-120);
        garbageTruckDown.setVelocityY(60);
      } else {
        garbageTruckDown.setVelocityX(-60);
        garbageTruckDown.setVelocityY(30);
      }

      if (roadmap.x > -1250) {
        roadmap.y = roadmap.y + .6;
        roadmap.x = roadmap.x - 1.2;
      }
      else {
        victory();
        this.sys.pause();
      }


      if (!crashed) {

        if (cursors.up.isDown) {
          bikergirl.setVelocityY(-70);
          bikergirl.anims.play('up', true);
        }
        else if (cursors.right.isDown) {
          bikergirl.setVelocityX(80)
          bikergirl.setVelocityY(10);
          bikergirl.anims.play('right', true)
        }
        else if (cursors.left.isDown)   {
          bikergirl.setVelocityX(-60);
          bikergirl.setVelocityY(-40);
          bikergirl.anims.play('left', true);
        }

        else if (cursors.down.isDown) {
          bikergirl.anims.play('victory', true)
        }

        else {
          bikergirl.anims.play('default', true);
          bikergirl.setVelocityY(-10);
        }
      }

    }

    function bluecarCrash() {
      score -= 50;
      bikergirl.anims.pause()
      crashed = true
      bikergirl.anims.play('crash', true);
      game.sound.play('crashAudio');
      businessMan.anims.pause()
      gameScene = game.scene.keys.default
      gameScene.physics.pause()
      gameScene.time.addEvent({
        delay: 1000,
        callback: function () {
          gameScene.physics.resume()
          crashed = false
          bluecar.crashed = true
          bluecar.setVelocity(0, 0);
          bikergirl.anims.resume()
          bikergirl.anims.play('right', true)
          businessMan.anims.resume()
          gameScene.physics.world.removeCollider(bluecarCollider);
        }
      })
    }



    function redcarUpCrash() {
      score -= 50;
      bikergirl.anims.pause()
      crashed = true
      bikergirl.anims.play('crash', true);
      game.sound.play('crashAudio');
      businessMan.anims.pause()
      gameScene = game.scene.keys.default
      gameScene.physics.pause()
      gameScene.time.addEvent({
        delay: 1000,
        callback: function () {
          gameScene.physics.resume()
          crashed = false
          redcarUpCrash.crashed = true
          bikergirl.anims.resume()
          bikergirl.anims.play('right', true)
          businessMan.anims.resume()
          gameScene.physics.world.removeCollider(redcarUpCollider);
        }
      })
    }

    function redcarDownCrash() {
      score -= 50;
      bikergirl.anims.pause()
      crashed = true
      bikergirl.anims.play('crash', true);
      game.sound.play('crashAudio');
      businessMan.anims.pause()
      gameScene = game.scene.keys.default
      gameScene.physics.pause()
      gameScene.time.addEvent({
        delay: 1000,
        callback: function () {
          gameScene.physics.resume()
          crashed = false
          redcarDown.crashed = true
          bikergirl.anims.resume()
          bikergirl.anims.play('right', true)
          businessMan.anims.resume()
          gameScene.physics.world.removeCollider(redcarDownCollider);
        }
      })
    }

    function redcarDown2Crash() {
      score -= 50;
      bikergirl.anims.pause()
      crashed = true
      bikergirl.anims.play('crash', true);
      game.sound.play('crashAudio');
      businessMan.anims.pause()
      gameScene = game.scene.keys.default
      gameScene.physics.pause()
      gameScene.time.addEvent({
        delay: 1000,
        callback: function () {
          gameScene.physics.resume()
          crashed = false
          redcarDown2.crashed = true
          bikergirl.anims.resume()
          bikergirl.anims.play('right', true)
          businessMan.anims.resume()
          gameScene.physics.world.removeCollider(redcarDownCollider);
        }
      })
    }

    function taxiCrash() {
      score -= 50;
      bikergirl.anims.pause()
      crashed = true
      bikergirl.anims.play('crash', true);
      game.sound.play('crashAudio');
      businessMan.anims.pause()
      gameScene = game.scene.keys.default
      gameScene.physics.pause()
      gameScene.time.addEvent({
        delay: 1000,
        callback: function () {
          gameScene.physics.resume()
          crashed = false
          taxiDown.crashed = true
          bikergirl.anims.resume()
          bikergirl.anims.play('right', true)
          businessMan.anims.resume()
          gameScene.physics.world.removeCollider(taxiDownCollider);
        }
      })
    }

    function garbageTruckUpCrash() {
      score -= 50;
      bikergirl.anims.pause()
      crashed = true
      bikergirl.anims.play('crash', true);
      game.sound.play('crashAudio');
      businessMan.anims.pause()
      gameScene = game.scene.keys.default
      gameScene.physics.pause()
      gameScene.time.addEvent({
        delay: 1000,
        callback: function () {
          gameScene.physics.resume()
          crashed = false
          garbageTruckUp.crashed = true
          bikergirl.anims.resume()
          bikergirl.anims.play('right', true)
          businessMan.anims.resume()
          gameScene.physics.world.removeCollider(garbageTruckUpCollider);
        }
      })
    }

    function garbageTruckDownCrash() {
      score -= 50;
      bikergirl.anims.pause()
      crashed = true
      bikergirl.anims.play('crash', true);
      game.sound.play('crashAudio');
      businessMan.anims.pause()
      gameScene = game.scene.keys.default
      gameScene.physics.pause()
      gameScene.time.addEvent({
        delay: 1000,
        callback: function () {
          gameScene.physics.resume()
          crashed = false
          garbageTruckDown.crashed = true
          bikergirl.anims.resume()
          bikergirl.anims.play('right', true)
          businessMan.anims.resume()
          gameScene.physics.world.removeCollider(garbageTruckDownCollider);
        }
      })
    }



    function smack() {
      score -= 50
      bikergirl.anims.pause()
      businessMan.anims.pause()
      crashed = true
      bikergirl.anims.play('crash', true);
      businessMan.anims.play('smack', true);
      game.sound.play('bodyFallAudio')
      gameScene = this;
      gameScene.physics.pause()
      gameScene.time.addEvent({
        delay: 1000,
        callback: function () {
          gameScene.physics.resume()
          crashed = false
          businessMan.crashed = true
          bikergirl.anims.resume()
          bikergirl.anims.play('right', true)
          gameScene.physics.world.removeCollider(manCollider);
        }
      })
    }

    function victory() {
      bikergirl.anims.pause();
      bikergirl.anims.play('victory', true);
      hitsFinishLine = true;
    }

