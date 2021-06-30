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
        let highScoreList = document.createElement('highScore')

        this.game.score.highScore = this.game.score.highScore.sort((a:number, b:number) => b - a);

        let highScore = document.createElement('textLine')
        highScore.innerText = 'Highscores:'

        highScoreList.appendChild(highScore)

        const limit = this.game.score.highScore.length <= 5 ? this.game.score.highScore.length : 5

        for(let i = 0; i < limit; i++){
            let temp = document.createElement('textLine')
            temp.innerText = this.game.score.highScore[i]
            highScoreList.appendChild(temp)
        }

        songChoice.innerText = `Playing: ${this.game.songTitle}`
        start.innerText = 'Click here to start the game'
        start.addEventListener("click", () => this.onClick())


        menuBox.appendChild(highScoreList)
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