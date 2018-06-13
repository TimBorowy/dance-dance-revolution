class GameScreen{
    private game:Game

    public notes: Array<Note>
    public score:Score

    private song:any

    private songTimeCodes:Array<number>


    constructor(game:Game){
        this.game = game

        this.songTimeCodes = []

        let background = document.createElement('gameBackground')
        document.body.appendChild(background)


        // get beatmap of song and start song when received
        fetch(`songs/${this.game.songTitle}.beatmap.js`)
            .then(response => response.json())
            .then(data => this.successHandler(data))
            .catch(error => this.errorHandler(error))


        // generate score object
        this.score = new Score()
        // init note array
        this.notes = new Array()
        // generate key objects
        new Key('left', this)
        new Key('up', this)
        new Key('down', this)
        new Key('right', this)

    }

    private successHandler(data:Array<number>){
        this.songTimeCodes = data

        // remove this and use the normal audio api
        this.song = new stasilo.BeatDetector({
            sens: 16,
            visualizerFFTSize: 256, 
            analyserFFTSize: 256, 
            passFreq: 200,
            url: `songs/${this.game.songTitle}.mp3`,
        });
        //this.song.setVolume(0)
        
        this.game.startGameLoop()
    }
    private errorHandler(data:string){
        console.log(data)
    }

    private generateNote(){

        let randNum:number = Math.floor(Math.random() * 3);

        switch(randNum){
            case 0:
                this.notes.push(new Note("left", this))
                break;
            case 1:
                this.notes.push(new Note("right", this))
                break;
            case 2:
                this.notes.push(new Note("up", this))
                break;
            case 3:
                this.notes.push(new Note("down", this))
                break;
        }
    }

    public removeNote(note:Note) {

        let index = this.notes.indexOf(note)
        this.notes.splice(index, 1);
    }

    public update(){

        //  THIS SHIT IS IMPORTANT!!!
        if(this.song.getElapsedTime() > this.songTimeCodes[0] - 4 ){
            this.generateNote()
            this.songTimeCodes.shift()

            if(this.songTimeCodes.length <= 0){
                this.game.showEndScreen()
            }

            /* console.log("elapsed time: ", this.song.getElapsedTime())
            console.log("beat timcode: ", this.songTimeCodes[0] - 4) */
        }

        // when score is over a certain limit, rotate game
        /* if(this.score.score % 100 == 0 && this.score.score > 50){

            if(this.rotate < this.rotateLimit){
                this.rotate+=1
                document.body.style.webkitTransformOrigin = 'center center'
                document.body.style.transform = `rotate(${this.rotate}deg)`
            }
        } */


        // loop all active notes
        for(let note of this.notes){

            // move note up
            note.move()

            // if note is out of range, remove note
            if(note.yPos < 10){
                note.remove()
                // give feedback that player missed the note
                new Feedback()
            }
        }
    }
}