var Cloud = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/cloud.png' );
        this.setScale(0.5 + (Math.floor(Math.random() * 3))/10);
        this.gravity = -2 + Math.floor(Math.random() * Cloud.GRAVITY);

        this.isSlow = false;
        this.slowRate = 0;

        this.started = false;
    },

    update: function(dt) {
        if(!this.isSlow){
            this.updateCloud();
        }
        else{
            if(this.slowRate % 2 == 0){
                this.updateCloud();
            }
        }
        this.slowRate++;
    },

    updateCloud: function(){
        if(this.started){
            var pos = this.getPosition();

            if(pos.y < -500){
                this.randomPosition();
            }
            else{
                this.setPosition(new cc.Point(pos.x, pos.y + this.gravity));
            }
        }
    },

    activateSlow: function(isSlow){
        this.isSlow = isSlow;
    },

    randomPosition: function() {
        var posx = 1 + Math.floor(Math.random() * screenWidth);
        var posy = 1 + Math.floor(Math.random() * screenHeight);
        this.setPosition(new cc.Point(posx, screenHeight + posy + 700));
    },

    start: function(){
        this.started = true;
    },

    stop: function(){
        this.started = false;
    }

});

Cloud.GRAVITY = -10;
Cloud.SCALE = 0.8;
