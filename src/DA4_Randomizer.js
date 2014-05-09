var DA4_Randomizer = DropAlgorithm.extend({
    ctor: function( gameLayer ) {
        this._super();
        this.gameLayer = gameLayer;

        this.rateTime = -100;

        this.used = [];
        for( var i = 1 ; i <= 30 ; i++ ){
            this.obstacleCreators.push( new ObstacleCreator( this.gameLayer ) );
            this.used.push(false);
        }


    },

    playCutInName: function(){
        this.cutin = new CutIn();
        //this.cutin.initWithFile( 'images/ship1.png' );
        this.gameLayer.addChild( this.cutin, 100 );
        this.cutin.setPosition( new cc.p( screenWidth + 420, screenHeight / 2 ) );
        this.cutin.play();
    },

    addLife: function(){
        var hpFrom = this.gameLayer.player.health/2;

        this.gameLayer.player.health += 4;
        if( this.gameLayer.player.health > Player.MAXHP ){
            this.gameLayer.player.health = Player.MAXHP;
        }

        var hpTo = this.gameLayer.player.health/2;

        this.gameLayer.addLife( hpFrom, hpTo );

    },

    updateDA: function(){
        this.rateTime++;

        if( this.rateTime == 0 ){
            this.playCutInName();
        }

        this.firstSet();
        //this.secondSet();
        //this.thirdSet();

    },

    ranSpeed: function(){
        return Math.floor( Math.random() * 13 ) + 8;
    },

    ranShoot: function(){
        return Math.floor( Math.random() * 5 );
    },

    ranNum: function(){
        return Math.floor( Math.random() * 15 ) + 5;
    },

    ranAngle: function(){
        return -Math.floor( Math.random() * 120 ) - 30;
    },

    randomObstacleCreator: function(){
        var x = Math.floor( Math.random * 30 );
        console.log(x)
        while( this.used[x] ){
            x = Math.floor( Math.random * 30 );
        }
        this.used[x] = true;
        if( this.checkAllUse() ){
            this.used = [];
            for( var i = 1 ; i <= 30 ; i++ ){
                this.used.push(false);
            }
        }
        console.log(x)
        return this.obstacleCreators[x];
    },

    checkAllUse: function(){
        for( var i = 0 ; i < 30 ; i++ ){
            if( !this.used[i] ){
                return false;
            }
        }
        return true;
    },

    firstSet: function(){

        if( this.rateTime == 100 ){
            this.first = true;
            this.stRun = 0;
        }

        if( this.first ){

            if( this.rateTime % 2 == 0 && this.stRun < 30 ){
                this.gameLayer.addChild( this.obstacleCreators[ this.stRun ] , 10);
                this.obstacleCreators[ this.stRun ].setPosition( new cc.Point( screenWidth / 2, screenHeight - 50 ));

                this.stRun++;
            }
        }

        if( this.rateTime >= 200 && this.first ){
            if( this.rateTime % 50 == 0 ){
                var shoot = this.ranShoot();
                var shooter = this.randomObstacleCreator();

                if( shoot == 0 ){
                    //arcNum, interval, repeat, delay, v, arcAngle
                    shooter.shootMultiArc( this.ranNum(), 0, 0, 0, this.ranSpeed(), this.ranAngle() );
                }
                else if( shoot == 1 ){
                    //crossNum, interval, repeat, delay, v
                    shooter.shootCross( this.ranNum(), 0, 0, 0, this.ranSpeed() );
                }
                else if( shoot == 2 ){
                    //interval, repeat, delay, v
                    shooter.shootLockOn( 0, 0, 0, this.ranSpeed() );
                }
                else if( shoot == 3 ){
                    //spiralNum, interval, repeat, delay, v
                    shooter.shootCross( this.ranNum(), 0, 0, 0, this.ranSpeed() );
                }
                else if( shoot == 4 ){
                    //interval, repeat, delay, v, angle
                    shooter.shootCross( 0, 0, 0, this.ranSpeed() - 4, this.ranAngle() );
                }
            }

        }
    },

    // secondSet: function(){
       
    // },

    // thirdSet: function(){
        
    // },



});
