
class Key{
    private key:HTMLElement
    private direction:string
    private xPos:number
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
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        this.key.style.transform = `translate(${this.xPos}px, 80px)`
        this.key.style.backgroundImage = `url(images/static_${this.direction}.png)`
    }

    public update(){

    }

    private onKeyUp(e: KeyboardEvent){
        if(e.keyCode == 38){
            console.log("clickup")
        }
    }

    private onKeyDown(e: KeyboardEvent){
        for (let note of this.game.notes) {

            if (e.keyCode == 37 && note.direction == "left") {

                if (note.yPos < 90 && note.yPos > 70) {

                    console.log("LEFT! ")
                    this.game.score.scoreUp()
                    note.remove()
                }
            }
            if (e.keyCode == 38 && note.direction == "up") {

                if (note.yPos < 90 && note.yPos > 70) {

                    console.log("UP! ")
                    this.game.score.scoreUp()
                    note.remove()
                }
            }
            if (e.keyCode == 40 && note.direction == "down") {

                if (note.yPos < 90 && note.yPos > 70) {

                    console.log("DOWN! ")
                    this.game.score.scoreUp()
                    note.remove()
                }
            }
            if (e.keyCode == 39 && note.direction == "right") {

                if (note.yPos < 90 && note.yPos > 70) {

                    console.log("RIGHT! ")
                    this.game.score.scoreUp()

                    note.remove()
                }
            }

        }
        
    }


    
}