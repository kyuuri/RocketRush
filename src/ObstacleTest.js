var ObstacleTest = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/obstacle.png' );
        this.setScale(Obstacle.SCALE);
        this.vx = 0;
        this.vy = 0;

        this.spiralIsOn = false;
        this.angle = 0;
        this.theta = 0;
        this.a = 2;
        this.b = 0.1;
        this.r = 5;
        // r = ae^(b*theta)
        // r*r = x^2 + y^2
        // x = r cos(theta)
        // y = r sin(theta)

        this.rate = 1;

        this.isSlow = false;
        this.slowRate = 0;

        this.sizeX = Obstacle.INITIAL_SIZE_X;
        this.sizeY = Obstacle.INITIAL_SIZE_Y;

        this.started = false;
    },

    setVxVy: function( vx, vy){
        this.vx = vx;
        this.vy = vy;
    },

    update: function(dt) {
        if( !this.isSlow ){
            this.updateObstacle();
        }
        else{
            if(this.slowRate % 3 == 0){
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
                    this.vx = this.r * Math.cos( this.theta );
                    this.vy = this.r * Math.sin( this.theta );
                    this.angle += 15;
                }
                this.setPosition( new cc.Point( pos.x + this.vx, pos.y + this.vy ) );
            }
            
        }
    },

    activateSlow: function( isSlow ){
        this.isSlow = isSlow;
    },

    randomPosition: function() {
        var posx = 1 + Math.floor( Math.random() * screenWidth );
        var posy = 1 + Math.floor( Math.random() * screenHeight );
        this.setPosition(new cc.Point(posx, screenHeight + posy + this.sizeY));
        
        this.resetValue();
    },

    resetValue: function(){
        this.vy = -2 + Math.floor( Math.random() * Obstacle.GRAVITY );
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

        return ((Math.abs(myPos.x - oPos.x) <= this.sizeX * Obstacle.SCALE) &&
         (Math.abs(myPos.y - oPos.y) <= this.sizeY * Obstacle.SCALE));
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

    spiralOn: function( isOn ){
        this.spiralIsOn = isOn;
    },

});
