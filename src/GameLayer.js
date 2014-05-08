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

        this.bgMusic = "sounds/overDrive.mp3";
        this.audioEngine = cc.AudioEngine.getInstance();
        //this.audioEngine.playMusic( this.bgMusic, true );

        this.scoreLabel = cc.LabelTTF.create( '0', 'Tempus Sans ITC', 35 );
        this.scoreLabel.setPosition( new cc.Point( 520, 710 ) );
        this.score = 0;

        this.skillSlowLabel = cc.LabelTTF.create( 'Energy', 'Tempus Sans ITC', 19 );
        this.skillSlowLabel.setPosition( new cc.Point( 47, 50 ) ); // 570 760
        this.addChild( this.skillSlowLabel, 30 );

        this.skillSlow = 1000;

        //test bomb
        this.bomb = new Bomb();
        
        this.addChild( this.player, 15 );

        this.addChild( this.scoreLabel, 30 );
        this.player.scheduleUpdate();
        this.scheduleUpdate();

        //bg
        this.bg = new Background();
        this.addChild( this.bg, 0 );

        //skill1 bar
        this.skillBar = new SkillBar();
        this.skillBar.setPosition( new cc.Point( 115, 25 ) );
        this.addChild( this.skillBar , 30);

        //test ObCreator
        //this.obCre = new ObstacleCreator( this );
        //this.addChild(this.obCre, 10);
        //this.obCre.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 + 200) );

        //life
        this.initPlayerLife();

        this.DAs = [ new DA1_FallenStar( this ), new DA2_DarkSpiral( this ) ];
        this.runningDA = null;
        // this.runningDA = new DA2_DarkSpiral( this );
        // this.addChild( this.runningDA , 10 );
        // this.runningDA.scheduleUpdate();
        // this.runningDA.start();

        return true;
    },

    initPlayerLife: function(){
        this.lifeLabel = cc.LabelTTF.create( 'Life : ', 'Tempus Sans ITC', 20 );
        this.lifeLabel.setPosition( new cc.Point( 390, 18 ) );
        this.addChild( this.lifeLabel, 30 );

        this.arrLife = [ 430, 460, 490, 520, 550 ];
        this.lifeSp = [];

        for( var i = 0 ; i < 5 ; i++ ){
            var tempSp = new cc.Sprite();
            tempSp.initWithFile( 'images/ship1.png' );
            tempSp.setScale( 0.3 );
            this.lifeSp.push( tempSp );
        }

        this.addLife( 0, 5 );

    },

    addLife: function( from, to ){
        for( var i = from ; i < to ; i++ ){
            var x = this.arrLife[i];
            this.lifeSp[i].setPosition( new cc.Point( x, 20 ) );
            this.addChild( this.lifeSp[i], 30 );
        }
    },

    addScore: function( score ){
        this.addScore = cc.LabelTTF.create( '+' + score , 'Tempus Sans ITC', 30 );
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
        if( this.state == GameLayer.STATES.FRONT ){
            this.state = GameLayer.STATES.STARTED;

            this.player.start();
            this.bg.start();
        }
        if( this.state == GameLayer.STATES.STARTED ){
            this.player.startMove( e );

            if(e == 65 || e == 90){ // A or Z
                if( this.skillSlow > 2 ){
                    this.activateSlow( true );
                }
                else{
                    this.activateSlow( false );
                }
            }
            if( e == 88 && !this.bomb.active ){ // X
                if( this.skillSlow >= 400 ){
                    this.skillSlow -= 400;
                    this.activateBomb();
                }
            }
        }
        if( this.state == GameLayer.STATES.END ){
            var director = cc.Director.getInstance();
            director.replaceScene(cc.TransitionFade.create( 1, new StartScene() ) );
        }
    },

    onKeyUp: function(e){
        if(this.state == GameLayer.STATES.STARTED){
            this.player.stopMove(e);
        }

        if(e == 90 || e == 65){ // A or Z
            this.activateSlow(false);
        }
    },

    activateSlow: function( isSlow ){
        this.slow = isSlow;

        this.bg.activateSlow( this.slow );
        this.player.activateSlow( this.slow );
        this.bomb.activateSlow( this.slow );
        this.runningDA.activateSlow( this.slow );

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

    getRandomDA: function(){
        var num = Math.floor( Math.random() * this.DAs.length );
        return this.DAs[ num ];
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
        }
    },

    updateGameLayer: function(){
        if( this.state == GameLayer.STATES.STARTED
            && this.state != GameLayer.STATES.DEAD ){

            this.scoreLabel.setString( ++this.score );

            if( this.runningDA == null){
                this.runningDA = this.getRandomDA();
                this.addChild( this.runningDA , 10 );
                this.runningDA.scheduleUpdate();
                this.runningDA.start();
            }

            if( this.runningDA.isFinished ){
                this.runningDA.resetSelf();
                this.removeChild( this.runningDA );
                this.runningDA.unscheduleUpdate();
                this.runningDA.stop();
                this.runningDA = null;
            }
        }

        if(this.state == GameLayer.STATES.DEAD){

            this.runningDA.unscheduleUpdate();
            this.runningDA.stop();

            this.player.stop();
            this.bg.stop();

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

        var endLabel = cc.LabelTTF.create( 'Kakkk!', 'Tempus Sans ITC', 100 );
        endLabel.setPosition( new cc.Point( screenWidth / 2 , screenHeight / 2 + 100 ) );
        this.addChild( endLabel,100 );

        var sLabel = cc.LabelTTF.create( 'Your score is ' + this.score, 'Tempus Sans ITC', 50 );
        sLabel.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( sLabel,100 );

        var reLabel = cc.LabelTTF.create( 'Press R to Restart', 'Tempus Sans ITC', 50 );
        reLabel.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 - 70 ) );
        this.addChild( reLabel,100 );

        this.state = GameLayer.STATES.END;
   
    },

});

GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2,
    DEAD: 3,
    END: 4
};

