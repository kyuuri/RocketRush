var Obstacle = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/obstacle.png' );
    },

    update: function(dt) {
        var pos = this.getPosition();

        if(pos.y < -10){
            this.randomPosition();
        }
        else{
            this.setPosition(new cc.Point(pos.x, pos.y + Obstacle.GRAVITY));
        }
    },

    randomPosition: function() {
        var posx = 1 + Math.floor(Math.random()*screenWidth);
        this.setPosition(new cc.Point(posx, screenHeight));
    },

    closeTo: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();

        return ( ( Math.abs( myPos.x - oPos.x ) <= 40 ) &&
         ( Math.abs( myPos.y - oPos.y ) <= 40 ) );
    }

});

Obstacle.GRAVITY = -9;
