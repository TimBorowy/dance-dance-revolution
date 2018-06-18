class Feedback{
    private feedbackString:string
    private feedbackColor:string
    private div:HTMLElement

    constructor(score:number = 0){
        this.feedbackString = ''
        this.div = document.createElement('feedback')
        this.div.style.transform = `translate(${window.innerWidth / 2 - 125}px, ${window.innerHeight / 2 - 200}px)`

        switch(score){
            case 10:
                this.feedbackString = 'NICE!'
                break;
            case 15:
                this.feedbackString = 'GREAT!'
                break;
            case 25:
                this.feedbackString = 'PERFECT!!!'
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