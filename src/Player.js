var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/ship.png' );

        //direction
        this.isUp = false;
        this.isDown = false;
        this.isLeft = false;
        this.isRight = false;
    },

    update: function(dt) {
    	var pos = this.getPosition();
        this.moveShip(pos);
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
            this.setPosition( new cc.Point( pos.x, pos.y+7.5 ) );
        if(this.isRight && pos.x <= 570)
            this.setPosition( new cc.Point( pos.x+7.5, pos.y ) );
        if(this.isLeft && pos.x >= 30)
            this.setPosition( new cc.Point( pos.x-7.5, pos.y ) );
        if(this.isDown && pos.y >= 30)
            this.setPosition( new cc.Point( pos.x, pos.y-7.5 ) );
    }

});

Player.MOVESPEED = 4;

Player.ARROWKEY = {
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    LEFT: 37,
};
