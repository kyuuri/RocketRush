var ObstacleTest = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/obstacleRed.png' );
        this.setScale( ObstacleTest.SCALE );

        this.setPosition( new cc.p(1000,1000));

        this.vx = 0;
        this.vy = 0;

        this.spiralIsOn = false;
        this.angle = 0;
        this.theta = 0;
        this.a = 2;
        this.b = 0.4;
        this.r = 1;
        this.angleRate = ObstacleTest.ANGLE_RATE;
        // r = ae^(b*theta)
        // r*r = x^2 + y^2
        // x = r cos(theta)
        // y = r sin(theta)

        this.spiralNum = 0;
        this.angleLaunch = 0;
        this.i = 0;

        this.rate = 1;

        this.isSlow = false;
        this.slowRate = 0;

        this.sizeX = ObstacleTest.INITIAL_SIZE_X;
        this.sizeY = ObstacleTest.INITIAL_SIZE_Y;

        this.started = false;
    },

    setVxVy: function( vx, vy ){
        this.vx = vx;
        this.vy = vy;
    },

    update: function( dt ) {
        if( !this.isSlow ){
            this.updateObstacle();
        }
        else{
            if( this.slowRate % 2 == 0 ){
                this.updateObstacle();
            }
        }
        this.slowRate++;
    },

    updateObstacle: function(){
        if( this.started ){
            var pos = this.getPosition();

            if( this.isOutOfScreen() ){
                this.destroySelf();
            }
            else{
                if( this.spiralIsOn ){
                    this.theta = this.angle * Math.PI / 180;
                    this.r = this.a * Math.pow( Math.E, this.b * this.theta );

                    //initial axis
                    var x = this.r * Math.cos( this.theta );
                    var y = this.r * Math.sin( this.theta );

                    //rotate axis
                    var rotateAngle = this.angleLaunch * ( this.i + 1 );
                    this.vx = x * Math.cos( rotateAngle ) - y * Math.sin( rotateAngle );
                    this.vy = y * Math.cos( rotateAngle ) + x * Math.sin( rotateAngle );

                    this.angle += ObstacleTest.ANGLE_RATE;
                }
                this.setPosition( new cc.Point( pos.x + this.vx, pos.y + this.vy ) );
            }
            
        }
    },

    activateSlow: function( isSlow ){
        this.isSlow = isSlow;
    },

    destroySelf: function(){
        this.spiralIsOn = false;
        this.removeFromParent();
    },

    isOutOfScreen: function(){
        var pos = this.getPosition();
        var outX = ( pos.x < -50 ) || ( pos.x > screenWidth + 50 );
        var outY = ( pos.y < -50 ) || ( pos.y > screenHeight + 50 );

        return outX && outY;
    },

    closeTo: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();

        return ( ( Math.abs( myPos.x - oPos.x ) <= this.sizeX * ObstacleTest.SCALE ) &&
         ( Math.abs( myPos.y - oPos.y ) <= this.sizeY * ObstacleTest.SCALE ) );
    },

    start: function(){
        this.started = true;
    },

    stop: function(){
        this.started = false;
    },

    getType: function(){
        return 0;
    },

    spiralOn: function( isOn, i, spiralNum ){
        this.spiralIsOn = isOn;
        this.spiralNum = spiralNum;
        this.angleLaunch = 2 * Math.PI / spiralNum ;
        this.i = i;
    },

});

ObstacleTest.ANGLE_RATE = 3;
ObstacleTest.INITIAL_SIZE_X = 18;
ObstacleTest.INITIAL_SIZE_Y = 18;
ObstacleTest.SCALE = 0.9;
