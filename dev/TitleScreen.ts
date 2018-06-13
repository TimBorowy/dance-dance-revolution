class TitleScreen{
    private game:Game

    constructor(game:Game){
        this.game = game
        let background = document.createElement('titleBackground')
        let start = document.createElement("start")
        let songChoice = document.createElement("songChoice")
        let menuBox = document.createElement('menuBox')

        songChoice.innerText = `Playing: ${this.game.songTitle}`
        start.innerText = 'Click here to start the game'
        start.addEventListener("click", () => this.onClick())

        menuBox.appendChild(songChoice)
        menuBox.appendChild(start)

        document.body.appendChild(background)
        document.body.appendChild(menuBox)
        

        this.game.startGameLoop()
    }

    public onClick(){
        this.game.showGameScreen()
    }


    public update(){
    }
}