var DropAlgorithm = cc.Sprite.extend({
    ctor: function() {
        this._super();

        this.isSlow = false;
        this.slowRate = 0;
        this.started = false;

        this.isFinished = false;

        this.rateTime = 0;

        this.obstacleCreators = [];

    },

    update: function( dt ){

        if( !this.isSlow ){
            this.updateDA();
        }
        else{
            if( this.slowRate % 2 == 0 ){
                this.updateDA();
            }
        }
        this.slowRate++;
    },

    updateDA: function(){
        this.rateTime++;
    },

    start: function(){
        this.started = true;
    },

    stop: function(){
        this.started = false;
    },

    activateSlow: function( isSlow ){
        this.isSlow = isSlow;

        for( var i = 0 ; i < this.obstacleCreators.length ; i++ ){
            this.obstacleCreators[i].activateSlow( isSlow );
        }
    },

});
