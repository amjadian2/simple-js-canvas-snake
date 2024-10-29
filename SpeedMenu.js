class SpeedMenu{
    constructor(game){
        this.game = game 
        this.name = "speed-menu"
        this.value = FPS
    }
    draw(){
        let ctx = this.game.ctx;
        ctx.font = "80px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Speed : "+String(this.value), this.game.width/2,this.game.height/2);
        ctx.font = "30px Arial";
        ctx.textAlign = "left";
        ctx.fillText("press M to return to menu" , 10,40)
        ctx.fillText("press Enter to apply speed" , 10,80)
        ctx.fillText("use Arrow Up and Arrow Down to change speed" , 10,120)
    }
    keyDown(key){

        if(key ==77){this.game.changeScene("main-menu")}
        if(key ==13){
            FPS = Number(this.value)
            // startAnimating(FPS);
            fpsInterval = 1000/FPS
            this.game.changeScene("main-menu")
        }
        else if (key == 38 && this.value < 60) {
            this.value++
        }
        else if (key == 40 && this.value > 8) {
            this.value--
        }
    }
}
