var Bomb = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/powerRing.png' );

        this.angle = Bomb.INITIAL_ANGEL;
        this.scale = Bomb.INITIAL_SCALE;
        this.scaleAcc = Bomb.INITIAL_SCALEACC;
        this.active = Bomb.INITIAL_ACTIVE;

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

    	this.scaleAcc += 0.04;
    	this.scale += this.scaleAcc;
    	this.setScale(this.scale);
    	this.angle += 30;
    	this.spin(this.angle);

    	if(this.angle == 360){
    		this.angle = 0; // reset angle value
    	}

    	if(this.scale > 5.0){
    		this.removeFromParent();
    		this.resetValue();
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
Bomb.INITIAL_SCALEACC = 0.02;
Bomb.INITIAL_ACTIVE = false;

