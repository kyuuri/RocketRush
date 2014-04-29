var AdvancedObstacle1 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/advancedObstacleBlue.png' );
        this.setScale( AdvancedObstacle1.SCALE );
        this.vx = 0;
        this.vy = 0;

        this.spiralIsOn = false;
        this.angle = 0;
        this.theta = 0;
        this.a = 2;
        this.b = 0.4;
        this.r = 1;
        this.angleRate = AdvancedObstacle1.ANGLE_RATE;
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

        this.sizeX = AdvancedObstacle1.INITIAL_SIZE_X;
        this.sizeY = AdvancedObstacle1.INITIAL_SIZE_Y;

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

                    this.angle += AdvancedObstacle1.ANGLE_RATE;
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
        var outX = ( pos.x < -100 ) || ( pos.x > screenWidth + 100 );
        var outY = ( pos.y < -100 ) || ( pos.y > screenHeight + 100 );

        return outX && outY;
    },

    closeTo: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();

        if( obj. isSlow ){
            return false;
        }

        return ( ( Math.abs( myPos.x - oPos.x ) <= this.sizeX * AdvancedObstacle1.SCALE ) &&
         ( Math.abs( myPos.y - oPos.y ) <= this.sizeY * AdvancedObstacle1.SCALE ) );
    },

    start: function(){
        this.started = true;
    },

    stop: function(){
        this.started = false;
    },

    spiralOn: function( isOn, i, spiralNum ){
        this.spiralIsOn = isOn;
        this.spiralNum = spiralNum;
        this.angleLaunch = 2 * Math.PI / spiralNum ;
        this.i = i;
    },

});

AdvancedObstacle1.ANGLE_RATE = 3;
AdvancedObstacle1.INITIAL_SIZE_X = 27;
AdvancedObstacle1.INITIAL_SIZE_Y = 27;
AdvancedObstacle1.SCALE = 1.5;
