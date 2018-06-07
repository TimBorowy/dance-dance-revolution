"use strict";
var Game = (function () {
    function Game() {
        this.rotate = 0;
        this.rotateLimit = 360;
        this.songHasStarted = false;
        this.frame = 0;
        this.score = new Score();
        this.notes = new Array();
        this.key = new Key('left', this);
        this.key = new Key('up', this);
        this.key = new Key('down', this);
        this.key = new Key('right', this);
        this.song = new stasilo.BeatDetector({
            sens: 5,
            visualizerFFTSize: 256,
            analyserFFTSize: 256,
            passFreq: 600,
            url: "songs/get_ready_for_this.mp3"
        });
        this.song.setVolume(0);
        this.gameLoop();
    }
    Game.prototype.startSong = function () {
        var audio = new Audio('songs/get_ready_for_this.mp3');
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.song.isOnBeat()) {
            this.frame++;
            if (this.frame % 2 == 0) {
                this.generateNote();
            }
        }
        if (this.score.score > 100) {
            if (this.rotate < this.rotateLimit) {
                this.rotate += 1;
            }
            document.body.style.webkitTransformOrigin = 'center center';
            document.body.style.transform = "rotate(" + this.rotate + "deg)";
        }
        for (var _i = 0, _a = this.notes; _i < _a.length; _i++) {
            var note = _a[_i];
            note.move();
            if (note.yPos < 10) {
                note.remove();
            }
        }
        this.key.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.generateNote = function () {
        var randNum = Math.floor(Math.random() * 4) + 1;
        console.log(this.notes.length);
        if (randNum === 1) {
            this.notes.push(new Note("left", this));
        }
        if (randNum === 2) {
            this.notes.push(new Note("right", this));
        }
        if (randNum === 3) {
            this.notes.push(new Note("up", this));
        }
        if (randNum === 4) {
            this.notes.push(new Note("down", this));
        }
    };
    Game.prototype.removeNote = function (note) {
        var index = this.notes.indexOf(note);
        this.notes.splice(index, 1);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Key = (function () {
    function Key(direction, game) {
        var _this = this;
        this.successThresholdLow = 65;
        this.successThresholdHigh = 95;
        this.direction = direction;
        this.xPos = 0;
        this.game = game;
        var windowWidth = window.innerWidth / 2 - 200;
        switch (this.direction) {
            case "left":
                this.xPos = windowWidth;
                break;
            case "up":
                this.xPos = windowWidth + 100;
                break;
            case "down":
                this.xPos = windowWidth + 200;
                break;
            case "right":
                this.xPos = windowWidth + 300;
                break;
        }
        this.key = document.createElement('key');
        document.body.appendChild(this.key);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        this.key.style.transform = "translate(" + this.xPos + "px, 80px)";
        this.key.style.backgroundImage = "url(images/static_" + this.direction + ".png)";
    }
    Key.prototype.update = function () {
    };
    Key.prototype.onKeyUp = function (e) {
        if (e.keyCode == 38) {
            console.log("clickup");
        }
    };
    Key.prototype.onKeyDown = function (e) {
        for (var _i = 0, _a = this.game.notes; _i < _a.length; _i++) {
            var note = _a[_i];
            if (e.keyCode == 37 && note.direction == "left") {
                if (note.yPos < this.successThresholdHigh && note.yPos > this.successThresholdLow) {
                    this.game.score.scoreUp();
                    note.remove();
                }
            }
            if (e.keyCode == 38 && note.direction == "up") {
                if (note.yPos < this.successThresholdHigh && note.yPos > this.successThresholdLow) {
                    this.game.score.scoreUp();
                    note.remove();
                }
            }
            if (e.keyCode == 40 && note.direction == "down") {
                if (note.yPos < this.successThresholdHigh && note.yPos > this.successThresholdLow) {
                    this.game.score.scoreUp();
                    note.remove();
                }
            }
            if (e.keyCode == 39 && note.direction == "right") {
                if (note.yPos < this.successThresholdHigh && note.yPos > this.successThresholdLow) {
                    this.game.score.scoreUp();
                    note.remove();
                }
            }
        }
    };
    return Key;
}());
var Note = (function () {
    function Note(direction, game) {
        this.game = game;
        this.direction = direction;
        this.xPos = 0;
        var windowWidth = window.innerWidth / 2 - 200;
        switch (this.direction) {
            case "left":
                this.xPos = windowWidth;
                break;
            case "up":
                this.xPos = windowWidth + 100;
                break;
            case "down":
                this.xPos = windowWidth + 200;
                break;
            case "right":
                this.xPos = windowWidth + 300;
                break;
        }
        this.yPos = window.innerHeight - 100;
        this.note = document.createElement('note');
        document.body.appendChild(this.note);
        this.note.style.backgroundImage = "url(images/" + this.direction + ".gif)";
        this.note.style.transform = "translate(" + this.xPos + "px, " + this.yPos + "px)";
    }
    Note.prototype.move = function () {
        this.yPos -= 4;
        this.note.style.transform = "translate(" + this.xPos + "px, " + this.yPos + "px)";
    };
    Note.prototype.remove = function () {
        this.note.remove();
        this.game.removeNote(this);
    };
    return Note;
}());
var Score = (function () {
    function Score() {
        this.score = 0;
        this.element = document.createElement('score');
        document.body.appendChild(this.element);
        this.element.innerText = "Score: " + this.score;
    }
    Score.prototype.scoreUp = function () {
        this.score += 10;
        this.element.innerText = "Score: " + this.score;
    };
    return Score;
}());
//# sourceMappingURL=main.js.map