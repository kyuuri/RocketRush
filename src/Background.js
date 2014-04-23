var Background = cc.Sprite.extend({
	ctor: function() {
        this._super();

        this.bgLayer1 = new BGLayer();
        this.bgLayer2 = new BGLayer();

        this.bgLayer1.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.bgLayer2.setPosition( new cc.Point( screenWidth / 2, screenHeight + screenHeight / 2 - 50) );

        this.bgLayer1.scheduleUpdate();
        this.bgLayer2.scheduleUpdate();

        this.addChild( this.bgLayer1, 0 );
        this.addChild( this.bgLayer2, 0 ); 

        this.littleStars = [];

        for( var i = 0 ; i < LittleStar.NUM ; i++ ){
        	this.littleStars.push( new LittleStar() );

        	this.littleStars[i].randomPosition();
            this.addChild( this.littleStars[i] , 1 );
            this.littleStars[i].scheduleUpdate();
        }
    },

    activateSlow: function( isSlow ){
       	this.bgLayer1.activateSlow( isSlow );
       	this.bgLayer2.activateSlow( isSlow );

        for( var i = 0 ; i < LittleStar.NUM ; i++ ){
        	this.littleStars[i].activateSlow( isSlow );
        }
    },

    start: function(){
        this.bgLayer1.start();
       	this.bgLayer2.start();

        for( var i = 0 ; i < LittleStar.NUM ; i++ ){
        	this.littleStars[i].start();
        }
    },

    stop: function(){
        this.bgLayer1.stop();
       	this.bgLayer2.stop();

        for( var i = 0 ; i < LittleStar.NUM ; i++ ){
        	this.littleStars[i].stop();
        }
    },
});