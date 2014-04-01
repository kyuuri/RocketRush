var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );


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
        new Obstacle(),new Obstacle(),new Obstacle(),new Obstacle()
        ];

        for(var i = 0 ; i < this.obstacles.length ; i++){
            this.obstacles[i].randomPosition();
            this.addChild(this.obstacles[i] , 1);
            this.obstacles[i].scheduleUpdate();
        }

        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 550, 750 ) );
        this.score = 0;
        
        this.addChild( this.player, 1 );
        this.addChild( this.scoreLabel, 2 );
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
    },

    onKeyUp: function(e){
        if(this.state == GameLayer.STATES.STARTED){
            this.player.stopMove(e);
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

    update: function() {
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

        this.ex1 = new Explosion();
        this.ex1.initWithFile( 'images/ex1.png' );

        this.ex2 = new Explosion();
        this.ex2.initWithFile( 'images/ex2.png' );

        this.ex3 = new Explosion();
        this.ex3.initWithFile( 'images/ex3.png' );

        this.ex4 = new Explosion();
        this.ex4.initWithFile( 'images/ex4.png' );

        this.ex5 = new Explosion();
        this.ex5.initWithFile( 'images/ex5.png' );

        this.ex6 = new Explosion();
        this.ex6.initWithFile( 'images/ex6.png' );

        this.ex7 = new Explosion();
        this.ex7.initWithFile( 'images/ex7.png' );

        this.ex8 = new Explosion();
        this.ex8.initWithFile( 'images/ex8.png' );

        this.ex9 = new Explosion();
        this.ex9.initWithFile( 'images/ex9.png' );

        this.ex1.setScale(exScale);
        this.ex2.setScale(exScale);
        this.ex3.setScale(exScale);
        this.ex4.setScale(exScale);
        this.ex5.setScale(exScale);
        this.ex6.setScale(exScale);
        this.ex7.setScale(exScale);
        this.ex8.setScale(exScale);
        this.ex9.setScale(exScale);


    },

    explodePlayer: function(){
        var pos = this.player.getPosition();

        if(this.explosionCount == 0){
            this.ex1.setPosition(pos);
            this.addChild(this.ex1,3);
        }
        else if(this.explosionCount == 3){
            this.shiftExplodeFrame(this.ex1, this.ex2, pos);
        }
        else if(this.explosionCount == 6){
            this.shiftExplodeFrame(this.ex2, this.ex3, pos);
        }
        else if(this.explosionCount == 9){
            this.shiftExplodeFrame(this.ex3, this.ex4, pos);
        }
        else if(this.explosionCount == 12){
            this.shiftExplodeFrame(this.ex4, this.ex5, pos);
        }
        else if(this.explosionCount == 15){
            this.shiftExplodeFrame(this.ex5, this.ex6, pos);
        }
        else if(this.explosionCount == 18){
            this.shiftExplodeFrame(this.ex6, this.ex7, pos);
        }
        else if(this.explosionCount == 21){
            this.shiftExplodeFrame(this.ex7, this.ex8, pos);
        }
        else if(this.explosionCount == 24){
            this.shiftExplodeFrame(this.ex8, this.ex9, pos);
        }
        else if(this.explosionCount == 27){
            this.removeChild(this.ex9);
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
    DEAD: 3
};

