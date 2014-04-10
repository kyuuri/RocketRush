var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/ship.png' );

        this.isSlow = false;
        this.slowRate = 0;

        //direction
        this.isUp = false;
        this.isDown = false;
        this.isLeft = false;
        this.isRight = false;

        this.started = false;
    },

    update: function(dt){
        if(!this.isSlow){
            this.updatePlayer();
        }
        else{
            if(this.slowRate % 2 == 0){
                this.updatePlayer();
            }
        }
        this.slowRate++;
    },

    updatePlayer: function(){
        if(this.started){
            var pos = this.getPosition();
            this.moveShip(pos);
        }
    },

    startMove: function(direction) {
        this.isMove(true, direction);
    },

    stopMove: function(stopDirection) {
		this.isMove(false, stopDirection);
    },

    isMove: function(isMove, cDirection){
        if(cDirection == Player.ARROWKEY.UP)
            this.isUp = isMove;
        if(cDirection == Player.ARROWKEY.DOWN)
            this.isDown = isMove;
        if(cDirection == Player.ARROWKEY.RIGHT)
            this.isRight = isMove;
        if(cDirection == Player.ARROWKEY.LEFT)
            this.isLeft = isMove;
    },

    moveShip: function(pos){
        if(this.isUp && pos.y <= 770)
            this.setPosition( new cc.Point( pos.x, pos.y + Player.MOVESPEED ) );
        if(this.isRight && pos.x <= 570)
            this.setPosition( new cc.Point( pos.x + Player.MOVESPEED, pos.y ) );
        if(this.isLeft && pos.x >= 30)
            this.setPosition( new cc.Point( pos.x - Player.MOVESPEED, pos.y ) );
        if(this.isDown && pos.y >= 30)
            this.setPosition( new cc.Point( pos.x, pos.y - Player.MOVESPEED ) );
    },

    start: function(){
        this.started = true;
    },

    stop: function(){
        this.started = false;
    },

    activateSlow: function(isSlow){
        this.isSlow = isSlow;
    }

});

Player.MOVESPEED = 8;

Player.ARROWKEY = {
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    LEFT: 37,
};
