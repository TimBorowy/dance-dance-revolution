class Score{
    public score:number
    private element:HTMLElement

    constructor(){
        this.score = 0
        this.element = document.createElement('score')
        let background = document.querySelector('gameBackground')
        if(background != null){
            background.appendChild(this.element)
        }

        this.element.innerText = `Score: ${this.score}`
    }

    public scoreUp(newScore:number){
        this.score += newScore
        this.element.innerText = `Score: ${this.score}`
    }
    
}