window.onload = function () {
    values();
    setInterval(execute, 1000 / 60);
}

function values() {

    fieldElement = document.getElementById("field");
    fieldElement.height = window.innerHeight - 100;
    fieldElement.width  = window.innerWidth - 100;
    document.body.appendChild(fieldElement);
    areaDrawing = fieldElement.getContext("2d");
    

    widthField = fieldElement.width;
    heightField = fieldElement.height;
    widthLine = 5;

    diameterBall = 9;

    densityPlayer = 5;
    heightPlayer = 70;

    effectBall = 0.3;
    speedPlayer2 = 5;

    positionPlayer1 = positionPlayer2 = 150;
    positionBallX = widthField / 2;
    positionBallY = heightField / 2;
    speedPositionBallX = speedPositionBallY = 6;
    scorePlayer1 = scorePlayer2 = 0;
}


function drawField() {

    fieldElement.addEventListener('mousemove', function (e) {
        positionPlayer1 = e.clientY - heightPlayer / 2;
    });

    // Area field
    areaDrawing.fillStyle = '#1b5e20';
    areaDrawing.fillRect(0, 0, widthField, heightField);

    // line center
    areaDrawing.fillStyle = '#ffff';
    areaDrawing.fillRect(widthField / 2 - widthLine / 2, 0, widthLine, heightField);

    // player 1 
    areaDrawing.fillRect(0, positionPlayer1, densityPlayer, heightPlayer);

    // player 2 
    areaDrawing.fillRect(widthField - widthLine, positionPlayer2, densityPlayer, heightPlayer);

    // "ball"
    areaDrawing.fillRect(positionBallX - diameterBall / 2, positionBallY - diameterBall / 2, diameterBall, diameterBall);
    areaDrawing.font = '15pt Arial';
    areaDrawing.fillText("Human - " + scorePlayer1 + " Points", widthField / 5, 50);
    areaDrawing.fillText("Machine - " + scorePlayer2 + " Points", widthField / 2 + 400, 50);
}

function motion() {

    positionBallX += speedPositionBallX;
    positionBallY += speedPositionBallY;

    if (positionBallY < 0 && speedPositionBallY < 0) {
        speedPositionBallY = -speedPositionBallY;
    }

    if (positionBallY > heightField && speedPositionBallY > 0) {
        speedPositionBallY = -speedPositionBallY;
    }

    if (positionBallX < 0) {
        if (positionBallY > positionPlayer1 && positionBallY < positionPlayer1 + heightPlayer) {
            speedPositionBallX = -speedPositionBallX;

            var differenceY = positionBallY - (positionPlayer1 + heightPlayer / 2);
            speedPositionBallY = differenceY * effectBall;

        } else {
            scorePlayer2++;
            proceed();
        }
    }

    if (positionBallX > widthField) {
        if (positionBallY > positionPlayer2 && positionBallY < positionPlayer2 + heightPlayer) {

            speedPositionBallX = -speedPositionBallX;

            var differenceY = positionBallY - (positionPlayer2 + heightPlayer / 2);
            speedPositionBallY = differenceY * effectBall;
        } else {
            scorePlayer1++;
            proceed();
        }
    }

    if (positionPlayer2 + heightPlayer / 2 < positionBallY) {
        positionPlayer2 = positionPlayer2 + speedPlayer2;
    } else {
        positionPlayer2 = positionPlayer2 - speedPlayer2;
    }

    difficulty(scorePlayer1);
}

function proceed() {

    positionBallX = widthField / 2;
    positionBallY = heightField / 2;
    speedPositionBallX = -speedPositionBallX;
    speedPositionBallY = 3;
}

function difficulty(scorePlayer1){

    switch (scorePlayer1) {
        case 5:
            speedPlayer2 = 6;
            break;
        case 10:
            speedPlayer2 = 8;
            break;
        case 15:
            speedPlayer2 = 9;
            break;
        case 20:
            speedPlayer2 = 10;
            break;
        default:
            break;
    }

}

function execute() {
    drawField();
    motion();
}
