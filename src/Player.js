var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        //this.initWithFile( 'images/ship.png' );
        this.setAnchorPoint( 0.5, 0.7 );
        this.runAction( this.createPlayerAnimation() );
        this.setScale( 0.5 );

        this.isSlow = false;
        this.slowRate = 0;
        this.opacity = Player.MAX_OPACITY;

        //direction
        this.isUp = false;
        this.isDown = false;
        this.isLeft = false;
        this.isRight = false;

        this.started = false;
    },

    update: function(dt){
        if(!this.isSlow){
            if(this.opacity < Player.MAX_OPACITY){
                this.opacity += 10;
                this.setOpacity( this.opacity );
            }
            this.updatePlayer();
        }
        else{
            if( this.opacity > Player.SLOW_OPACITY ){
                this.opacity -= 10;
                this.setOpacity( this.opacity );
            }

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
        if(this.isUp && pos.y <= screenHeight-30)
            this.setPosition( new cc.Point( pos.x, pos.y + Player.MOVESPEED ) );
        if(this.isRight && pos.x <= screenWidth-30)
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
    },

    createPlayerAnimation: function(){

        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile( 'images/ship1.png' );
        animation.addSpriteFrameWithFile( 'images/ship2.png' );
      
        //animation.setRestoreOriginalFrame(true);
        animation.setDelayPerUnit( 0.15 );
        return cc.RepeatForever.create(cc.Animate.create( animation ));
    },

});

Player.MOVESPEED = 7.5;
Player.MAX_OPACITY = 255;
Player.MIN_OPACITY = 0;
Player.SLOW_OPACITY = 105;

Player.ARROWKEY = {
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    LEFT: 37,
};
