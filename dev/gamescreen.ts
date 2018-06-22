class GameScreen{
    
    public game:Game
    public notes: Array<Note>
    public feedback:Feedback
    private song:HTMLAudioElement
    public background:HTMLElement

    private songTimeCodes:Array<number>


    constructor(game:Game){
        
        this.game = game

        this.songTimeCodes = []

        this.background = document.createElement('gameBackground')
        document.body.appendChild(this.background)

        this.song = new Audio(`songs/${this.game.songTitle}.mp3`)

        // get beatmap of song and start song when received
        fetch(`songs/${this.game.songTitle}.beatmap.js`)
            .then(response => response.json())
            .then(data => this.successHandler(data))
            .catch(error => this.errorHandler(error))


        // generate score object
        this.game.score.showScore()
        // init note array
        this.notes = new Array()
        // generate key objects
        new Key('left', this)
        new Key('up', this)
        new Key('down', this)
        new Key('right', this)

        this.feedback = new Feedback(this)

    }

    private successHandler(data:Array<number>){
        this.songTimeCodes = data

        this.song.play()
        
        this.game.startGameLoop()
    }
    private errorHandler(data:string){
        console.log(data)
    }

    private generateNote(){

        let randNum:number = Math.floor(Math.random() * 4);

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
        if(this.song.currentTime > this.songTimeCodes[0] - 4 ){
            this.generateNote()

            this.songTimeCodes.shift()

        }
        
        // end game when notes are gone
        if(this.songTimeCodes.length <= 0 && this.notes.length <= 0){
            this.song.pause()
            console.log('klaar')
            this.game.score.saveScore()
            this.game.showEndScreen()
        }
        // when score is over a certain limit, rotate game
        /* if(this.score.score % 100 == 0 && this.score.score > 50){

            document.body.style.webkitTransformOrigin = 'center center'
            document.body.style.transform = `rotate(${this.rotate}deg)` 
        } */

        // loop all active notes
        for(let note of this.notes){

            // move note up
            note.move()

            // if note is out of range, remove note
            if(note.yPos < 10){
                note.remove()
                // give feedback that player missed the note
                this.feedback.giveFeedback()
            }
        }
    }
}