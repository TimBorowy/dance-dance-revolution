class EndScreen{
    private game:Game

    constructor(game:Game){
        this.game = game
        
        let background = document.createElement('titleBackground')
        let start = document.createElement("start")
        let songChoice = document.createElement("songChoice")
        let menuBox = document.createElement('menuBox')

        songChoice.innerText = 'Klaar ja, goed gedaan. NOg een keertje?'
        start.innerText = 'JAAAA!!!'
        start.addEventListener("click", () => this.onClick())

        menuBox.appendChild(songChoice)
        menuBox.appendChild(start)

        document.body.appendChild(background)
        document.body.appendChild(menuBox)

        this.game.startGameLoop()
    }

    public onClick(){
        console.log('click')
        this.game.showGameScreen()
    }


    public update(){
       
    }
}