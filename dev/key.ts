/// <reference path="gameElement.ts" />

class Key extends GameElement{

    private successThresholdLow:number = 65
    private successThresholdHigh:number = 95

    constructor(direction:string, game:GameScreen){

        super(game, 'key', direction)
        
        this.element = document.createElement('key')
        let background = document.querySelector('gameBackground')
        if(background != null){
            background.appendChild(this.element)
        }
        

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))

        // to be used when building longer press streaks
        //window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        this.element.style.transform = `translate(${this.xPos}px, 80px)`
        this.element.style.backgroundImage = `url(images/static_${this.direction}.png)`
    }

    private onKeyUp(e: KeyboardEvent){
        if(e.keyCode == 38){
            console.log("clickup")
        }
    }

    private onKeyDown(e: KeyboardEvent){
        // run through all active notes on screen
        for (let note of this.game.notes) {
            
            // when player presses left and a note direction is also left
            if (e.keyCode == 37 && note.direction == "left") {
                this.checkNotePosition(note) 
            }
            if (e.keyCode == 38 && note.direction == "up") {
                this.checkNotePosition(note)
            }
            if (e.keyCode == 40 && note.direction == "down") {
                this.checkNotePosition(note)
            }
            if (e.keyCode == 39 && note.direction == "right") {
                this.checkNotePosition(note)
            }
        }     
    }

    private checkNotePosition(note: Note){
        // when note y position is between the success thresholds
        let score:number
        if (note.yPos < this.successThresholdHigh && note.yPos > this.successThresholdLow) {
            score = 10

            if(note.yPos < this.successThresholdHigh -8 && note.yPos > this.successThresholdLow +8){
                score += 5
            }

            if(note.yPos < this.successThresholdHigh -12 && note.yPos > this.successThresholdLow +12){
                score += 10
            }

            // give user feedback
            new Feedback(score)

            // add to score
            this.game.score.scoreUp(score)
            
            // remove note from screen
            note.remove()
        }
        
    }


    
}