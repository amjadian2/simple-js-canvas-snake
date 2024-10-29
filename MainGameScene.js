// this is the main game with the food and the snake 
class MainGameScene{
    constructor(game){
        fpsInterval = 1000 / FPS;
        let snake = {}
        snake.head = {} 
        snake.tail = {}
        snake.head.value = [10,10]
        snake.head.last = snake.tail 
        snake.head.next = null
        snake.tail.value = [11,10]
        snake.tail.next = snake.head 
        snake.tail.last = null
        this.name = "main"
        this.mode = "game"
        this.game = game 
        this.gridx = game.gridSizeX
        this.gridy = game.gridSizeY
        this.snake = snake  
        this.snakeSize = 2
        this.score = 0
        this.food = [Math.floor(Math.random() * (this.gridx-1))
                    ,Math.floor(Math.random() * (this.gridy-1))]
        this.superFood = false
        this.foodScore = 1
        this.superFoodScore = 5
        this.foodCount = 1
        this.move = [1,0]
        this.keyqueue = []
    }
    // this will be the main draw method executing every frame
    draw(){
        if(this.mode == "game"){this.gameDraw()}
        if(this.mode == "pause"){this.pauseDraw()}
    }
    gameDraw(){
        this.keyPressed(this.keyqueue.shift())
        this.moveSnake()
        this.checkFood()
        if(this.checkDeath()){this.game.changeScene("play-again-menu")}
        this.drawSnake()
        this.drawFood()
        this.printScore()
    }
    pauseDraw(){
        this.keyPressed(this.keyqueue.shift())
        let ctx = this.game.ctx;
        ctx.font = "80px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Pause", this.game.width/2,this.game.height/2);
        ctx.font = "30px Arial";
        ctx.fillText("Press R to play again", this.game.width/2,this.game.height/2+90);
        ctx.fillText("Press M to go to main menu", this.game.width/2,this.game.height/2+130);
        ctx.fillText("Press P to unpause", this.game.width/2,this.game.height/2+170);
    }

    drawUI(){
        
    }

    drawSnake(){
        let s = this.snake.head
        while(s){
            this.game.color(s.value,"green")
            s = s.last 
        }
    }

    drawFood(){
        let color = this.superFood ? "yellow" : "red"
        this.game.color(this.food , color)
    }

    printScore(){
        let ctx = this.game.ctx
        ctx.font = "30px Arial"
        ctx.fillStyle = "white";
        ctx.textAlign = "left"
        ctx.fillText(this.score, 10,40);
    }
    moveSnake(){
        this.addToSnakeHead(this.move)
        this.outOfBoundCheck()
        this.snake.tail = this.snake.tail.next 
        this.snake.tail.last = null
    }
    // checks if snake is out of bound
    outOfBoundCheck(){
        let head = this.snake.head.value
        if(head[0] >= this.gridx){head[0] = 0}
        if(head[0] < 0){head[0] = this.gridx-1}
        if(head[1] >= this.gridy){head[1] = 0}
        if(head[1] < 0){head[1] = this.gridy-1}
    }

    addToSnakeHead(move){
        let newHead = {}
        newHead.value = [this.snake.head.value[0]+move[0],this.snake.head.value[1]+move[1]]
        newHead.last = this.snake.head 
        this.snake.head.next = newHead
        this.snake.head = newHead
    }

    addToSnakeTail(){
        let newTail = {}
        newTail.next = this.snake.tail
        this.snake.tail.last = newTail
        newTail.value = [this.snake.tail.value[0] - this.snake.tail.next[0],
                         this.snake.tail.value[1] - this.snake.tail.next[1]]
        this.snake.tail = newTail
    }

    checkDeath(){
        return this.isOnSnake(this.snake.head.value[0],this.snake.head.value[1],this.snake.head.last);
    }

    checkFood(){
        let [sx,sy] = this.snake.head.value
        let [fx,fy] = this.food
        if(sx == fx && sy == fy ){
            this.addToSnakeTail(this.move)
            this.score += this.superFood ? this.superFoodScore : this.foodScore
            // let [x,y] = [Math.floor(Math.random() * (this.gridx-1))
            //             ,Math.floor(Math.random() * (this.gridy-1))]
            let [x,y] = [Math.floor(Math.random() * (this.gridx-1))
                        ,Math.floor(Math.random() * (this.gridy-1))]
            while(this.isOnSnake(x,y)){
                [x,y] = [Math.floor(Math.random() * (this.gridx-1))
                        ,Math.floor(Math.random() * (this.gridy-1))]
            } 
            this.food = [x,y]
            this.foodCount ++ 
            if(this.foodCount == 5 && !this.superFood){
                this.superFood = true 
                this.foodCount = 0
            }else{
                this.superFood = false
            }
        
        }
    }
    isOnSnake(x,y,startAt = this.snake.head){
        let s = startAt
        while(s){
            if(x == s.value[0] && y == s.value[1]){
                return true 
            }
            s = s.last 
        }
        return false
    }
    keyPressed(key){
        let head = this.snake.head.value
        let headLast = this.snake.head.last.value
        if (key == 37 && head[0] != headLast[0]+1) {
            this.move = [-1,0]
        }
        else if (key == 38 && head[1] != headLast[1]+1) {
            this.move = [0,-1]
        }
        else if (key == 39 && head[0] != headLast[0]-1) {
            this.move = [1,0]
        }
        else if (key == 40 && head[1] != headLast[1]-1) {
            this.move = [0,1]
        }else if(key == 82){
            this.game.changeScene("main")
        }else if(key == 77){
            this.game.changeScene("main-menu")
        }else if(key == 80){
            this.mode = this.mode == "game" ? "pause" :"game"
        }
    }
    keyDown(key,event){
        console.log(event.key)
        if(!this.keyqueue.includes(key)){this.keyqueue.push(key)}
    }
}
