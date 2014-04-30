var LittleStar = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/littleStar.png' );

        this.setScale( LittleStar.SCALE );
        this.gravity = -5 + Math.floor( Math.random() * LittleStar.GRAVITY );

        this.isSlow = false;
        this.slowRate = 0;

        this.started = false;
    },

    update: function(dt) {
        if( !this.isSlow ){
            this.updateLittleStar();
        }
        else{
            if( this.slowRate % 2 == 0 ){
                this.updateLittleStar();
            }
        }
        this.slowRate++;
    },

    updateLittleStar: function(){
        if( this.started ){
            var pos = this.getPosition();

            if(pos.y < -50){
                this.randomPosition();
            }
            else{
                this.setPosition( new cc.Point( pos.x, pos.y + this.gravity ) );
            }
        }
    },

    activateSlow: function( isSlow ){
        this.isSlow = isSlow;
    },

    randomPosition: function() {
        var posx = 1 + Math.floor( Math.random() * screenWidth );
        var posy = 1 + Math.floor( Math.random() * screenHeight );
        this.setPosition( new cc.Point( posx, screenHeight + posy + 20 ) );
        
        this.resetValue();
    },

    resetValue: function(){
        this.gravity = -5 + Math.floor( Math.random() * LittleStar.GRAVITY );
    },

    start: function(){
        this.started = true;
    },

    stop: function(){
        this.started = false;
    },

});

LittleStar.GRAVITY = -30;
LittleStar.SCALE = 0.15;
LittleStar.NUM = 20;
