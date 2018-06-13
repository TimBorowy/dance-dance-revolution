
class Game {
    private screen:any
    public songTitle:string
    

    constructor(){
        this.songTitle = 'around_the_world'
        this.screen = new TitleScreen(this)
    }

    public startGameLoop(){
        this.gameLoop()
    }


    private gameLoop():void{

        this.screen.update()    

        // next loop after 10 miliseconds
        setTimeout(() => this.gameLoop(), 10)
    }

    public showGameScreen(){
        document.body.innerHTML = ''

        this.screen = new GameScreen(this)
    }

    public showEndScreen(){
        document.body.innerHTML = ''

        this.screen = new EndScreen(this)
    }
       
}

window.addEventListener("load", () => new Game())