var Bomb = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/fireRing.png' );

        this.angle = Bomb.INITIAL_ANGEL;
        this.scale = Bomb.INITIAL_SCALE;
        this.scaleAcc = Bomb.INITIAL_SCALEACC;
        this.active = Bomb.INITIAL_ACTIVE;

        this.acc = 0.02;
        this.opacity = 255;

        this.isSlow = false;
        this.slowRate = 0;
    },

    update: function(){
    	
    	if(!this.isSlow){
            this.updateBomb();
        }
        else{
            if(this.slowRate % 2 == 0){
                this.updateBomb();
            }
        }
        this.slowRate++;

    },

    updateBomb: function(){

    	this.scaleAcc += this.acc;
    	this.scale += this.scaleAcc;
    	this.setScale(this.scale);
    	this.angle += 60;
    	this.spin( this.angle );

    	if(this.angle == 360){
    		this.angle = 0; // reset angle value
    	}

        if( this.scale > 3.0 ){
            this.opacity -= 20;
            this.setOpacity( this.opacity );
        }

    	if( this.scale > 5.0 ){
    		this.resetValue();
            this.unscheduleUpdate();
            this.removeFromParent();
    	}
    },

    spin: function(angle){
    	this.setRotation(angle);
    },

    resetValue: function(){
        this.angle = Bomb.INITIAL_ANGEL;
        this.scale = Bomb.INITIAL_SCALE;
        this.scaleAcc = Bomb.INITIAL_SCALEACC;
        this.active = Bomb.INITIAL_ACTIVE;
        this.opacity = 255;
        this.setOpacity( this.opacity );
    },

    closeTo: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();

        if(oPos.y >= screenHeight){
            return false;
        }

        return ((Math.abs(myPos.x - oPos.x) <= 500 * this.scale) &&
         (Math.abs(myPos.y - oPos.y) <= 500 * this.scale));
    },

    activeBomb: function(){
    	this.active = true;
    },

    activateSlow: function(isSlow){
        this.isSlow = isSlow;
    }

});

Bomb.INITIAL_ANGEL = 0;
Bomb.INITIAL_SCALE = 0.2;
Bomb.INITIAL_SCALEACC = 0.06;
Bomb.INITIAL_ACTIVE = false;

