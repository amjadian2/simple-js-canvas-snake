class MainMenu{
    constructor(game){
        this.game = game 
        this.name = "main-menu"
    }
    draw(){
        let ctx = this.game.ctx;
        ctx.fillStyle = "red"
        ctx.font = "80px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Snake Game", this.game.width/2,this.game.height/2);
        ctx.font = "30px Arial";
        ctx.fillText("Press Enter to start", this.game.width/2,this.game.height/2+90);
        ctx.fillText("Press S to change the speed", this.game.width/2,this.game.height/2+130);
        // ctx.fillText("Press R to play again", this.game.width/2,this.game.height/2+90);
    }
    keyDown(key){
        if(key ==83){this.game.changeScene("speed-menu")}
        if(key ==13){this.game.changeScene("main")}
    }
}