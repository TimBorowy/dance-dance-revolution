
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
        // uncomment this and break the game
        // Appearently the gamescreen update bug is load bearing 😢
        // game starts and end condition is given immediately while game continues in the background
        // game can be restarted and it starts a new instance and overlays the sound on the old one

        // if(
        //     this.screen instanceof GameScreen || 
        //     this.screen instanceof TitleScreen ||
        //     this.screen instanceof EndScreen
        // ){ 
            //}
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