var DA1_FallenStar = DropAlgorithm.extend({
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
        this.thirdSet();

        if( this.rdRunner == 30){
            this.isFinished = true;
        }

    },

    firstSet: function(){

        if( this.rateTime == 200 ){
            for( var i = 0 ; i < 7 ; i++ ){
                this.gameLayer.addChild( this.obstacleCreators[i] , 10);
            }

            this.obstacleCreators[0].setPosition( new cc.Point( screenWidth - 50, screenHeight - 50 ));
            this.obstacleCreators[1].setPosition( new cc.Point( 50, screenHeight - 50 ));
            this.obstacleCreators[2].setPosition( new cc.Point( screenWidth / 2, screenHeight - 50 ));
            this.obstacleCreators[3].setPosition( new cc.Point( screenWidth / 2, screenHeight - 50 ));
            this.obstacleCreators[4].setPosition( new cc.Point( screenWidth / 2, screenHeight - 50 ));
            this.obstacleCreators[4].obstacles[0] = ( new AdvancedObstacle1() ) ;
            this.obstacleCreators[5].setPosition( new cc.Point( screenWidth / 2, screenHeight - 50 ));
            this.obstacleCreators[5].obstacles[0] = ( new AdvancedObstacle1() ) ;
            this.obstacleCreators[6].setPosition( new cc.Point( screenWidth / 2, screenHeight - 50 ));
            this.obstacleCreators[6].obstacles[0] = ( new AdvancedObstacle1() ) ;
        }

        if( this.rateTime == 300 || this.rateTime == 400 || 
            this.rateTime == 500 || this.rateTime == 600 ||
            this.rateTime == 700 ){
            //arcNum, interval, repeat, delay, v, arcAngle
            this.obstacleCreators[0].shootMultiArc( 4, 0, 0, 0, 9, -135 );
            this.obstacleCreators[1].shootMultiArc( 4, 0, 0, 0, 9, -45 );
        }

        if( this.rateTime == 300 || this.rateTime == 400 ||
            this.rateTime == 500 || this.rateTime == 600){
            //interval, repeat, delay, v
            this.obstacleCreators[2].shootLockOn( 0, 0, 0, 10 );
        }

        if( this.rateTime == 350 || this.rateTime == 450 ||
            this.rateTime == 550 || this.rateTime == 650){
            //interval, repeat, delay, v
            this.obstacleCreators[3].shootLockOn( 0, 0, 0, 10 );
        }

        if( this.rateTime == 300 ){
            this.obstacleCreators[4].shootLockOn( 0, 0, 0, 4 );
        }

        if( this.rateTime == 450 ){
            this.obstacleCreators[5].shootLockOn( 0, 0, 0, 5 );
        }

        if( this.rateTime == 600 ){
            this.obstacleCreators[6].shootLockOn( 0, 0, 0, 6 );
        }

        if( this.rateTime == 700){
            for( var i = 0 ; i < 7 ; i++ ){
                 this.obstacleCreators[i].removeFromParent();
                 this.obstacleCreators[i] = new ObstacleCreator( this.gameLayer );
            }
        }
    },

    secondSet: function(){
        if( this.rateTime == 800 ){
            this.second = true;
            this.ndRunner = 0;
        }

        if( this.second ){

            if( this.rateTime % 10 == 0){
                this.gameLayer.addChild( this.obstacleCreators[this.ndRunner] , 10);
                this.gameLayer.addChild( this.obstacleCreators[this.ndRunner+10] , 10);
                this.gameLayer.addChild( this.obstacleCreators[this.ndRunner+20] , 10);

                this.obstacleCreators[this.ndRunner].setPosition(
                new cc.Point( (screenWidth / 10) * ( this.ndRunner + 1 ) - 25 , screenHeight - 50 ));
                this.obstacleCreators[this.ndRunner+10].setPosition(
                new cc.Point( (screenWidth / 10) * ( this.ndRunner + 1 ) - 25 , screenHeight - 50 ));
                this.obstacleCreators[this.ndRunner+20].setPosition(
                new cc.Point( (screenWidth / 10) * ( this.ndRunner + 1 ) - 25 , screenHeight - 50 ));
                
                this.ndRunner++;
            }

            if(this.ndRunner == 10){
                this.second = false;
            }
        }

        if( this.rateTime == 900 || this.rateTime == 1100 || this.rateTime == 1300 ){
            for( var i = 0 ; i < 10 ; i += 2 ){
                //arcNum, interval, repeat, delay, v, arcAngle
                this.obstacleCreators[i].shootMultiArc( 1, 0, 0, 0, 8, -90 );
            }

            this.obstacleCreators[20].shootMultiArc( 5, 0, 0, 0, 10, -60);
            this.obstacleCreators[21].shootLockOn( 0, 0, 0, 9 );
        }

        if( this.rateTime == 950 || this.rateTime == 1150 || this.rateTime == 1350 ){
            for( var i = 11 ; i < 20 ; i += 2 ){
                //arcNum, interval, repeat, delay, v, arcAngle
                this.obstacleCreators[i].shootMultiArc( 1, 0, 0, 0, 8, -90 );
            }

            this.obstacleCreators[29].shootMultiArc( 5, 0, 0, 0, 10, -120);
            this.obstacleCreators[28].shootLockOn( 0, 0, 0, 9 );
        }

        if( this.rateTime == 1000 || this.rateTime == 1200 || this.rateTime == 1400 ){
            for( var i = 10 ; i < 20 ; i += 2 ){
                //arcNum, interval, repeat, delay, v, arcAngle
                this.obstacleCreators[i].shootMultiArc( 1, 0, 0, 0, 8, -90 );
            }
            
            this.obstacleCreators[20].shootMultiArc( 5, 0, 0, 0, 10, -60);
            this.obstacleCreators[21].shootLockOn( 0, 0, 0, 9 );
        }

        if( this.rateTime == 1050 || this.rateTime == 1250 || this.rateTime == 1450 ){
            for( var i = 1 ; i < 10 ; i += 2 ){
                //arcNum, interval, repeat, delay, v, arcAngle
                this.obstacleCreators[i].shootMultiArc( 1, 0, 0, 0, 8, -90 );
            }

            this.obstacleCreators[29].shootMultiArc( 5, 0, 0, 0, 10, -120);
            this.obstacleCreators[28].shootLockOn( 0, 0, 0, 9 );
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
