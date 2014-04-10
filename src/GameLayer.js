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

        this.obstacles = [];
        for(var i = 0 ; i < 17 ; i++){
            this.obstacles.push(new Obstacle());
        }

        for(var i = 0 ; i < this.obstacles.length ; i++){
            this.obstacles[i].randomPosition();
            this.addChild(this.obstacles[i] , 1);
            this.obstacles[i].scheduleUpdate();
        }

        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 550, 750 ) );
        this.score = 0;

        this.skillSlowLabel = cc.LabelTTF.create( '1000', 'Arial', 30 );
        this.skillSlowLabel.setPosition( new cc.Point( 550, 700 ) );
        this.skillSlow = 1000;

        //temp label
        this.skillLabel = cc.LabelTTF.create( 'press Z to activate slow', 'Arial', 20 );
        this.skillLabel.setPosition( new cc.Point( 470, 785 ) );

        //test bomb
        this.bomb = new Bomb();
        
        this.addChild( this.player, 2 );

        this.addChild( this.scoreLabel, 3 );
        this.addChild( this.skillSlowLabel, 3 );
        this.addChild( this.skillLabel, 3 );
        this.player.scheduleUpdate();
        this.scheduleUpdate();

        return true;
    },

    onKeyDown: function(e) {
        if(this.state == GameLayer.STATES.FRONT){
            this.state = GameLayer.STATES.STARTED;
            this.player.start();
            for(var i = 0 ; i < this.obstacles.length ; i++){
                this.obstacles[i].start();
            }
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

    isCollide: function(){

        for(var i = 0 ; i < this.obstacles.length ; i++){
            if(this.obstacles[i].closeTo(this.player)){
                return true;
            }
        }
        return false;
    },

    bombObstacle: function(){

        for(var i = 0 ; i < this.obstacles.length ; i++){
            if(this.bomb.closeTo(this.obstacles[i]) && this.bomb.active){
                this.obstacles[i].randomPosition();
            }
        }
    },

    activateSlow: function(isSlow){
        this.slow = isSlow;
        this.player.activateSlow(this.slow);
        this.bomb.activateSlow(this.slow);
        for(var i = 0 ; i < this.obstacles.length ; i++){
            this.obstacles[i].activateSlow(this.slow);
        }
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
            if(this.slowRate % 3 == 0){
                this.updateGameLayer();
            }
            this.skillSlow -= 2;
        }

        if(this.state == GameLayer.STATES.STARTED){
            if(this.skillSlow < 10){
                this.activateSlow(false);
            }
            this.slowRate++;
            this.skillSlowLabel.setString( this.skillSlow );
        }
        this.bombObstacle();
    },

    updateGameLayer: function(){
        if(this.state == GameLayer.STATES.STARTED){
                if(this.isCollide()){
                    this.state = GameLayer.STATES.DEAD;
                    this.player.stop();

                    for(var i = 0 ; i < this.obstacles.length ; i++){
                        this.obstacles[i].stop();
                    }
                }
                this.scoreLabel.setString( ++this.score );
            }

            if(this.state == GameLayer.STATES.DEAD){
                this.removeChild(this.player);
                this.explodePlayer();
            }
    },

    explodePlayer: function(){
        var pos = this.player.getPosition();

        this.ex = new Explosion();

        this.ex.setPosition(pos.x-110,pos.y-110);

        // 110 is for calibrating the explosion's position

        this.exAction = this.ex.animateExplosion();
        this.ex.runAction(this.exAction);
        this.addChild( this.ex, 2 );

        this.endLabel = cc.LabelTTF.create( 'กากงะ T^T', 'Arial', 100 );
        this.endLabel.setPosition( new cc.Point( 300, 400 ) );
        this.addChild(this.endLabel,3);

        this.state = GameLayer.END;
   
    }


});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2,
    DEAD: 3,
    END: 4
};

