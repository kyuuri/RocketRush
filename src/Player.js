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


        if(this.isUp && pos.y <= 770)
            this.setPosition( new cc.Point( pos.x, pos.y+7.5 ) );
        if(this.isRight && pos.x <= 570)
            this.setPosition( new cc.Point( pos.x+7.5, pos.y ) );
        if(this.isLeft && pos.x >= 30)
            this.setPosition( new cc.Point( pos.x-7.5, pos.y ) );
        if(this.isDown && pos.y >= 30)
                this.setPosition( new cc.Point( pos.x, pos.y-7.5 ) );
    },

    move: function(direction) {
        if(direction == Player.ARROWKEY.UP)
            this.isUp = true;
        if(direction == Player.ARROWKEY.DOWN)
            this.isDown = true;
        if(direction == Player.ARROWKEY.RIGHT)
            this.isRight = true;
        if(direction == Player.ARROWKEY.LEFT)
            this.isLeft = true;
    },

    stopMove: function(stopDirection) {
		if(stopDirection == Player.ARROWKEY.UP)
            this.isUp = false;
        if(stopDirection == Player.ARROWKEY.DOWN)
            this.isDown = false;
        if(stopDirection == Player.ARROWKEY.RIGHT)
            this.isRight = false;
        if(stopDirection == Player.ARROWKEY.LEFT)
            this.isLeft = false;
    }
});

Player.MOVESPEED = 4;

Player.ARROWKEY = {
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    LEFT: 37,
};
