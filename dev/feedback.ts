class Feedback{
    
    private feedbackString:string
    private div:HTMLElement
    private screen:GameScreen

    constructor(screen:GameScreen){

        this.screen = screen

        this.feedbackString = ''
        this.div = document.createElement('feedback')
        this.div.style.transform = `translate(${window.innerWidth / 2 - 125}px, ${window.innerHeight / 2 - 200}px)`
    }

    public giveFeedback(score:number = 0){
        switch(score){
            case 10:
                this.feedbackString = 'NICE!'
                this.screen.game.score.niceUp()
                break;
            case 15:
                this.feedbackString = 'GREAT!'
                this.screen.game.score.greatUp()
                break;
            case 25:
                this.feedbackString = 'PERFECT!!!'
                this.screen.game.score.perfectUp()
                break;
            default:
                this.feedbackString = "MISS!"
                break;
        }

        if(this.feedbackString != ''){

            
            this.div.innerText = this.feedbackString
            this.div.style.color = "rgb(41, 10, 219)"

            document.body.appendChild(this.div)

            setTimeout(() => this.div.remove(), 400)
        }
    }
}