class Note {
    public direction:string
    public xPos:number
    public yPos:number
    private game:Game

    private note:HTMLElement
    constructor(direction:string, game:Game){
        this.game = game

        this.direction = direction
        this.xPos = 0

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

        this.yPos = window.innerHeight - 100

        this.note = document.createElement('note')
        document.body.appendChild(this.note)

        this.note.style.backgroundImage = `url(images/${this.direction}.gif)`
        this.note.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`
        
    }

    public move(){
        this.yPos -= (window.innerHeight - 80) / 400 // magic!
        this.note.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`
    }

    public remove(){
        this.note.remove()
        this.game.removeNote(this)
    }

    
}