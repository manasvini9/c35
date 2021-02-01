var ball;
var ballPosition;
var boxPosition; 
var database;

function setup(){
    createCanvas(500,500);
    
    //create a database inside the variable called db --> firebase.database()
    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //make the variable ballPosition refer to the 'position' entry in the database --> **database.ref('')**
    ballPosition = database.ref('box/position');

    //make the variable ballPOsition listen to the refered data --> **.on("value",function1,function2,...)**
    ballPosition.on("value",readPosition,showError)
}

function draw(){
    background("white");
    if(boxPosition!==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

}

function writePosition(x,y){
database.ref('ball/position').update({
    'x' : boxPosition.x + x,
    'y' : boxPosition.y + y
})
 
}

function readPosition(data){
//store the listened values inside the boxPosition variable --> data.val()
boxPosition = data.val();

ball.x = boxPosition.x;
ball.y = boxPosition.y;

}

function showError(){
console.log("There is an error")
}
