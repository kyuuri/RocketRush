var Obstacle = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/obstacle.png' );
        this.setScale(Obstacle.SCALE);
        this.gravity = -1 + Math.floor(Math.random() * Obstacle.GRAVITY);

        this.started = false;
    },

    update: function(dt) {
        if(this.started){
            var pos = this.getPosition();

            if(pos.y < -50){
                this.randomPosition();
            }
            else{
                this.setPosition(new cc.Point(pos.x, pos.y + this.gravity));
            }
        }
    },

    randomPosition: function() {
        var posx = 1 + Math.floor(Math.random()*screenWidth);
        var posy = 1 + Math.floor(Math.random()*screenHeight);
        this.setPosition(new cc.Point(posx, screenHeight + posy + 20));
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

Obstacle.GRAVITY = -20;
Obstacle.SCALE = 2.0;
