// Game constants and variables
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3")
const musicSound = new Audio("music/music.mp3")
let snakeVelocity = { x:0 , y:0};
let speed = 5;
let lastPaintTime =0;
let snakeArr = [
    { x : 13 , y: 15}
]
let food = {x :12 , y: 2};
let score =0;
let hiScoreVal = 0;

// Game function
function main(ctime){                           // Act as game loop
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine(){
    // Part 1 : Updating the snake and food 
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        snakeVelocity = { x:0 , y:0};

        alert(`GAME OVER !!\nYour score is ${score}`);
        alert("Presss any key to restart!!");
        snakeArr = [{ x : 13 , y: 15}]          // reseting to default value i.e only head remains
        score = 0;
        speed = 5;
    }

    // If you have eaten the food then increment score and regenerate food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){                // snakeArr[0] is the position of the head
        foodSound.play();
        score+=1;
        if(score > hiScoreVal){
            hiScoreVal = score;
            localStorage.setItem("HighScore" , JSON.stringify(hiScoreVal));
            let h = document.getElementById("HighScore");
            h.innerHTML = "HighScore : " + hiScoreVal ;
        }
        if(score%5==0){                                                  // incrementing the speed after each 5 food eating
            speed+=2;                           
        }
        let s = document.getElementById("score");
        s.innerHTML = "Score : " + score;
        snakeArr.unshift({x :snakeArr[0].x + snakeVelocity.x , y : snakeArr[0].y + snakeVelocity.y}); // incresing snake body
        // Regenerating food at random position
        let a = 2;
        let b = 16;
        food = {  x : Math.round(a + (b-a)*Math.random()) , y : Math.round(a + (b-a)*Math.random()) };
    }

    
    // Moving the snake
    for (let i = snakeArr.length-2; i >=0 ; i--) {
        snakeArr[i+1] ={...snakeArr[i] } ;          // Triple Dot to avoid refrencing problem by making it a new object
    }
    snakeArr[0].x += snakeVelocity.x;
    snakeArr[0].y += snakeVelocity.y;



    // Part 2 : Display the snake and food
    // Dispaly the snake head
    box.innerHTML = "";
    snakeArr.forEach((e , index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0){
            snakeElement.classList.add("head");
        }
        else
            snakeElement.classList.add("snake_body");
        box.appendChild(snakeElement);  
        
    })

    // Display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add("food");
        box.appendChild(foodElement); 

}

function isCollide(snakeArr){
    // If you bump into yourself
    for(let i=1 ;i<snakeArr.length ;i++){
        // If head is equal to any of the body part
        if(snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y){
            return true;
        }
    }
    // If you bump into the wall 
    if(snakeArr[0].x>=18 || snakeArr[0].x<=0 || snakeArr[0].y>=18 || snakeArr[0].y<=0){
        return true;
    }
    return false;
} 


// Main logic starts here

let hiscore = localStorage.getItem("HighScore");
if(hiscore === null){
    hiScoreVal = 0 ; 
    localStorage.setItem("HighScore" , JSON.stringify(hiScoreVal));
}
else{
    hiScoreVal = JSON.parse(hiscore);
    let h = document.getElementById("HighScore");
    h.innerHTML = "HighScore : " + hiScoreVal ;
}

window.requestAnimationFrame(main) ;             // instead of setInterval useing this as animation is used and h=gives high FPS

window.addEventListener('keydown' , e =>{
    snakeVelocity = { x :0 , y: 1};         //  Starts the game
    moveSound.play();
    // musicSound.play();
    switch (e.key){
        case  "ArrowUp" :
            console.log("ArrowUp");
            snakeVelocity.x = 0;
            snakeVelocity.y = -1;
            break;

        case  "ArrowDown" :
            console.log("ArrowDown");
            snakeVelocity.x = 0;
            snakeVelocity.y = 1;
            break;

        case  "ArrowRight" :
            console.log("ArrowRight");
            snakeVelocity.x = 1;
            snakeVelocity.y = 0;
            break;

        case  "ArrowLeft" :
            console.log("ArrowLeft");
            snakeVelocity.x = -1;
            snakeVelocity.y = 0;
            break;

        default :
            break ;
    }
})