class TitleScreen{
    private game:Game
    private introSound:HTMLAudioElement

    constructor(game:Game){
        this.game = game

        this.introSound = new Audio(`songs/introSound.mp3`)

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

        setTimeout(() => this.playIntroSound(), 1000)        

        this.game.startGameLoop()
    }

    private playIntroSound():void{
        this.introSound.play()
    }

    private onClick(){
        this.game.showGameScreen()
    }

    public update(){
    }
}