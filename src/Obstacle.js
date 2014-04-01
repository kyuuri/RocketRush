var Obstacle = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/obstacle.png' );
        this.setScale(Obstacle.SCALE);

        this.started = false;
    },

    update: function(dt) {
        if(this.started){
            var pos = this.getPosition();

            if(pos.y < -50){
                this.randomPosition();
            }
            else{
                this.setPosition(new cc.Point(pos.x, pos.y + Obstacle.GRAVITY));
            }
        }
    },

    randomPosition: function() {
        var posx = 1 + Math.floor(Math.random()*screenWidth);
        this.setPosition(new cc.Point(posx, screenHeight + 100));
    },

    closeTo: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();

        return ( ( Math.abs( myPos.x - oPos.x ) <= 20 * Obstacle.SCALE ) &&
         ( Math.abs( myPos.y - oPos.y ) <= 20 * Obstacle.SCALE ) );
    },

    start: function(){
        this.started = true;
    },

    stop: function(){
        this.started = false;
    }

});

Obstacle.GRAVITY = -15;
Obstacle.SCALE = 2.0;
