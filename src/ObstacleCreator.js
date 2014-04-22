var ObstacleCreator = cc.Sprite.extend({
    ctor: function( game ) {
        this._super();
        this.initWithFile( 'images/advancedObstacle.png' );
        this.obstacles = [];

        for(var i = 1 ; i <= 3 ; i++){
            this.obstacles.push( new ObstacleTest() );
        }

        this.gameLayer = game;
        this.scheduleUpdate();
        this.schedule(this.shoot,3,3,3);
    },

    update: function(){
        //console.log(this.gameLayer.state);
        if( this.gameLayer.state == GameLayer.STATES.DEAD || this.gameLayer.state == GameLayer.STATES.END ){
            this.unschedule(this.shoot);
        }
        else if( this.isCollide() ){
            this.gameLayer.state = GameLayer.STATES.DEAD;

            this.gameLayer.updateGameLayer();

            for(var i = 0 ; i < this.obstacles.length ; i++){
                this.obstacles[i].stop();
            }
        }
    },

    isCollide: function(){

        for(var i = 0 ; i < this.obstacles.length ; i++){
            if(this.obstacles[i].closeTo( this.gameLayer.player )){
                if(this.gameLayer.state == GameLayer.STATES.STARTED){
                    return true;
                }
            }
        }
        return false;
    },


    //test shoot
    shoot: function(){

        for(var i = 0 ; i < 3 ; i++){
            this.obstacles[i].vx = -2 + (i+1);
            this.obstacles[i].vy = -8;
            this.obstacles[i].setPosition( this.getPosition() );

            this.gameLayer.addChild(this.obstacles[i], 10);
            this.obstacles[i].start();
            this.obstacles[i].scheduleUpdate();
        }
    },




});

