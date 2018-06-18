class EndScreen{
    private game:Game

    constructor(game:Game){
        this.game = game
        
        let background = document.createElement('titleBackground')
        let start = document.createElement("start")
        let songChoice = document.createElement("songChoice")
        let menuBox = document.createElement('menuBox')
        let scoreTable = document.createElement('table')

        scoreTable.innerHTML = `
        <tr>
            <th>Score: ${}</th>
            <td></td>
        </tr>
        <tr>
            <th>Perfect: </th>
            <td></td>
        </tr>
        <tr>
            <th>Great: </th>
            <td></td>
        </tr>
        <tr>
            <th>Nice: </th>
            <td></td>
        </tr>
        <tr>
            <th>Miss: </th>
            <td></td>
        </tr>
        `
        songChoice.innerText = 'Klaar ja, goed gedaan. NOg een keertje?'
        start.innerText = 'JAAAA!!!'
        start.addEventListener("click", () => this.onClick())

        menuBox.appendChild(scoreTable)
        menuBox.appendChild(songChoice)
        menuBox.appendChild(start)

        document.body.appendChild(background)
        document.body.appendChild(menuBox)

        this.game.startGameLoop()
        console.log('endscreen')
    }

    public onClick(){
        console.log('click')
        this.game.showGameScreen()
    }


    public update(){
       
    }
}