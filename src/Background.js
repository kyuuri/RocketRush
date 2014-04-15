var Background = cc.Sprite.extend({
	ctor: function() {
        this._super();
        this.initWithFile( 'images/spaceBg.png' );
        this.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );

        this.littleStars =[];

        for(var i = 0 ; i < LittleStar.NUM ; i++){
        	this.littleStars.push(new LittleStar());

        	this.littleStars[i].randomPosition();
            this.addChild(this.littleStars[i] , 0);
            this.littleStars[i].scheduleUpdate();

        }
    },
});