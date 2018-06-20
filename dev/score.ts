class Score{
    private _score:ScoreObject
    private element:HTMLElement
    public highScore:any

    constructor(){
        this._score = {
            totalScore: 0,
            perfect: 0,
            great: 0,
            nice: 0
        }
        this.element = document.createElement('score')
        let storage = window.localStorage.getItem('highScore')

        if(storage === null){
            console.log('new')
            this.highScore = new Array()
            window.localStorage.setItem('highScore', this.highScore.toString())
        }else{
            this.highScore = storage.split(',')
        }    
    }

    public showScore(){
        let background = document.querySelector('gameBackground')
        
        if(background != null){
            background.appendChild(this.element)
        }

        this.element.innerText = `Score: ${this.score.totalScore}`
    }

    public saveScore(){
        window.localStorage.setItem('highScore', this.highScore.push(this.score.totalScore))
    }

    public resetScore(){
        this._score = {
            totalScore: 0,
            perfect: 0,
            great: 0,
            nice: 0
        }
    }

    public scoreUp(newScore:number){
        this._score.totalScore += newScore
        this.element.innerText = `Score: ${this.score.totalScore}`
    }

    public perfectUp(){
        this._score.perfect ++
    }

    public greatUp(){
        this._score.great ++
    }

    public niceUp(){
        this._score.nice ++
    }

    get score(){
        return this._score
    }
    
}