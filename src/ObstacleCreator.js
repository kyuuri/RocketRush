var ObstacleCreator = cc.Sprite.extend({
    ctor: function( gameLayer ) {
        this._super();
        this.initWithFile( 'images/obstacleCreatorLight.png' );

        this.resetSelf();

        this.gameLayer = gameLayer;
        this.scheduleUpdate();

        //this.shootMultiArc( 5, 1, 5, 2, 8, -90);
        //this.shootCross( 7, 1, 5, 2, 8);
        //this.shootLockOn(1,5,2,8)
        //this.shootSpiral( 8, 1, 0, 2, 10);
    },

    resetSelf: function(){
 
        this.isSlow = false;
        this.slowRate = 0;
 
        this.angle = 0;
 
        this.opacity = ObstacleCreator.MAX_OPACITY;
        this.opacityUp = false;
 
        this.scale = ObstacleCreator.MAX_SCALE;
        this.scaleUp = false;
        this.setScale(0.25);

        this.obstacles = [];
 
        this.arcNum = 0;
        this.arcV = 0;
        this.arcAngle = 0;
 
        this.crossNum = 0;
        this.crossV = 0;
 
        this.lockOnV = 0;
 
        this.spiralNum = 0;
        this.spiralV = 0;
 
        for( var i = 1 ; i <= 20 ; i++ ){
            this.obstacles.push( new ObstacleTest() );
        }
    },

    update: function(){

        if( !this.isSlow ){
            this.updateObstacleCreator();
        }
        else{
            if( this.slowRate % 2 == 0 ){
                this.updateObstacleCreator();
            }
        }
        this.slowRate++;

    },

    updateObstacleCreator: function(){

        if( this.gameLayer.state == GameLayer.STATES.DEAD || this.gameLayer.state == GameLayer.STATES.END ){
            this.unschedule( this.multiArc );
            this.unschedule( this.cross );
            this.unschedule( this.lockOn );
            this.unschedule( this.spiral );
            //this.unschedule(this.shoot);
        }
        else if( this.isCollide() ){
            this.gameLayer.state = GameLayer.STATES.DEAD;

            this.gameLayer.updateGameLayer();
        }

        if( this.scaleUp ){
            this.scale += ObstacleCreator.SCALE_RATE;

            if( this.scale >= ObstacleCreator.MAX_SCALE ){
                this.scaleUp = false;
            }
        }
        else{
            this.scale -= ObstacleCreator.SCALE_RATE;

            if( this.scale <= ObstacleCreator.MIN_SCALE ){
                this.scaleUp = true;
            }
        }

        if( this.opacityUp ){
            this.opacity += ObstacleCreator.OPACITY_RATE;

            if( this.opacity >= ObstacleCreator.MAX_OPACITY ){
                this.opacityUp = false;
            }
        }
        else{
            this.opacity -= ObstacleCreator.OPACITY_RATE;

            if( this.opacity <= ObstacleCreator.MIN_OPACITY ){
                this.opacityUp = true;
            }
        }

        if( this.angle == 360 ){
            this.angle = 0;
        }
        this.angle += 0.36;

        this.setRotation( this.angle );
        this.setScale( this.scale );
        this.setOpacity( this.opacity );

    },

    activateSlow: function( isSlow ){
        this.isSlow = isSlow;

        for( var i = 0 ; i < 20 ; i++ ){
            this.obstacles[i].activateSlow( isSlow );
        }
    },

    addToLayer: function( obstacle ){
        if( obstacle.getType() == 0){
            this.gameLayer.addChild( obstacle , 10 );
        }
        else{
            this.gameLayer.addChild( obstacle , 9 );
        }
    },

    isCollide: function(){

        for( var i = 0 ; i < this.obstacles.length ; i++ ){
            if( this.obstacles[i].closeTo( this.gameLayer.player ) ){
                if( this.gameLayer.state == GameLayer.STATES.STARTED ){
                    return true;
                }
            }
        }
        return false;
    },

    shootMultiArc: function( arcNum, interval, repeat, delay, v, arcAngle ){

        this.arcNum = arcNum;
        this.arcV = v;
        this.arcAngle = arcAngle * Math.PI / 180 - Math.PI / 2;

        this.schedule( this.multiArc, interval, repeat, delay ); 
    },

    multiArc: function(){

        for( var i = 0 ; i < this.arcNum ; i++ ){
            var x = ( -this.arcNum + ( 2 * ( i + 1 ) - 1 ) );
            var y = this.arcV;

            this.obstacles[i].vx = x * Math.cos( this.arcAngle ) - y * Math.sin( this.arcAngle );
            this.obstacles[i].vy = y * Math.cos( this.arcAngle ) + x * Math.sin( this.arcAngle );

            this.obstacles[i].setPosition( this.getPosition() );

            this.addToLayer( this.obstacles[i] );
            this.obstacles[i].start();
            this.obstacles[i].scheduleUpdate();
        }
    },

    shootCross: function( crossNum, interval, repeat, delay, v){

        this.crossNum = crossNum;
        this.crossV = v;

        this.schedule( this.cross, interval, repeat, delay ); 
    },

    cross: function(){

        var angle = 360 / this.crossNum ;
        var angleRunner = -90;

        for( var i = 0 ; i < this.crossNum ; i++ ){
            this.obstacles[i].vx = this.crossV * Math.cos( angleRunner * Math.PI / 180 );
            this.obstacles[i].vy = this.crossV * Math.sin( angleRunner * Math.PI / 180 );
            angleRunner += angle;
            this.obstacles[i].setPosition( this.getPosition() );

            this.addToLayer( this.obstacles[i] );
            this.obstacles[i].start();
            this.obstacles[i].scheduleUpdate();
        }
    },

    shootLockOn: function( interval, repeat, delay, v ){

        this.lockOnV = v;

        this.schedule( this.lockOn, interval, repeat, delay ); 
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

        this.addToLayer( this.obstacles[0] );
        this.obstacles[0].start();
        this.obstacles[0].scheduleUpdate();
    },

    shootSpiral: function( spiralNum, interval, repeat, delay, v ){

        this.spiralNum = spiralNum;
        this.spiralV = v;

        this.schedule( this.spiral, interval, repeat, delay ); 
    },

    spiral: function(){

        var angle = 360 / this.spiralNum ;
        var angleRunner = -90;

        for( var i = 0 ; i < this.spiralNum ; i++ ){
            var vx = this.spiralV * Math.cos( angleRunner * Math.PI / 180 );
            var vy = this.spiralV * Math.sin( angleRunner * Math.PI / 180 );
            angleRunner += angle;
            this.obstacles[i].setPosition( this.getPosition() );

            this.addToLayer( this.obstacles[i] );
            this.obstacles[i].spiralOn( true, i, this.spiralNum );
            this.obstacles[i].start();
            this.obstacles[i].scheduleUpdate();
        }
    },


});

ObstacleCreator.MAX_OPACITY = 255;
ObstacleCreator.MIN_OPACITY = 195;
ObstacleCreator.OPACITY_RATE = 0.5;

ObstacleCreator.MAX_SCALE = 0.27;
ObstacleCreator.MIN_SCALE = 0.25;
ObstacleCreator.SCALE_RATE = 0.0005;

