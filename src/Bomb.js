var Bomb = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/fireRing.png' );

        this.angle = 0;
        this.scale = 0.2;
        this.scaleAcc = 0.02;
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
    }

});