"use strict";
var Game = (function () {
    function Game() {
        var _this = this;
        this.rotate = 0;
        this.rotateLimit = 360;
        this.songTitle = 'around_the_world_short';
        this.beatCount = 0;
        this.songTimeCodes = [];
        fetch("songs/" + this.songTitle + ".beatmap.js")
            .then(function (response) { return response.json(); })
            .then(function (data) { return _this.successHandler(data); })
            .catch(function (error) { return _this.errorHandler(error); });
        this.score = new Score();
        this.notes = new Array();
        this.key = new Key('left', this);
        this.key = new Key('up', this);
        this.key = new Key('down', this);
        this.key = new Key('right', this);
    }
    Game.prototype.successHandler = function (data) {
        this.songTimeCodes = data;
        this.song = new stasilo.BeatDetector({
            sens: 16,
            visualizerFFTSize: 256,
            analyserFFTSize: 256,
            passFreq: 200,
            url: "songs/" + this.songTitle + ".mp3",
        });
        this.gameLoop();
    };
    Game.prototype.errorHandler = function (data) {
        console.log(data);
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.song.getElapsedTime() > this.songTimeCodes[0] - 4) {
            this.generateNote();
            this.songTimeCodes.shift();
            console.log("elapsed time: ", this.song.getElapsedTime());
            console.log("beat timcode: ", this.songTimeCodes[0] - 4);
        }
        if (this.song.isOnBeat()) {
            this.beatCount++;
            if (this.beatCount % 2 == 0) {
            }
        }
        if (this.score.score > 500) {
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
        setTimeout(function () { return _this.gameLoop(); }, 10);
    };
    Game.prototype.showPlayScreen = function () {
        document.body.innerHTML = '';
        this.screen = new GameScreen();
    };
    Game.prototype.generateNote = function () {
        var randNum = Math.floor(Math.random() * 4) + 1;
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
var GameScreen = (function () {
    function GameScreen(game) {
        this.game = game;
    }
    GameScreen.prototype.update = function () {
    };
    return GameScreen;
}());
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
        this.yPos -= (window.innerHeight - 80) / 400;
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