var SkillBar = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/skill1bar.png' );
        this.setScale(0.2);

        this.grayBar = new cc.Sprite();
        this.grayBar.initWithFile( 'images/skill1barGray.png' );
        this.grayBar.setAnchorPoint( 1.0 , 0.5 );
        this.grayBar.setPosition( new cc.Point( 958 , 130 / 2 ) );

        this.setBar(1.0);

        this.addChild( this.grayBar );
    },

    setBar: function(value){
        //decrease from left
        var realValue = 1.0 - value;

        this.grayBar.setScaleX(realValue);
    }
});