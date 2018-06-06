class Note {
    public direction:string
    public xPos:number
    public yPos:number

    private note:HTMLElement
    constructor(direction:string){

        this.direction = direction
        this.xPos = 0

        switch(this.direction) {

            case "left" : this.xPos = 350;
            break;
    
            case "up" : this.xPos = 450;
            break;
    
            case "down" : this.xPos = 550;
            break;
    
            case "right" : this.xPos = 650;
            break;
    
        }

        this.yPos = window.innerHeight - 100

        this.note = document.createElement('note')
        document.body.appendChild(this.note)

        this.note.style.backgroundImage = `url(images/${this.direction}.gif)`
        this.note.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`
        
    }

    public move(){
        this.yPos -= 4
        this.note.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`
    }

    public remove(){
        this.note.remove()
    }

    
}