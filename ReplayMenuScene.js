class ReplayMenuScene{
    constructor(game){
        this.game = game
        this.name = "play-again-menu"
    }
    draw(){
        let ctx = this.game.ctx;
        ctx.font = "80px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("you lost", this.game.width/2,this.game.height/2);
        ctx.font = "30px Arial";
        ctx.fillText("Press R to play again", this.game.width/2,this.game.height/2+90);
        ctx.fillText("Press M to go to main menu", this.game.width/2,this.game.height/2+130);
    }
    keyDown(key){
        if(key == 82){this.game.changeScene("main")}
        if(key == 77){this.game.changeScene("main-menu")}
    }
}