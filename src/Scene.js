var FirstScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var director = cc.Director.getInstance();
        director.replaceScene(cc.TransitionFade.create( 1, new Home() ) );
    }
});

var Home = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new HomeLayer();

        layer.init();

        this.addChild( layer );
    },
});

var HomeLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        var bg = new cc.Sprite();
        bg.initWithFile( 'images/firstPage.png' );
        bg.setPosition( cc.p( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( bg );

        this.text = new BlinkText();
        this.text.setPosition( cc.p( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.text );
        this.text.scheduleUpdate();

        this.setMouseEnabled( true );
    },

    onMouseDown: function(){
        var director = cc.Director.getInstance();
        director.replaceScene(cc.TransitionFade.create( 1, new HTPScene() ) );
    },
});

var HTPScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new HTPLayer();

        layer.init();

        this.addChild( layer );
    },
});

var HTPLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        var bg = new cc.Sprite();
        bg.initWithFile( 'images/howToPlay.png' );
        bg.setPosition( cc.p( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( bg );

        this.text = new BlinkText();
        this.text.setScale(0.6);
        this.text.setPosition( cc.p( screenWidth / 2 + 150, screenHeight / 2 - 150 ) );
        this.addChild( this.text );
        this.text.scheduleUpdate();

        this.setMouseEnabled( true );
    },

    onMouseDown: function(){
        var director = cc.Director.getInstance();
        director.replaceScene(cc.TransitionFade.create( 1, new StartScene() ) );
    },
});

var BlinkText = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/clickToPlay.png' );

        this.rate = 0;
    },

    update: function(){
        this.rate++;
        if( this.rate % 40 == 0 ){
            this.setOpacity( 255 );
        }
        else if( this.rate % 20 == 0 ){
            this.setOpacity( 0 );
        }
    }

});

var StartScene = cc.Scene.extend({
    ctor: function( diff, sound) {
        this._super();
        var layer = new GameLayer();
        layer.init();

        //layer.setColor( new cc.Color3B(100,149,237) );
        this.addChild( layer );
    }

});