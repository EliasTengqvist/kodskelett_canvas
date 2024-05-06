
// class Obstacle {
//     constructor() {
//         this.color = "black"; 
//         this.height = 20; 
//         this.x = 5;
//         this.y = 5;
//     }

// }

// const obstaclesArray = [];

// class Obstacle{
//     constructor(){
//         this.top = (Math.random()* canvas.height/3)*20;
//         this.bottom = (Math.random()* canvas.height/3)*20;
//         this.x = canvas.width;
//         this.width = 20;
//         this.color = "rgb(0,0,0)";
//     }



// draw(){
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, 0, this.width, this.top);
//     ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
// }
// Update(){
//     this.x -= gamespeed;
// }
// }

// function handleObstacles(){
//     if (frame%50 === 0){
//         obstaclesArray.unshift(new Obstacle)
//     }
//     for (let i = 0; i < obstaclesArray.length; i++) {
//         obstaclesArray.update();
//     }
//     if (obstaclesArray.length > 20) {
//         obstaclesArray.pop(obstaclesArray[0]);
//     }
// }

