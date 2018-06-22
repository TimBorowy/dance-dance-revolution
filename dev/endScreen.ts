class EndScreen{
    
    private game:Game

    constructor(game:Game){
        this.game = game
        
        let background = document.createElement('titleBackground')
        let start = document.createElement("start")
        let songChoice = document.createElement("songChoice")
        let menuBox = document.createElement('menuBox')
        let perfectScore = document.createElement('textLine')
        let greatScore = document.createElement('textLine')
        let niceScore = document.createElement('textLine')
        let totalScore = document.createElement('textLine')
        let highScoreList = document.createElement('highScore')

        this.game.score.highScore = this.game.score.highScore.sort((a:number, b:number) => b - a);

        let highScore = document.createElement('textLine')
        highScore.innerText = 'Highscores:'

        highScoreList.appendChild(highScore)
        for(let i = 0; i < 5; i++){
            let temp = document.createElement('textLine')
            temp.innerText = this.game.score.highScore[i]
            highScoreList.appendChild(temp)
        }
        
        perfectScore.innerText = `Perfect score: ${this.game.score.score.perfect}`
        greatScore.innerText = `Great score: ${this.game.score.score.great}`
        niceScore.innerText = `Nice score: ${this.game.score.score.nice}`
        totalScore.innerText = `Total score: ${this.game.score.score.totalScore}`

        songChoice.innerText = `Goed gedaan! NOg een keertje?`
        start.innerText = 'JAAAA!!!'
        start.addEventListener("click", () => this.onClick())

        menuBox.appendChild(highScoreList)
        menuBox.appendChild(perfectScore)
        menuBox.appendChild(greatScore)
        menuBox.appendChild(niceScore)
        menuBox.appendChild(totalScore)
        menuBox.appendChild(songChoice)
        menuBox.appendChild(start)

        document.body.appendChild(background)
        document.body.appendChild(menuBox)

        this.game.startGameLoop()
        console.log('endscreen')
    }

    public onClick(){
        console.log('click')
        this.game.score.resetScore()
        this.game.showGameScreen()
    }


    public update(){
       
    }
}