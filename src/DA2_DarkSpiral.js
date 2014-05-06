var DA2_DarkSpiral = DropAlgorithm.extend({
    ctor: function( gameLayer ) {
        this._super();
        this.gameLayer = gameLayer;

        this.rateTime = 0;

        for( var i = 1 ; i <= 30 ; i++ ){
            this.obstacleCreators.push( new ObstacleCreator( this.gameLayer ) );
        }

    },

    updateDA: function(){
        this.rateTime++;

        this.firstSet();
        this.secondSet();
        //this.thirdSet();

        if( this.rdRunner == 30){
            this.isFinished = true;
        }

    },

    firstSet: function(){

        if( this.rateTime == 200 ){
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

            if( this.rateTime % 20 == 0 && this.stRun < 5 ){
                this.gameLayer.addChild( this.obstacleCreators[ this.stRun ] , 10);
                this.obstacleCreators[ this.stRun ].setPosition( this.point[ this.stRun ] );

                if( this.stRun == 4){
                    for( var i = 5 ; i < 10  ; i++ ){
                        this.gameLayer.addChild( this.obstacleCreators[i] , 10);
                        this.obstacleCreators[i].setPosition( this.point[4] );
                        if( i == 9 ) continue;
                        this.obstacleCreators[i].obstacles[0] = new AdvancedObstacle1();
                    }
                    this.obstacleCreators[ this.stRun ].obstacles[0] = new AdvancedObstacle1();
                }

                this.stRun++;
            }

            if( this.rateTime % 200 == 0 && this.stRun == 5 && this.rateTime < 900 ){
                for( var i = 0 ; i < 4 ; i++ ){
                    //crossNum, interval, repeat, delay, v
                    this.obstacleCreators[i].shootCross( 10, 0, 0, 0, 6 );
                }
            }

            if( this.rateTime % 50 == 0 && this.stRun == 5 && this.rateTime >= 900 ){
                var num = ( this.rateTime * 2 / 100) % 4;
                this.obstacleCreators[ num ].shootCross( 10, 0, 0, 0, 7 );
                
            }

            if( this.rateTime % 100 == 0 && this.stRun == 5 && this.rateTime < 900 ){
                var num = (this.rateTime / 100) % 5 + 4;
                this.obstacleCreators[ num ].shootLockOn( 0, 0, 0, 2 );
            }

            if( this.rateTime % 100 == 0 && this.stRun == 5 && this.rateTime >= 900 ){
                this.obstacleCreators[5].shootLockOn( 0, 0, 0, 10 );
                this.obstacleCreators[9].shootLockOn( 0, 0, 0, 10 );
            }

            if( this.rateTime == 1500 ){
                this.first = false;
            }

        }
    },

    secondSet: function(){
        if( this.rateTime == 1600 ){
            this.second = true;
            this.ndRunner = 0;

            for( var i = 0 ; i < 4 ; i++ ){
                var moveToCenter = cc.MoveTo.create( 1/2, cc.p( screenWidth / 2, screenHeight / 2 ) );
                this.obstacleCreators[i].runAction( moveToCenter );
            }
        }

        if( this.second && this.rateTime >= 1700 ){
            if( this.rateTime % 50 == 0){
                var num = ( this.rateTime * 2 / 100 ) % 4;
                //spiralNum, interval, repeat, delay, v
                this.obstacleCreators[ num ].shootSpiral2( 6, 0, 0, 0, 1 );
            }
        }
    },

    thirdSet: function(){
        if( this.rateTime == 1600 ){
            this.third = true;
            for ( var i = 20 ; i < 30; i++) {
                this.obstacleCreators[i].obstacles[0] = new AdvancedObstacle1();
                this.obstacleCreators[i].obstacles[1] = new AdvancedObstacle1();
                this.obstacleCreators[i].obstacles[2] = new AdvancedObstacle1();
                this.obstacleCreators[i].obstacles[3] = new AdvancedObstacle1();
            }
        }

        if( this.third ){
            if( this.rateTime % 51 == 0){
                this.obstacleCreators[0].shootMultiArc( 1, 0, 0, 0, 14, -90 );
            }

            if( this.rateTime % 63 == 0){
                this.obstacleCreators[1].shootMultiArc( 1, 0, 0, 0, 12, -90 );
            }

            if( this.rateTime % 71 == 0){
                this.obstacleCreators[2].shootMultiArc( 1, 0, 0, 0, 13, -90 );
            }

            if( this.rateTime % 80 == 0){
                this.obstacleCreators[3].shootMultiArc( 1, 0, 0, 0, 15, -90 );
            }

            if( this.rateTime % 90 == 0){
                this.obstacleCreators[4].shootMultiArc( 1, 0, 0, 0, 12, -90 );
            }

            if( this.rateTime % 56 == 0){
                this.obstacleCreators[5].shootMultiArc( 1, 0, 0, 0, 12, -90 );
            }

            if( this.rateTime % 62 == 0){
                this.obstacleCreators[6].shootMultiArc( 1, 0, 0, 0, 14, -90 );
            }

            if( this.rateTime % 77 == 0){
                this.obstacleCreators[7].shootMultiArc( 1, 0, 0, 0, 12, -90 );
            }

            if( this.rateTime % 83 == 0){
                this.obstacleCreators[8].shootMultiArc( 1, 0, 0, 0, 16, -90 );
            }

            if( this.rateTime % 65 == 0){
                this.obstacleCreators[9].shootMultiArc( 1, 0, 0, 0, 12, -90 );
            }

            if( this.rateTime % 100 == 0){
                for( var i = 10 ; i < 20 ; i++ ){
                     this.obstacleCreators[i].shootLockOn( 0, 0, 0, -( i % 9 - 17 ) );
                }
            }

            if( this.rateTime % 200 == 0){
                this.obstacleCreators[25].shootLockOn( 0, 0, 0, 7 );
            }

            if( this.rateTime >= 1900 ){
                if( this.rateTime % 100 == 0){
                    this.obstacleCreators[23].shootMultiArc( 3, 0, 0, 0, 14, -90 );
                    this.obstacleCreators[27].shootMultiArc( 3, 0, 0, 0, 14, -90 );
                }
            }
        }

        if( this.rateTime == 2500){
            this.third = false;
            this.rdRunner = 0;
        }

        if( this.rateTime >= 2500 && this.rdRunner < 30){

            if( this.rateTime % 4 == 0 ){
                this.obstacleCreators[ this.rdRunner ].removeFromParent();
                this.obstacleCreators[ this.rdRunner ] = new ObstacleCreator( this.gameLayer );
                this.rdRunner++;
            }      
        }
    },



});
