
class Key{
    private key:HTMLElement
    private direction:string
    private xPos:number
    private successThresholdLow:number = 65
    private successThresholdHigh:number = 95
    private game:Game

    constructor(direction:string, game:Game){
        this.direction = direction
        this.xPos = 0
        this.game = game

        let windowWidth:number = window.innerWidth / 2 - 200

        switch(this.direction) {
            case "left" : this.xPos = windowWidth;
            break;
    
            case "up" : this.xPos = windowWidth + 100;
            break;
    
            case "down" : this.xPos = windowWidth + 200;
            break;
    
            case "right" : this.xPos = windowWidth + 300;
            break;
        }

        
        this.key = document.createElement('key')
        document.body.appendChild(this.key)

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))

        // to be used when building longer press streaks
        //window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        this.key.style.transform = `translate(${this.xPos}px, 80px)`
        this.key.style.backgroundImage = `url(images/static_${this.direction}.png)`
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

                // when note y position is between the success thresholds
                if (note.yPos < this.successThresholdHigh && note.yPos > this.successThresholdLow) {

                    // add to score
                    this.game.score.scoreUp()

                    // remove note from screen
                    note.remove()
                }
            }
            if (e.keyCode == 38 && note.direction == "up") {

                if (note.yPos < this.successThresholdHigh && note.yPos > this.successThresholdLow) {

                    this.game.score.scoreUp()
                    note.remove()
                }
            }
            if (e.keyCode == 40 && note.direction == "down") {

                if (note.yPos < this.successThresholdHigh && note.yPos > this.successThresholdLow) {

                    this.game.score.scoreUp()
                    note.remove()
                }
            }
            if (e.keyCode == 39 && note.direction == "right") {

                if (note.yPos < this.successThresholdHigh && note.yPos > this.successThresholdLow) {

                    this.game.score.scoreUp()
                    note.remove()
                }
            }

        }
        
    }


    
}