var ObstacleCreator = cc.Sprite.extend({
    ctor: function( game ) {
        this._super();
        this.initWithFile( 'images/advancedObstacle.png' );
        this.obstacles = [];

        this.arcNum = 0; // defalut arc
        this.arcVy = 1;

        for(var i = 1 ; i <= 20 ; i++){
            this.obstacles.push( new ObstacleTest() );
        }

        this.gameLayer = game;
        this.scheduleUpdate();

        //this.shootMultiArc( 10, 1, 5, 2, -8);
    },

    update: function(){

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

    shootMultiArc: function( arcNum, interval, repeat, delay, vy ){

        this.arcNum = arcNum;
        this.arcVy = vy;

        this.schedule( this.multiArc, interval, repeat, delay); 
    },

    multiArc: function(){

        for(var i = 0 ; i < this.arcNum ; i++){
            this.obstacles[i].vx = -this.arcNum + (2*(i+1)-1);
            this.obstacles[i].vy = this.arcVy;
            this.obstacles[i].setPosition( this.getPosition() );

            this.gameLayer.addChild( this.obstacles[i], 10 );
            this.obstacles[i].start();
            this.obstacles[i].scheduleUpdate();
        }
    }




});

