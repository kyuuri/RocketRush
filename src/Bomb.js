var Bomb = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/fireRing.png' );

        this.angle = 0;
        this.scale = 0.2;
    },

    update: function(){
    	this.scale += 0.1;
    	this.setScale(this.scale);
    	this.angle += 15;
    	this.spin(this.angle);

    	if(this.angle == 360){
    		this.angle = 0; // reset angle value
    	}

    },

    spin: function(angle){
    	this.setRotation(angle);
    }

});