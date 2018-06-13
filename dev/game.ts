
class Game {
    public notes: Array<Note>
    public score:Score
    private key: Key

    private beatCount:number
    private rotate:number = 0
    private rotateLimit:number = 360
    private song:any

    private songTimeCodes:Array<number>
    private songTitle:string = 'around_the_world_short'

    constructor(){
        this.beatCount = 0
        this.songTimeCodes = []

        // get beatmap of song and start song when received
        fetch(`songs/${this.songTitle}.beatmap.js`)
            .then(response => response.json())
            .then(data => this.successHandler(data))
            .catch(error => this.errorHandler(error))


        // generate score object
        this.score = new Score()
        // init note array
        this.notes = new Array()
        // generate key objects
        this.key = new Key('left', this)
        this.key = new Key('up', this)
        this.key = new Key('down', this)
        this.key = new Key('right', this)
  
    }

    private successHandler(data:Array<number>){
        this.songTimeCodes = data
        this.song = new stasilo.BeatDetector({
            sens: 16,
            visualizerFFTSize: 256, 
            analyserFFTSize: 256, 
            passFreq: 200,
            url: `songs/${this.songTitle}.mp3`,
        });
        //this.song.setVolume(0)
        
        this.gameLoop()
    }
    private errorHandler(data:string){
        console.log(data)
    }

    private gameLoop():void{
        
        //  THIS SHIT IS IMPORTANT!!!
        if(this.song.getElapsedTime() > this.songTimeCodes[0] - 4 ){
            this.generateNote()
            this.songTimeCodes.shift()

            console.log("elapsed time: ", this.song.getElapsedTime())
            console.log("beat timcode: ", this.songTimeCodes[0] - 4)
        }
        

        // when beat is detected
        if(this.song.isOnBeat()){  
            this.beatCount++
            
            
            // create note every second beat
            if(this.beatCount % 2 == 0){

                //use this for generating beatmaps
                /* this.songTimeCodes.push(this.song.getElapsedTime())
                console.clear()
                console.log(this.songTimeCodes.toString()) */
                //this.generateNote()
                
            }
        }

        // when score is over a certain limit, rotate game
        if(this.score.score > 500){

            if(this.rotate < this.rotateLimit){
                this.rotate+=1
            }
            document.body.style.webkitTransformOrigin = 'center center'
            document.body.style.transform = `rotate(${this.rotate}deg)`
        }


        // loop all active notes
        for(let note of this.notes){

            // move note up
            note.move()

            // if note is out of range, remove note
            if(note.yPos < 10){
                note.remove()
            }
        }

        // next loop after 10 miliseconds
        setTimeout(() => this.gameLoop(), 10)
    }

    public showPlayScreen(){
        document.body.innerHTML = ''

        this.screen = new GameScreen()

    }

    private generateNote(){
        // Randomizes between 1 and 4
        let randNum:number = Math.floor(Math.random() * 4) + 1;

        if (randNum === 1) {

            this.notes.push(new Note("left", this))
        }
        if (randNum === 2) {

            this.notes.push(new Note("right", this))
        }
        if (randNum === 3) {

            this.notes.push(new Note("up", this))
        }
        if (randNum === 4) {

            this.notes.push(new Note("down", this))
        }
    }

    public removeNote(note:Note) {

        let index = this.notes.indexOf(note)
        this.notes.splice(index, 1);
    }
     
}

window.addEventListener("load", () => new Game())