var DA2_DarkSpiral = DropAlgorithm.extend({
    ctor: function( gameLayer ) {
        this._super();
        this.gameLayer = gameLayer;

        this.rateTime = -100;

        for( var i = 1 ; i <= 30 ; i++ ){
            this.obstacleCreators.push( new ObstacleCreator( this.gameLayer ) );
        }

    },

    playCutInName: function(){
        this.cutin = new CutIn();
        this.cutin.initWithFile( 'images/DeadSpiral.png' );
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
        this.secondSet();
        this.thirdSet();

    },

    firstSet: function(){

        if( this.rateTime == 100 ){
            this.first = true;
            this.stRun = 0;
            this.point = [];

            this.point.push( new cc.Point( 100, screenHeight - 100 ) );
            this.point.push( new cc.Point( screenWidth - 100, screenHeight - 100 ) );
            this.point.push( new cc.Point( screenWidth - 100, 100 ) );
            this.point.push( new cc.Point( 100, 100 ) );
            this.point.push( new cc.Point( screenWidth / 2 , screenHeight - 50 ) );
        }

        if( this.first ){

            if( this.rateTime % 10 == 0 && this.stRun < 5 ){
                this.gameLayer.addChild( this.obstacleCreators[ this.stRun ] , 10);
                this.obstacleCreators[ this.stRun ].setPosition( this.point[ this.stRun ] );

                if( this.stRun == 4){
                    for( var i = 5 ; i <= 13  ; i++ ){
                        this.gameLayer.addChild( this.obstacleCreators[i] , 10);
                        this.obstacleCreators[i].setPosition( this.point[4] );
                        if( i == 9 ) continue;
                        this.obstacleCreators[i].obstacles[0] = new AdvancedObstacle1();
                    }
                    this.obstacleCreators[ this.stRun ].obstacles[0] = new AdvancedObstacle1();
                }

                this.stRun++;
            }

            if( this.rateTime % 100 == 0 && this.stRun == 5 && this.rateTime < 500 ){
                for( var i = 0 ; i < 4 ; i++ ){
                    //crossNum, interval, repeat, delay, v
                    this.obstacleCreators[i].shootCross( 10, 0, 0, 0, 12 );
                }
            }

            if( this.rateTime % 25 == 0 && this.stRun == 5 && this.rateTime >= 550 ){
                var num = ( ( this.rateTime * 4 / 100) + 2 ) % 4;
                this.obstacleCreators[ num ].shootCross( 10, 0, 0, 0, 14 );
                
            }

            if( this.rateTime % 50 == 0 && this.stRun == 5 && this.rateTime < 500 ){
                var num = (this.rateTime * 2 / 100) % 5 + 4;
                this.obstacleCreators[ num ].shootLockOn( 0, 0, 0, 4 );
            }

            if( this.rateTime % 50 == 0 && this.stRun == 5 && this.rateTime >= 550 ){
                this.obstacleCreators[5].shootLockOn( 0, 0, 0, 20 );
                this.obstacleCreators[9].shootLockOn( 0, 0, 0, 20 );
            }

            if( this.rateTime == 850 ){
                this.first = false;
            }

        }
    },

    secondSet: function(){
        if( this.rateTime == 900 ){
            this.second = true;
            this.ndRunner = 0;

            for( var i = 0 ; i < 4 ; i++ ){
                var moveToCenter = cc.MoveTo.create( 0.75 , cc.p( screenWidth / 2, screenHeight / 2 ) );
                this.obstacleCreators[i].runAction( moveToCenter );
            }

            for( var i = 4 ; i <= 10  ; i++ ){
                this.obstacleCreators[i].obstacles[0] = new ObstacleTest();
            }
        }

        if( this.second && this.rateTime >= 950 ){
            if( this.rateTime % 25 == 0){
                var num = ( this.rateTime * 4 / 100 ) % 4;
                //spiralNum, interval, repeat, delay, v
                this.obstacleCreators[ num ].shootSpiral( 5, 0, 0, 0, 8 );
                this.obstacleCreators[ num + 4 ].shootLockOn( 0, 0, 0, 16 );
            }
        }

        if( this.rateTime == 1300 ){
            this.second = false;
        }
    },

    thirdSet: function(){
        if( this.rateTime == 1350 ){
            this.third = true;
            this.obstacleCreators[10].obstacles[0] = new AdvancedObstacle1();

            this.cutin = new CutIn();
            this.gameLayer.addChild( this.cutin, 100 );
            this.cutin.setPosition( new cc.p( screenWidth + 420, screenHeight / 2 ) );
            this.cutin.play();
        }

        if( this.third && this.rateTime >= 1400 ){
            if( this.rateTime % 25 == 0){
                var num = ( this.rateTime * 4 / 100 ) % 4;
                //spiralNum, interval, repeat, delay, v
                this.obstacleCreators[ num ].shootSpiral( 8, 0, 0, 0, 8 );
                this.obstacleCreators[ num + 4 ].shootCross( 20, 0, 0, 0, 8 )
            }

            if( this.rateTime % 50 == 0){
                var num = ( this.rateTime * 2 / 100 ) % 4;
                this.obstacleCreators[ num + 10 ].shootLockOn( 0, 0, 0, 6 );
            }
        }

        if( this.rateTime == 1850 ){
            this.third = false;
            this.rdRunner = 0;
        }

        if( this.rateTime == 1900 ){

            this.cutin = new CutIn();
            this.cutin.initWithFile( 'images/complete.png' );
            this.gameLayer.addChild( this.cutin, 100 );
            this.cutin.setPosition( new cc.p( screenWidth + 420, screenHeight / 2 ) );
            this.cutin.play();

            this.addLife();
            this.gameLayer.addScore(3500);
        }

        if( this.rateTime >= 1900 && this.rdRunner < 14){
            if( this.rateTime % 2 == 0 ){
                this.obstacleCreators[ this.rdRunner ].removeFromParent();
                this.obstacleCreators[ this.rdRunner ] = new ObstacleCreator( this.gameLayer );
                this.rdRunner++;
            }      
        }

        if( this.rateTime == 1950 ){
            this.isFinished = true;
        }
    },



});
