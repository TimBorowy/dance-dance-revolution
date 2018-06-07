
class Game {
    public notes: Array<Note>
    public score:Score
    private key: Key

    private frame:number
    //private spawnRate:number

    private rotate:number = 0
    private rotateLimit:number = 360
    private song:any
    private songHasStarted:boolean = false

    constructor(){
        this.frame = 0
        //this.spawnRate = 50

        this.score = new Score()
        this.notes = new Array()
        
        this.key = new Key('left', this)
        this.key = new Key('up', this)
        this.key = new Key('down', this)
        this.key = new Key('right', this)

        this.song = new stasilo.BeatDetector({
            sens: 5,
            visualizerFFTSize: 256, 
            analyserFFTSize: 256, 
            passFreq: 600,
            url: "songs/get_ready_for_this.mp3"
        });
        this.song.setVolume(0)
        

        this.gameLoop()
    }

    private startSong(){
        let audio = new Audio('songs/get_ready_for_this.mp3');
        //setTimeout(() => {
            //audio.play();
        //},5000)
    }

    private gameLoop():void{

        /* if(this.frame++ % this.spawnRate === 0){
            this.generateNote()
        } */
        // if(!this.song.isOnBeat() && !this.songHasStarted){
        //     this.songHasStarted = true
        //     this.startSong()
        // }

        // when beat is detected
        if(this.song.isOnBeat()){
            this.frame++
            
            // create note every second beat
            if(this.frame % 2 == 0){
                this.generateNote()
            }
        }

        // when score is over a certain limit, rotate game
        if(this.score.score > 100){

            if(this.rotate < this.rotateLimit){
                this.rotate+=1
            }
            document.body.style.webkitTransformOrigin = 'center center'
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
        console.log(this.notes.length)

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