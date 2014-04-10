var Bomb = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/fireRing.png' );

        this.angle = 0;
        this.scale = 0.2;
        this.scaleAcc = 0.02;
        this.active = false;
    },

    update: function(){
    	this.scaleAcc += 0.02;
    	this.scale += this.scaleAcc;
    	this.setScale(this.scale);
    	this.angle += 20;
    	this.spin(this.angle);

    	if(this.angle == 360){
    		this.angle = 0; // reset angle value
    	}

    	if(this.scale > 7.0){
    		this.removeFromParent();
    		this.resetValue();
    	}

    },

    spin: function(angle){
    	this.setRotation(angle);
    },

    resetValue: function(){
    	this.angel = 0;
    	this.scale = 0.2;
    	this.scaleAcc = 0.02;
    	this.active = false;
    },

    closeTo: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();

        return ((Math.abs(myPos.x - oPos.x) <= 500 * this.scale) &&
         (Math.abs(myPos.y - oPos.y) <= 500 * this.scale));
    },

    activeBomb: function(){
    	this.active = true;
    }

});