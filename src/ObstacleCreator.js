var ObstacleCreator = cc.Sprite.extend({
    ctor: function( gameLayer ) {
        this._super();
        this.initWithFile( 'images/obstacleCreatorLight.png' );

        this.resetSelf();

        this.gameLayer = gameLayer;
        this.scheduleUpdate();

        this.soundShoot = "sounds/shoot.wav";
        this.audioEngine = cc.AudioEngine.getInstance();
        this.audioEngine.setEffectsVolume(0.2);

        //this.shootMultiArc( 5, 1, 5, 2, 8, -90);
        //this.shootCross( 7, 1, 5, 2, 8);
        //this.shootLockOn(1,5,2,8)
        //this.shootSpiral( 8, 1, 0, 2, 10);
        //this.shootLine( 1, 1, 1, 1, -90);
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

        this.lineV = 0;
        this.lineAngle = 0;
 
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

        this.isCollideWithBomb();

        if( this.gameLayer.state == GameLayer.STATES.DEAD || this.gameLayer.state == GameLayer.STATES.END ){
            this.unschedule( this.multiArc );
            this.unschedule( this.cross );
            this.unschedule( this.lockOn );
            this.unschedule( this.spiral );
            this.unschedule( this.line );
        }
        else if( this.isCollide() && !this.gameLayer.player.blinking ){
            this.gameLayer.player.health -= 2;

            var life = this.gameLayer.player.health / 2 ;

            if( life < 5 ){
                this.gameLayer.removeChild( this.gameLayer.lifeSp[life] );
            }

            if( this.gameLayer.player.health > 0){
                this.gameLayer.player.blink( true );
                this.gameLayer.damagePlayer();
            }
            else{
                this.gameLayer.state = GameLayer.STATES.DEAD;
            }  

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

        this.gameLayer.removeChild( obstacle );
        obstacle.resetSelf();

        if( obstacle.getType() == 0){
            this.gameLayer.addChild( obstacle , 10 );
        }
        else{
            this.gameLayer.addChild( obstacle , 9 );
        }
    },

    playShootSound: function(){
        this.audioEngine.playEffect( this.soundShoot , false);
    },

    isCollide: function(){

        for( var i = 0 ; i < this.obstacles.length ; i++ ){
            if( this.obstacles[i].closeTo( this.gameLayer.player )
                && !this.obstacles[i].destroyed ){

                if( this.gameLayer.state == GameLayer.STATES.STARTED ){
                    return true;
                }
            }
        }
        return false;
    },

    isCollideWithBomb: function(){
        if( this.gameLayer.bomb.active ){
            for( var i = 0 ; i < this.obstacles.length ; i++ ){
                if( this.gameLayer.bomb.closeTo( this.obstacles[i] )
                    && !this.obstacles[i].destroyed ){
                    
                    this.obstacles[i].disappear();
                }
            }
        }
    },

    shootMultiArc: function( arcNum, interval, repeat, delay, v, arcAngle ){

        this.arcNum = arcNum;
        this.arcV = v;
        this.arcAngle = arcAngle * Math.PI / 180 - Math.PI / 2;

        this.schedule( this.multiArc, interval, repeat, delay );
    },

    multiArc: function(){

        for( var i = 0 ; i < this.arcNum ; i++ ){
            var x = 2 * ( -this.arcNum + ( 2 * ( i + 1 ) - 1 ) );
            var y = this.arcV;

            this.obstacles[i].vx = x * Math.cos( this.arcAngle ) - y * Math.sin( this.arcAngle );
            this.obstacles[i].vy = y * Math.cos( this.arcAngle ) + x * Math.sin( this.arcAngle );


            this.addToLayer( this.obstacles[i] );

            this.obstacles[i].setPosition( this.getPosition() );
            this.obstacles[i].start();
            this.obstacles[i].scheduleUpdate();
            this.playShootSound();
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

            this.addToLayer( this.obstacles[i] );

            this.obstacles[i].setPosition( this.getPosition() );
            this.obstacles[i].start();
            this.obstacles[i].scheduleUpdate();
            this.playShootSound();
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

        this.addToLayer( this.obstacles[0] );

        this.obstacles[0].setPosition( this.getPosition() );
        this.obstacles[0].start();
        this.obstacles[0].scheduleUpdate();
        this.playShootSound();
    },

    shootSpiral: function( spiralNum, interval, repeat, delay, v ){

        this.spiralNum = spiralNum;
        this.spiralV = v;

        this.schedule( this.spiral, interval, repeat, delay ); 
    },

    spiral: function(){
        for( var i = 0 ; i < this.spiralNum ; i++ ){
            this.addToLayer( this.obstacles[i] );
            
            this.obstacles[i].setPosition( this.getPosition() );
            this.obstacles[i].spiralOn( true, i, this.spiralNum );
            this.obstacles[i].start();
            this.obstacles[i].scheduleUpdate();
        }
        this.playShootSound();
    },

    shootLine: function( interval, repeat, delay, v, angle ){

        this.lineV = v;
        this.lineAngle = angle * Math.PI / 180 - Math.PI / 4;

        this.schedule( this.line, interval, repeat, delay ); 
    },

    line: function(){

        for( var i = 0 ; i < 10 ; i++ ){

            var x = this.lineV + i/2 * 5;
            var y = x;

            this.obstacles[i].vx = x * Math.cos( this.lineAngle ) - y * Math.sin( this.lineAngle );
            this.obstacles[i].vy = y * Math.cos( this.lineAngle ) + x * Math.sin( this.lineAngle );


            this.addToLayer( this.obstacles[i] );

            this.obstacles[i].setPosition( this.getPosition() );
            this.obstacles[i].start();
            this.obstacles[i].scheduleUpdate();
        }
        this.playShootSound();
    },


});

ObstacleCreator.MAX_OPACITY = 255;
ObstacleCreator.MIN_OPACITY = 195;
ObstacleCreator.OPACITY_RATE = 0.5;

ObstacleCreator.MAX_SCALE = 0.27;
ObstacleCreator.MIN_SCALE = 0.25;
ObstacleCreator.SCALE_RATE = 0.0005;

