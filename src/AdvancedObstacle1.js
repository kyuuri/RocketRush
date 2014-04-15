var AdvancedObstacle1 = Obstacle.extend({
	ctor: function() {
        this._super();
        this.initWithFile( 'images/advancedObstacle.png' );
        this.setScale(AdvancedObstacle1.SCALE);
        this.gravity = -2 + Math.floor(Math.random() * Obstacle.GRAVITY);

        this.isSlow = false;
        this.slowRate = 0;

        this.started = false;
    },

    getType: function(){
    	return 1;
    },

    closeTo: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();

        var isHit = ((Math.abs(myPos.x - oPos.x) <= 20 * AdvancedObstacle1.SCALE) &&
        		   (Math.abs(myPos.y - oPos.y) <= 20 *AdvancedObstacle1.SCALE));

        if(obj.isSlow){
        	return false;
        }
        return isHit; 
    }
});

AdvancedObstacle1.SCALE = 3.5;