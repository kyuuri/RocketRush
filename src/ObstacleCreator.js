var ObstacleCreator = cc.Sprite.extend({
    ctor: function( game ) {
        this._super();
        this.initWithFile( 'images/advancedObstacle.png' );
        this.obstacles = [];

        this.arcNum = 0;
        this.arcVy = 0;

        this.crossNum = 0;
        this.crossV = 0;

        this.lockOnV = 0;

        for(var i = 1 ; i <= 20 ; i++){
            this.obstacles.push( new ObstacleTest() );
        }

        this.gameLayer = game;
        this.scheduleUpdate();

        //this.shootMultiArc( 10, 1, 5, 2, -8);
        //this.shootCross( 8, 1, 5, 2, 8);
        this.shootLockOn(1,5,2,8)
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
    },

    shootCross: function( crossNum, interval, repeat, delay, v){

        this.crossNum = crossNum;
        this.crossV = v;

        this.schedule( this.cross, interval, repeat, delay); 
    },

    cross: function(){

        var angle = 360 / this.crossNum ;
        var angleRunner = 0;

        for(var i = 0 ; i < this.crossNum ; i++){
            this.obstacles[i].vx = this.crossV * Math.cos( angleRunner * Math.PI / 180 );
            this.obstacles[i].vy = this.crossV * Math.sin( angleRunner * Math.PI / 180 );
            angleRunner += angle;
            this.obstacles[i].setPosition( this.getPosition() );

            this.gameLayer.addChild( this.obstacles[i], 10 );
            this.obstacles[i].start();
            this.obstacles[i].scheduleUpdate();
        }
    },

    shootLockOn: function( interval, repeat, delay, v){

        this.lockOnV = v;

        this.schedule( this.lockOn, interval, repeat, delay); 
    },

    lockOn: function(){

        var pos = this.getPosition();
        var playerPos = this.gameLayer.player.getPosition();

        var diffX = playerPos.x - pos.x;
        var diffY = playerPos.y - pos.y;

        var angle;

        if( diffX == 0 && diffY > 0 ){
            angle = Math.PI / 2;
        }
        else if( diffX == 0 && diffY < 0 ){
            angle = 3 * Math.PI / 2;
        }
        else if ( diffX == 0 && diffY == 0){
            angle = 0;
        }
        else{

            angle = Math.abs( Math.atan( diffY / diffX ) ); //Q1

            if( diffX < 0 && diffY > 0 ) angle = Math.PI - angle; //Q2
            else if( diffX < 0 && diffY < 0 ) angle = Math.PI + angle; //Q3
            else if( diffX > 0 && diffY < 0 ) angle = -angle; //Q4

        }

        this.obstacles[0].vx = this.lockOnV * Math.cos( angle );
        this.obstacles[0].vy = this.lockOnV * Math.sin( angle );
        this.obstacles[0].setPosition( this.getPosition() );

        this.gameLayer.addChild( this.obstacles[0], 10 );
        this.obstacles[0].start();
        this.obstacles[0].scheduleUpdate();
    },




});

