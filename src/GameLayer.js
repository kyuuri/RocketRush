var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );


        this.setKeyboardEnabled( true );

        this.state = GameLayer.STATES.FRONT;

        this.player = new Player();
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );

        this.obstacle = new Obstacle();
        this.obstacle.randomPosition();

        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 550, 750 ) );
        this.score = 0;
        
        this.addChild( this.player, 1 );
        this.addChild( this.obstacle, 1 );
        this.addChild( this.scoreLabel, 2 );

        this.player.scheduleUpdate();
        this.obstacle.scheduleUpdate();
        this.scheduleUpdate();

        return true;
    },

    onKeyDown: function(e) {
        if(this.state == GameLayer.STATES.FRONT){
            this.state = GameLayer.STATES.STARTED;
            this.player.start();
            this.obstacle.start();
        }
        if(this.state == GameLayer.STATES.STARTED){
            this.player.startMove(e);
        }
    },

    onKeyUp: function(e){
        if(this.state == GameLayer.STATES.STARTED){
            this.player.stopMove(e);
        }
    },

    update: function() {
        if(this.state == GameLayer.STATES.STARTED){
            if(this.obstacle.closeTo(this.player)){
                this.state.GameLayer.STATES.DEAD;
                this.player.stop();
                this.obstacle.stop();
            }
            this.scoreLabel.setString( ++this.score );
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

