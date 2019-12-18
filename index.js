window.onload = () => {
    const canvas = document.getElementById('theCaves');

    const ctx = canvas.getContext('2d');
    //Ball variables
    let ballPositionX = 400;
    let ballPositionY = 300;
    let ballRadius = 10;
    let ballVelocityX = 2;
    let ballVelocityY = 1;

    //Players Variables
    let player1UpKeyPressed = false;
    let player1DownKeyPressed = false;
    let player2UpKeyPressed = false;
    let player2DownKeyPressed = false;
    let paddle1X = 15;
    let paddle1Y = 50;
    let paddlesWidth = 15;
    let paddlesHeight = 50;
    let paddle2X = 770;
    let paddle2Y = 50;
    let paddle1Velocity = 0;
    let paddle2Velocity = 0;


    //Keys Events
    document.addEventListener('keydown', keyDownListener);
    document.addEventListener('keyup', keyUpListener);

    //Score
    let player1Score = 0;
    let player2Score = 0;
    let whatPlayerIsPointer = 0;

    //KeysEvents Final

    //Main Function
    main();
    
    function main() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        
        drawBall();
        drawPaddles();
    }
    

    //Main Function Final








    //Functions

    function drawBall() {
        verifyIfCollision();
        ballPositionX += ballVelocityX;
        ballPositionY += ballVelocityY;
        ctx.beginPath();
        ctx.arc(ballPositionX, ballPositionY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddles() {

        if(player1UpKeyPressed) {
            paddle1Velocity = -4;
        }
        else if(player1DownKeyPressed) {
            paddle1Velocity = 4;
        }

        else {
            paddle1Velocity = 0;
        }

        paddle1Y += paddle1Velocity;
        if(paddle1Y <= 0) {
            paddle1Y = 0;
        }
        else if(paddle1Y + paddlesHeight >= canvas.height) {
            paddle1Y = canvas.height - paddlesHeight;
        }

        ctx.beginPath();
        ctx.rect(paddle1X, paddle1Y, paddlesWidth, paddlesHeight);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
        //Paddle 2

        if(player2UpKeyPressed) {
            paddle2Velocity = -4;
        }
        else if(player2DownKeyPressed) {
            paddle2Velocity = 4;
        }

        else {
            paddle2Velocity = 0;
        }

        paddle2Y += paddle2Velocity;
        if(paddle2Y <= 0) {
            paddle2Y = 0;
        }
        else if(paddle2Y + paddlesHeight >= canvas.height) {
            paddle2Y = canvas.height - paddlesHeight;
        }
        ctx.beginPath();
        ctx.rect(paddle2X, paddle2Y, paddlesWidth, paddlesHeight);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
    }

    function keyDownListener(e) {
        if(e.key == "w") {
            player1UpKeyPressed = true;
        }

        else if(e.key == "ArrowUp") {
            player2UpKeyPressed = true;
        }

        else if(e.key == "s") {
            player1DownKeyPressed = true;
        }
        else if(e.key == "ArrowDown") {
            player2DownKeyPressed = true;
        }
    }

    function keyUpListener(e) {
        
        if(e.key == "w") {
            player1UpKeyPressed = false;
        }

        else if(e.key == "ArrowUp") {
            player2UpKeyPressed = false;
        }

        else if(e.key == "s") {
            player1DownKeyPressed = false;
        }
        else if(e.key == "ArrowDown") {
            player2DownKeyPressed = false;
        }
        
    }

    function verifyIfCollision() {
        if((ballPositionY > paddle1Y 
            && ballPositionY < paddle1Y + paddlesHeight) || (ballPositionY > paddle2Y 
            && ballPositionY < paddle2Y + paddlesHeight)) {
                
                if(ballPositionX <= 30 || ballPositionX >= paddle2X) {
                    ballVelocityY = -1 * (ballVelocityX);
                    ballVelocityX = -1 * (ballVelocityX);
                }
        }

        else if(ballPositionX > 775 || ballPositionX < 15) {
            if(ballVelocityX > 0) {
                player1Score++;
                
                document.getElementById('player1Score').innerHTML = `${player1Score}`;
                
                
            }
            else {
                player2Score++;
                
                document.getElementById('player2Score').innerHTML = `${player2Score}`;
                
                
            }
            const lastBallVelocityX = ballVelocityX;
            ballVelocityY = 0;
            ballVelocityX = 0;
            setTimeout(() => {
                
                if(lastBallVelocityX > 0) {
                    ballVelocityY = 2;
                    ballVelocityX = 2;
                }
                else {
                    ballVelocityY = -2;
                    ballVelocityX = -2;
                }
                
            },2000)
            ballPositionX = 400;
            ballPositionY = 300;
            
            
        }

        if(ballPositionY + ballRadius >= canvas.height || ballPositionY - ballRadius <= 0) {
            ballVelocityY = -ballVelocityY;
        }
    }
    

    const interval = setInterval(main, 10);
}