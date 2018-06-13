class Score{
    public score:number
    protected game:GameScreen
    private element:HTMLElement

    constructor(game:GameScreen){

        this.game = game
        this.score = 0
        this.element = document.createElement('score')
        
        if(this.game.background != null){
            this.game.background.appendChild(this.element)
        }

        this.element.innerText = `Score: ${this.score}`
    }

    public scoreUp(newScore:number){
        this.score += newScore
        this.element.innerText = `Score: ${this.score}`
    }
    
}