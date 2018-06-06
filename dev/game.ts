
class Game {
    public notes: Array<Note>
    private key: Key
    private frame:number
    private spawnRate:number
    public score:Score
    private rotate:number = 0
    private rotateLimit:number = 360

    constructor(){
        this.frame = 0
        this.spawnRate = 50

        this.score = new Score()


        this.notes = new Array()
        
        this.key = new Key('left', this)
        this.key = new Key('up', this)
        this.key = new Key('down', this)
        this.key = new Key('right', this)

        this.gameLoop()
    }

    private gameLoop():void{

        if(this.frame++ % this.spawnRate === 0){
            this.generateNote()
        }


        

        if(this.score.score > 100){

            if(this.rotate < this.rotateLimit){
                this.rotate+=2
            }
            document.body.style.webkitTransformOrigin = 'center'
            document.body.style.transform = `rotate(${this.rotate}deg)`
        }


        for(let note of this.notes){
            note.move()

            if(note.yPos < 10){
                note.remove()
            }
        }

        this.key.update()

        requestAnimationFrame(()=> this.gameLoop())
    }

    private generateNote(){
        // Randomizes between 1 and 4
        let randNum:number = Math.floor(Math.random() * 4) + 1;

        if (randNum === 1) {

            this.notes.push(new Note("left"))

        }
        if (randNum === 2) {

            this.notes.push(new Note("right"))

        }
        if (randNum === 3) {

            this.notes.push(new Note("up"))
            
        }
        if (randNum === 4) {

            this.notes.push(new Note("down"))

        }
    }

     
} 

window.addEventListener("load", () => new Game())