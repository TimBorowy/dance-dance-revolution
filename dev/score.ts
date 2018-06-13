class Score{
    public score:number
    private element:HTMLElement

    constructor(){
        this.score = 0
        this.element = document.createElement('score')
        document.body.appendChild(this.element)

        this.element.innerText = `Score: ${this.score}`
    }

    public scoreUp(){
        this.score += 10
        this.element.innerText = `Score: ${this.score}`
    }
    
}