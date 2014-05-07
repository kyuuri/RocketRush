var DA1_FallenStar = DropAlgorithm.extend({
    ctor: function( gameLayer ) {
        this._super();
        this.gameLayer = gameLayer;

        this.rateTime = -100;

        for( var i = 1 ; i <= 30 ; i++ ){
            this.obstacleCreators.push( new ObstacleCreator( this.gameLayer ) );
        }

    },

    updateDA: function(){

        if( this.rateTime == 0 ){
            this.playCutInName();
        }

        this.rateTime++;

        this.firstSet();
        this.secondSet();
        this.thirdSet();
        this.forthSet();

        if( this.rateTime == 2300){

            this.cutin = new CutIn();
            this.cutin.initWithFile( 'images/complete.png' );
            this.gameLayer.addChild( this.cutin, 100 );
            this.cutin.setPosition( new cc.p( screenWidth + 420, screenHeight / 2 ) );
            this.cutin.play();

            this.addLife();
            this.gameLayer.addScore(3000);
        }

        if( this.rateTime == 2400 ){
            this.isFinished = true;
        }

    },

    playCutInName: function(){
        this.cutin = new CutIn();
        this.cutin.initWithFile( 'images/fallenStar.png' );
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

    firstSet: function(){

        if( this.rateTime == 100 ){
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

        if( this.rateTime == 150 || this.rateTime == 200 || 
            this.rateTime == 250 || this.rateTime == 300 ||
            this.rateTime == 350 || this.rateTime == 400 ){
            //arcNum, interval, repeat, delay, v, arcAngle
            this.obstacleCreators[0].shootMultiArc( 4, 0, 0, 0, 19, -135 );
            this.obstacleCreators[1].shootMultiArc( 4, 0, 0, 0, 19, -45 );
        }

        if( this.rateTime == 150 || this.rateTime == 200 ||
            this.rateTime == 250 || this.rateTime == 300 ||
            this.rateTime == 350 ){
            //interval, repeat, delay, v
            this.obstacleCreators[2].shootLockOn( 0, 0, 0, 20 );

            //interval, repeat, delay, v, angle
            //this.obstacleCreators[2].shootLine(0,0,0,16,-90);
        }

        if( this.rateTime == 175 || this.rateTime == 225 ||
            this.rateTime == 275 || this.rateTime == 325 ||
            this.rateTime == 375 ){
            //interval, repeat, delay, v
            this.obstacleCreators[3].shootLockOn( 0, 0, 0, 20 );
        }

        if( this.rateTime == 150 || this.rateTime == 375 ){
            this.obstacleCreators[4].shootLockOn( 0, 0, 0, 8 );
        }

        if( this.rateTime == 225 ){
            this.obstacleCreators[5].shootLockOn( 0, 0, 0, 10 );
        }

        if( this.rateTime == 300 ){
            this.obstacleCreators[6].shootLockOn( 0, 0, 0, 12 );
        }

        if( this.rateTime == 400){
            for( var i = 0 ; i < 7 ; i++ ){
                 this.obstacleCreators[i].removeFromParent();
                 this.obstacleCreators[i] = new ObstacleCreator( this.gameLayer );
            }
        }
    },

    secondSet: function(){
        if( this.rateTime == 450 ){
            this.second = true;
            this.ndRunner = 0;
        }

        if( this.second ){

            if( this.rateTime % 5 == 0){
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

        if( this.rateTime == 500 || this.rateTime == 600 || this.rateTime == 700 ){
            for( var i = 0 ; i < 10 ; i += 2 ){
                //arcNum, interval, repeat, delay, v, arcAngle
                this.obstacleCreators[i].shootMultiArc( 1, 0, 0, 0, 16, -90 );
            }

            this.obstacleCreators[20].shootMultiArc( 5, 0, 0, 0, 18, -60);
            this.obstacleCreators[21].shootLockOn( 0, 0, 0, 18 );
        }

        if( this.rateTime == 525 || this.rateTime == 625 || this.rateTime == 725 ){
            for( var i = 11 ; i < 20 ; i += 2 ){
                //arcNum, interval, repeat, delay, v, arcAngle
                this.obstacleCreators[i].shootMultiArc( 1, 0, 0, 0, 16, -90 );
            }

            //this.obstacleCreators[29].shootMultiArc( 5, 0, 0, 0, 18, -120);
            //this.obstacleCreators[28].shootLockOn( 0, 0, 0, 18 );
        }

        if( this.rateTime == 550 || this.rateTime == 650 || this.rateTime == 750 ){
            for( var i = 10 ; i < 20 ; i += 2 ){
                //arcNum, interval, repeat, delay, v, arcAngle
                this.obstacleCreators[i].shootMultiArc( 1, 0, 0, 0, 16, -90 );
            }
            
            this.obstacleCreators[29].shootMultiArc( 5, 0, 0, 0, 18, -120);
            this.obstacleCreators[28].shootLockOn( 0, 0, 0, 18 );
        }

        if( this.rateTime == 575 || this.rateTime == 675 || this.rateTime == 775 ){
            for( var i = 1 ; i < 10 ; i += 2 ){
                //arcNum, interval, repeat, delay, v, arcAngle
                this.obstacleCreators[i].shootMultiArc( 1, 0, 0, 0, 16, -90 );
            }

            //this.obstacleCreators[29].shootMultiArc( 5, 0, 0, 0, 18, -120);
            //this.obstacleCreators[28].shootLockOn( 0, 0, 0, 18 );
        }
    },

    thirdSet: function(){
        if( this.rateTime == 850 ){
            this.third = true;
            for ( var i = 20 ; i < 30; i++ ){
                for( var j = 0 ; j < 20 ; j++ ){
                    this.obstacleCreators[i].obstacles[j] = new AdvancedObstacle1();
                }
            }
        }

        if( this.third ){
            if( this.rateTime % 26 == 0){
                this.obstacleCreators[0].shootMultiArc( 1, 0, 0, 0, 29, -90 );
            }

            if( this.rateTime % 31 == 0){
                this.obstacleCreators[1].shootMultiArc( 1, 0, 0, 0, 24, -90 );
            }

            if( this.rateTime % 35 == 0){
                this.obstacleCreators[2].shootMultiArc( 1, 0, 0, 0, 24, -90 );
            }

            if( this.rateTime % 40 == 0){
                this.obstacleCreators[3].shootMultiArc( 1, 0, 0, 0, 28, -90 );
            }

            if( this.rateTime % 45 == 0){
                this.obstacleCreators[4].shootMultiArc( 1, 0, 0, 0, 24, -90 );
            }

            if( this.rateTime % 28 == 0){
                this.obstacleCreators[5].shootMultiArc( 1, 0, 0, 0, 28, -90 );
            }

            if( this.rateTime % 30 == 0){
                this.obstacleCreators[6].shootMultiArc( 1, 0, 0, 0, 27, -90 );
            }

            if( this.rateTime % 38 == 0){
                this.obstacleCreators[7].shootMultiArc( 1, 0, 0, 0, 28, -90 );
            }

            if( this.rateTime % 42 == 0){
                this.obstacleCreators[8].shootMultiArc( 1, 0, 0, 0, 24, -90 );
            }

            if( this.rateTime % 33 == 0){
                this.obstacleCreators[9].shootMultiArc( 1, 0, 0, 0, 25, -90 );
            }

            if( this.rateTime % 100 == 0){
                this.obstacleCreators[25].shootLockOn( 0, 0, 0, 16 );
            }

            if( this.rateTime >= 1000 ){

                if( this.rateTime % 100 == 0){
                    for( var i = 10 ; i < 20 ; i++ ){
                         this.obstacleCreators[i].shootLockOn( 0, 0, 0, -( i % 9 - 26 ) );
                    }
                }
            }
        }

        if( this.rateTime == 1450){
            this.third = false;
        }
    },

    forthSet: function(){

        if( this.rateTime == 1500 || this.rateTime == 1625 ){
            this.obstacleCreators[0].shootLine( 0, 0, 0, 6, -90 );
            this.obstacleCreators[9].shootLine( 0, 0, 0, 6, -90 );
        }

        if( this.rateTime == 1525 || this.rateTime == 1650 ){
            this.obstacleCreators[1].shootLine( 0, 0, 0, 6, -90 );
            this.obstacleCreators[8].shootLine( 0, 0, 0, 6, -90 );
        }

        if( this.rateTime == 1550 || this.rateTime == 1675 ){
            this.obstacleCreators[2].shootLine( 0, 0, 0, 6, -90 );
            this.obstacleCreators[7].shootLine( 0, 0, 0, 6, -90 );
        }

        if( this.rateTime == 1575 || this.rateTime == 1700 ){
            this.obstacleCreators[3].shootLine( 0, 0, 0, 6, -90 );
            this.obstacleCreators[6].shootLine( 0, 0, 0, 6, -90 );
        }

        if( this.rateTime == 1600 || this.rateTime == 1725 ){
            this.obstacleCreators[4].shootLine( 0, 0, 0, 6, -90 );
            this.obstacleCreators[5].shootLine( 0, 0, 0, 6, -90 );
        }

        if( this.rateTime == 1775 ){
            this.forth = true;
            this.fthShootRunner = 0;
            this.shooterTh = [ 0, 19, 1, 18, 2, 17, 3, 16, 4, 15, 5, 14,
                               6, 13, 7, 12, 8, 11, 9, 10 ];

            this.cutin = new CutIn();
            this.gameLayer.addChild( this.cutin, 100 );
            this.cutin.setPosition( new cc.p( screenWidth + 420, screenHeight / 2 ) );
            this.cutin.play();
        }

        if( this.forth ){


            if( this.rateTime % 5 == 0){
                var sh = this.shooterTh[ this.fthShootRunner++ ]
                this.obstacleCreators[ sh ].shootLockOn( 0, 0, 0, 16 );
                if( this.fthShootRunner == 20){
                     this.fthShootRunner = 0;
                }
            }

            if( this.rateTime >= 2000 && this.rateTime % 50 == 0 ){
                this.obstacleCreators[20].shootLockOn( 0, 0, 0, 20 );
                this.obstacleCreators[23].shootLockOn( 0, 0, 0, 20 );
                this.obstacleCreators[26].shootLockOn( 0, 0, 0, 20 );
                this.obstacleCreators[29].shootLockOn( 0, 0, 0, 20 );
            }

            if( this.rateTime == 2200 ){
                this.forth = false;
                this.forthRun = 0;
            }

        }

        if( this.rateTime >= 2250 && this.forthRun < 30){

            if( this.rateTime % 2 == 0 ){
                this.obstacleCreators[ this.forthRun ].removeFromParent();
                this.obstacleCreators[ this.forthRun ] = new ObstacleCreator( this.gameLayer );
                this.forthRun++;
            }      
        }
    },




});
