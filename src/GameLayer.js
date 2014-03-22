var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );


        this.setKeyboardEnabled( true );

        this.player = new Player();
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );

        this.obstacle = new Obstacle();
        this.obstacle.randomPosition();
        
        this.addChild( this.player, 1 );
        this.addChild( this.obstacle, 1 );

        this.player.scheduleUpdate();
        this.obstacle.scheduleUpdate();
        this.scheduleUpdate();

        return true;
    },

    onKeyDown: function(e) {
        this.player.startMove(e);
    },

    onKeyUp: function(e){
        this.player.stopMove(e);
    },

    update: function() {
        if(this.obstacle.closeTo(this.player)){
            this.obstacle.randomPosition();
        }
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2,
    DEAD: 3
};

