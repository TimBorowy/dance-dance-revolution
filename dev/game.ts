
class Game {

    public screen:any
    public songTitle:string
    public score:Score
    
    constructor(){
        this.score = new Score()
        this.songTitle = 'around_the_world'
        this.screen = null
        this.screen = new TitleScreen(this)
    }

    public startGameLoop(){
        this.gameLoop()
    }


    private gameLoop():void{
        //console.log(this.screen)
        /* if(
            this.screen instanceof GameScreen || 
            this.screen instanceof TitleScreen ||
            this.screen instanceof EndScreen
        ){ */
            this.screen.update() 
        //}

        // next loop after 10 miliseconds
        setTimeout(() => this.gameLoop(), 10)
    }

    public showGameScreen(){
        document.body.innerHTML = ''

        this.screen = null
        this.screen = new GameScreen(this)
    }

    public showEndScreen(){
        document.body.innerHTML = ''
        this.screen = null
        this.screen = new EndScreen(this)
    }
       
}

window.addEventListener("load", () => new Game())