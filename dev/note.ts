/// <reference path="GameElement.ts" />


class Note extends GameElement{
    
    constructor(direction:string, game:GameScreen){

        super(game, 'note', direction)


        this.yPos = window.innerHeight - 100

        if(this.game.background != null){
            this.game.background.appendChild(this.element)
        }

        this.element.style.backgroundImage = `url(images/${this.direction}.gif)`
        this.element.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`
        
    }

    public move(){
        this.yPos -= (window.innerHeight - 180) / 400 // magic!
        this.element.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`
    }

    public remove(){
        this.element.remove()
        this.game.removeNote(this)

        
    }

    
}