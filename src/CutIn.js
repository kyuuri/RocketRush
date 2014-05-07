var CutIn = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/finishingMove.png' );

        this.vx = -9;
        this.setScale( 1.4 );
    },

    update: function( dt ){
        var pos = this.getPosition();

        if( pos.x >= 300 ) this. vx = -50;
        else if( pos.x >= 290 ) this.vx = -3;
        else if( pos.x >= 280 ) this.vx = -0.2;
        else if( pos.x >= 270 ) this.vx = -3;
        else this.vx = -50;


        this.setPosition( new cc.Point( pos.x + this.vx, pos.y ) );

        if( pos.x < -300 ){
            this.removeFromParent();
            this.unscheduleUpdate();
        }
        
    },

    play: function(){
        this.scheduleUpdate();
    }

});
