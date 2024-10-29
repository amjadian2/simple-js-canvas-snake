class Game{
    constructor(canvas){
        this.width  = canvas.width
        this.height = canvas.height
        this.ctx    = canvas.getContext("2d")
        this.gridSizeX = 20
        this.gridSizeY = 20
        this.gridCellSizeX = this.width / this.gridSizeX  
        this.gridCellSizeY =  this.height / this.gridSizeY
        this.quit = false
        this.scenes = {}
        this.scenes["main"] = MainGameScene
        this.scenes["play-again-menu"] = ReplayMenuScene
        this.scenes["main-menu"] = MainMenu
        this.scenes["speed-menu"] = SpeedMenu
        // this.mainGameScene = new MainGameScene(this)
        this.activeScene = new this.scenes["main-menu"](this)
    }
    // this will color the chosen grid cell with the given color
    color(coord,color = "black"){
        let [x,y] = coord 
        let ctx = this.ctx 
        ctx.fillStyle = color
        // console.log(x*this.gridCellSizeX,y*this.gridCellSizeX,this.gridCellSizeX,this.gridCellSizeY)
        ctx.fillRect(x*this.gridCellSizeX,y*this.gridCellSizeX,this.gridCellSizeX,this.gridCellSizeY)
    }
    isOutOfBound(x,y){
        return (x >= this.gridSizeX || x < 0 || y >= this.gridSizeY || y < 0)
    }
    changeScene(scene){
        this.activeScene = null 
        this.activeScene = new this.scenes[scene](this) 
    }
    draw(){
        // console.log("g")
        if(this.quit){return}
        this.activeScene.draw()
    }

    keyDown(key,event){
        this.activeScene.keyDown(key,event)
    }

    onClick(x,y,event){
        this.activeScene.keyDown(x,y,event)
    }
}