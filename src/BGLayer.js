var BGLayer = cc.Sprite.extend({
	ctor: function() {
        this._super();
        this.initWithFile( 'images/spaceBg.png' );
        
        this.isSlow = false;
        this.started = false;
        this.gravity = BGLayer.GRAVITY;
        this.slowRate = 0;

        this.scheduleUpdate();
    },

    update: function(dt) {
        if(!this.isSlow){
            this.updateBGLayer();
        }
        else{
            if(this.slowRate % 2 == 0){
                this.updateBGLayer();
            }
        }
        this.slowRate++;
    },

    updateBGLayer: function(){
        if( this.started ){
            var pos = this.getPosition();

            if( pos.y <= - screenHeight / 2 + 50 ){
                this.setPosition( new cc.Point( pos.x, screenHeight + screenHeight / 2 - 50 ) );
            }
            else{
                this.setPosition( new cc.Point( pos.x, pos.y + this.gravity ) );
            }
        }
    },

    activateSlow: function(isSlow){
        this.isSlow = isSlow;
    },

    start: function(){
        this.started = true;
    },

    stop: function(){
        this.started = false;
    }
    
});

BGLayer.GRAVITY = -0.8;