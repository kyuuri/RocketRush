var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.slow = false;
        this.slowRate = 0;


        this.setKeyboardEnabled( true );

        this.state = GameLayer.STATES.FRONT;
        this.explosionCount = 0;
        this.initPlayerExplosion();

        this.player = new Player();
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );

        this.obstacles = [
        new Obstacle(),new Obstacle(),new Obstacle(),new Obstacle(),
        new Obstacle(),new Obstacle(),new Obstacle(),new Obstacle(),
        new Obstacle(),new Obstacle(),new Obstacle(),new Obstacle(),
        new Obstacle(),new Obstacle(),new Obstacle(),new Obstacle(),
        new Obstacle(),new Obstacle()
        ];

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
        
        this.addChild( this.player, 1 );
        this.addChild( this.scoreLabel, 2 );
        this.addChild( this.skillSlowLabel, 2 );
        this.addChild( this.skillLabel, 2 );
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
        }
        if(e == 90 || e == 65){ // A or Z
            if(this.skillSlow > 100){
                this.activateSlow(true);
            }
            else{
                this.activateSlow(false);
            }
        }
        console.log(e);
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

    activateSlow: function(isSlow){
        this.slow = isSlow;
        this.player.activateSlow(this.slow);
        for(var i = 0 ; i < this.obstacles.length ; i++){
            this.obstacles[i].activateSlow(this.slow);
        }
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
    },

    updateGameLayer: function(){
        if(this.state == GameLayer.STATES.STARTED){
                if(this.isCollide()){
                    this.state = GameLayer.STATES.DEAD;
                    this.player.stop();
                    this.explodePlayer();

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

    initPlayerExplosion: function(){
        var exScale = 2.0;

        this.ex = new Array();
        this.count = 0;

        for(var i = 1 ; i < 10 ; i++){
            var src = 'images/ex' + i + '.png';
            this.ex[i-1] = new Explosion();
            this.ex[i-1].initWithFile( src );
            this.ex[i-1].setScale(exScale);
        }

    },

    explodePlayer: function(){
        var pos = this.player.getPosition();


        if(this.explosionCount == 0){
            this.ex[0].setPosition(pos);
            this.addChild(this.ex[0],3);

            //temp
            this.endLabel = cc.LabelTTF.create( 'กากงะ T^T', 'Arial', 100 );
            this.endLabel.setPosition( new cc.Point( 300, 400 ) );
            this.addChild(this.endLabel,3);
        }
        else if(this.explosionCount == 27){
            this.removeChild(this.ex[8]);
            this.state = GameLayer.END;
        }
        else if(this.explosionCount % 3 == 0){
            this.shiftExplodeFrame(this.ex[this.count], this.ex[this.count+1], pos);
            this.count++;
        }

        this.explosionCount++;
   
    },

    shiftExplodeFrame: function(fromEx, toEx, pos){
        toEx.setPosition(pos);
        this.addChild(toEx,3);
        this.removeChild(fromEx);
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

