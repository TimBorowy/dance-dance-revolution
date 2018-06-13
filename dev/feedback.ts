class Feedback{
    private feedbackString:string
    private div:HTMLElement

    constructor(score:number = 0){
        this.feedbackString = ''
        this.div = document.createElement('feedback')
        this.div.style.transform = `translate(${window.innerWidth / 2 - 10}px, 20px)`

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

            document.body.appendChild(this.div)

            setTimeout(() => this.div.remove(), 400)
        }

    }
}