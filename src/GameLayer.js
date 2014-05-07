var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.slow = false;
        this.slowRate = 0;

        this.setKeyboardEnabled( true );

        this.state = GameLayer.STATES.FRONT;

        this.player = new Player();
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );

        this.bgMusic = "sounds/overDriveAnother.mp3";
        this.audioEngine = cc.AudioEngine.getInstance();
        //this.audioEngine.playMusic( this.bgMusic, true );

        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 35 );
        this.scoreLabel.setPosition( new cc.Point( 520, 710 ) );
        this.score = 0;

        this.skillSlowLabel = cc.LabelTTF.create( 'Slow Gauge', 'Arial', 18 );
        this.skillSlowLabel.setPosition( new cc.Point( 415, 685 ) );
        this.addChild( this.skillSlowLabel, 30 );

        this.skillSlow = 1000;

        //temp label
        this.skillLabel = cc.LabelTTF.create( 'press Z to activate slow', 'Arial', 18 );
        this.skillLabel.setPosition( new cc.Point( 430, 745 ) );

        //test bomb
        this.bomb = new Bomb();
        
        this.addChild( this.player, 15 );

        this.addChild( this.scoreLabel, 30 );
        this.addChild( this.skillLabel, 30 );
        this.player.scheduleUpdate();
        this.scheduleUpdate();

        //bg
        this.bg = new Background();
        this.addChild( this.bg, 0 );

        //skill1 bar
        this.skillBar = new SkillBar();
        this.skillBar.setPosition( new cc.Point( 455, 660 ) );
        this.addChild( this.skillBar , 13);

        //test ObCreator
        //this.obCre = new ObstacleCreator( this );
        //this.addChild(this.obCre, 10);
        //this.obCre.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 + 200) );

        //life
        this.initPlayerLife();

        //test DropAlgo
        //this.DA = new DA2_DarkSpiral( this );
        this.DA = new DA1_FallenStar( this );
        this.addChild( this.DA , 10 );
        this.DA.scheduleUpdate();

        return true;
    },

    initPlayerLife: function(){
        this.lifeLabel = cc.LabelTTF.create( 'Life : ', 'Arial', 18 );
        this.lifeLabel.setPosition( new cc.Point( 435, 10 ) );
        this.addChild( this.lifeLabel, 30 );

        this.arrLife = [ 470, 490, 510, 530, 550 ];
        this.lifeSp = [];

        for( var i = 0 ; i < 5 ; i++ ){
            var tempSp = new cc.Sprite();
            tempSp.initWithFile( 'images/ship1.png' );
            tempSp.setScale( 0.2 );
            this.lifeSp.push( tempSp );
        }

        this.addLife( 0, 5 );

    },

    addLife: function( from, to ){
        for( var i = from ; i < to ; i++ ){
            var x = this.arrLife[i];
            this.lifeSp[i].setPosition( new cc.Point( x, 12 ) );
            this.addChild( this.lifeSp[i], 30 );
        }
    },

    addScore: function( score ){
        this.addScore = cc.LabelTTF.create( '+' + score , 'Arial', 22 );
        this.addScore.setPosition( new cc.Point( 520, 715 ) );

        this.addChild( this.addScore, 35 );

        var moveUp = cc.MoveTo.create( 1 , new cc.Point( 520, 735 ) );
        this.addScore.runAction( moveUp );

        this.score += score;

        this.scheduleOnce( this.addscoreOpacDown , 1.2 );
        this.scheduleOnce( this.removeAddScore , 1.5 );

    },

    addscoreOpacDown: function(){
        this.addScore.setOpacity(122);
    },

    removeAddScore: function(){
        this.removeChild( this.addScore );
    },

    onKeyDown: function(e) {
        if(this.state == GameLayer.STATES.FRONT){
            this.state = GameLayer.STATES.STARTED;

            this.player.start();
            this.bg.start();

            // for(var i = 0 ; i < this.obstacles.length ; i++){
            //     this.obstacles[i].start();
            // }
            
        }
        if(this.state == GameLayer.STATES.STARTED){
            this.player.startMove(e);

            if(e == 65 || e == 90){ // A or Z
                if(this.skillSlow > 100){
                    this.activateSlow(true);
                }
                else{
                    this.activateSlow(false);
                }
            }
            if(e == 88){ // X
                this.activateBomb();
            }
        }
        //console.log(e);
    },

    onKeyUp: function(e){
        if(this.state == GameLayer.STATES.STARTED){
            this.player.stopMove(e);
        }

        if(e == 90 || e == 65){ // A or Z
            this.activateSlow(false);
        }
    },

    // isCollide: function(){

    //     for(var i = 0 ; i < this.obstacles.length ; i++){
    //         if(this.obstacles[i].closeTo(this.player)){
    //             return true;
    //         }
    //     }
    //     return false;
    // },

    // bombObstacle: function(){

    //     for(var i = 0 ; i < this.obstacles.length ; i++){
    //         if(this.bomb.closeTo(this.obstacles[i]) && this.bomb.active){
    //             this.explodeObstacle(this.obstacles[i]);
    //             this.obstacles[i].randomPosition();
    //         }
    //     }
    // },

    activateSlow: function( isSlow ){
        this.slow = isSlow;

        this.bg.activateSlow( this.slow );
        this.player.activateSlow( this.slow );
        this.bomb.activateSlow( this.slow );
        this.DA.activateSlow( this.slow );

        // for(var i = 0 ; i < this.obstacles.length ; i++){
        //     this.obstacles[i].activateSlow(this.slow);
        // }
    },

    activateBomb: function(){

        this.bomb.setPosition(this.player.getPosition());
        this.addChild( this.bomb, 1 );
        this.bomb.activeBomb();
        this.bomb.scheduleUpdate();

    },

    update: function() {

        if(!this.slow){
            this.updateGameLayer();
            if(this. skillSlow < 1000)
                this.skillSlow++;
        }
        else{
            if(this.slowRate % 2 == 0){
                this.updateGameLayer();
            }
            this.skillSlow -= 2;
        }

        if(this.state == GameLayer.STATES.STARTED){
            if(this.skillSlow < 10){
                this.activateSlow(false);
            }
            this.slowRate++;
            this.skillBar.setBar( this.skillSlow / 1000 );
            //this.skillSlowLabel.setString( this.skillSlow );
        }
        //this.bombObstacle();
    },

    updateGameLayer: function(){
        if(this.state == GameLayer.STATES.STARTED){
            this.scoreLabel.setString( ++this.score );
        }

        if(this.state == GameLayer.STATES.DEAD){

            
            this.player.stop();
            this.bg.stop();

            // for(var i = 0 ; i < this.obstacles.length ; i++){
            //     this.obstacles[i].stop();
            // }

            this.removeChild(this.player);
            this.explodePlayer();

        }

    },

    damagePlayer: function(){
        var pos = this.player.getPosition();

        this.ex = new Explosion();
        this.ex.setOpacity(200);

        this.ex.setPosition(pos.x-110,pos.y-110);

        // 110 is for calibrating the explosion's position

        this.exAction = this.ex.animateExplosion();
        this.ex.runAction(this.exAction);
        this.addChild( this.ex, 15 );
    },

    explodePlayer: function(){
        var pos = this.player.getPosition();

        this.ex = new Explosion();
        this.ex.setOpacity(255);

        this.ex.setPosition(pos.x-110,pos.y-110);

        // 110 is for calibrating the explosion's position

        this.exAction = this.ex.animateExplosion();
        this.ex.runAction(this.exAction);
        this.addChild( this.ex, 15 );

        this.endLabel = cc.LabelTTF.create( 'กากงะ T^T', 'Arial', 100 );
        this.endLabel.setPosition( new cc.Point( 300, 400 ) );
        //this.endLabel.setColor(255,255,255);
        this.addChild( this.endLabel,100 );

        this.state = GameLayer.STATES.END;
   
    },

    //explodeObstacle: function(ob){
    //     var pos = ob.getPosition();
    //     //ob.stop();



    //     this.ex = new Explosion();
    //     this.ex.setScale(2.0);

    //     this.ex.setPosition(pos.x-110,pos.y-110);

    //     // 110 is for calibrating the explosion's position

    //     this.exAction = this.ex.animateExplosion();
    //     this.ex.runAction(this.exAction);
    //     this.addChild( this.ex, 2 );
   
    // },

});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();

        //layer.setColor( new cc.Color3B(100,149,237) );
        this.addChild( layer );
    }
});

GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2,
    DEAD: 3,
    END: 4
};

