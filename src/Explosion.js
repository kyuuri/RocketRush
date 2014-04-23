var Explosion = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.setScale( 2.0 );
    },

    animateExplosion: function(){

        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile( 'images/ex1.png' );
        animation.addSpriteFrameWithFile( 'images/ex2.png' );
        animation.addSpriteFrameWithFile( 'images/ex3.png' );
        animation.addSpriteFrameWithFile( 'images/ex4.png' );
        animation.addSpriteFrameWithFile( 'images/ex5.png' );
        animation.addSpriteFrameWithFile( 'images/ex6.png' );
        animation.addSpriteFrameWithFile( 'images/ex7.png' );
        animation.addSpriteFrameWithFile( 'images/ex8.png' );
        animation.addSpriteFrameWithFile( 'images/ex9.png' );
      
        animation.setRestoreOriginalFrame( true );
        animation.setDelayPerUnit( 0.05 );
        return cc.Animate.create( animation );
    },




});

