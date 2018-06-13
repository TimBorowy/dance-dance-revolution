"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TitleScreen = (function () {
    function TitleScreen(game) {
        var _this = this;
        this.game = game;
        var background = document.createElement('titleBackground');
        var start = document.createElement("start");
        var songChoice = document.createElement("songChoice");
        var menuBox = document.createElement('menuBox');
        songChoice.innerText = "Playing: " + this.game.songTitle;
        start.innerText = 'Click here to start the game';
        start.addEventListener("click", function () { return _this.onClick(); });
        menuBox.appendChild(songChoice);
        menuBox.appendChild(start);
        document.body.appendChild(background);
        document.body.appendChild(menuBox);
        this.game.startGameLoop();
    }
    TitleScreen.prototype.onClick = function () {
        this.game.showGameScreen();
    };
    TitleScreen.prototype.update = function () {
    };
    return TitleScreen;
}());
var EndScreen = (function () {
    function EndScreen(game) {
        var _this = this;
        this.game = game;
        var background = document.createElement('titleBackground');
        var start = document.createElement("start");
        var songChoice = document.createElement("songChoice");
        var menuBox = document.createElement('menuBox');
        songChoice.innerText = 'Klaar ja, goed gedaan. NOg een keertje?';
        start.innerText = 'JAAAA!!!';
        start.addEventListener("click", function () { return _this.onClick(); });
        menuBox.appendChild(songChoice);
        menuBox.appendChild(start);
        document.body.appendChild(background);
        document.body.appendChild(menuBox);
        this.game.startGameLoop();
    }
    EndScreen.prototype.onClick = function () {
        console.log('click');
        this.game.showGameScreen();
    };
    EndScreen.prototype.update = function () {
    };
    return EndScreen;
}());
var Feedback = (function () {
    function Feedback(score) {
        if (score === void 0) { score = 0; }
        var _this = this;
        this.feedbackString = '';
        this.div = document.createElement('feedback');
        this.div.style.transform = "translate(" + (window.innerWidth / 2 - 10) + "px, 20px)";
        switch (score) {
            case 10:
                this.feedbackString = 'NICE!';
                break;
            case 15:
                this.feedbackString = 'GREAT!';
                break;
            case 25:
                this.feedbackString = 'PERFECT!!!';
                break;
            default:
                this.feedbackString = "MISS!";
                break;
        }
        if (this.feedbackString != '') {
            this.div.innerText = this.feedbackString;
            document.body.appendChild(this.div);
            setTimeout(function () { return _this.div.remove(); }, 400);
        }
    }
    return Feedback;
}());
var Game = (function () {
    function Game() {
        this.songTitle = 'around_the_world';
        this.screen = new TitleScreen(this);
    }
    Game.prototype.startGameLoop = function () {
        this.gameLoop();
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.screen.update();
        setTimeout(function () { return _this.gameLoop(); }, 10);
    };
    Game.prototype.showGameScreen = function () {
        document.body.innerHTML = '';
        this.screen = new GameScreen(this);
    };
    Game.prototype.showEndScreen = function () {
        document.body.innerHTML = '';
        this.screen = new EndScreen(this);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameElement = (function () {
    function GameElement(game, elementName, direction) {
        this._direction = '';
        this._xPos = 0;
        this._yPos = 0;
        this.game = game;
        this.direction = direction;
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
        this.element = document.createElement(elementName);
    }
    Object.defineProperty(GameElement.prototype, "xPos", {
        get: function () {
            return this._xPos;
        },
        set: function (xPos) {
            this._xPos = xPos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "yPos", {
        get: function () {
            return this._yPos;
        },
        set: function (yPos) {
            this._yPos = yPos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (direction) {
            this._direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    return GameElement;
}());
var GameScreen = (function () {
    function GameScreen(game) {
        var _this = this;
        this.game = game;
        this.songTimeCodes = [];
        var background = document.createElement('gameBackground');
        document.body.appendChild(background);
        fetch("songs/" + this.game.songTitle + ".beatmap.js")
            .then(function (response) { return response.json(); })
            .then(function (data) { return _this.successHandler(data); })
            .catch(function (error) { return _this.errorHandler(error); });
        this.score = new Score();
        this.notes = new Array();
        new Key('left', this);
        new Key('up', this);
        new Key('down', this);
        new Key('right', this);
    }
    GameScreen.prototype.successHandler = function (data) {
        this.songTimeCodes = data;
        this.song = new stasilo.BeatDetector({
            sens: 16,
            visualizerFFTSize: 256,
            analyserFFTSize: 256,
            passFreq: 200,
            url: "songs/" + this.game.songTitle + ".mp3",
        });
        this.game.startGameLoop();
    };
    GameScreen.prototype.errorHandler = function (data) {
        console.log(data);
    };
    GameScreen.prototype.generateNote = function () {
        var randNum = Math.floor(Math.random() * 3);
        switch (randNum) {
            case 0:
                this.notes.push(new Note("left", this));
                break;
            case 1:
                this.notes.push(new Note("right", this));
                break;
            case 2:
                this.notes.push(new Note("up", this));
                break;
            case 3:
                this.notes.push(new Note("down", this));
                break;
        }
    };
    GameScreen.prototype.removeNote = function (note) {
        var index = this.notes.indexOf(note);
        this.notes.splice(index, 1);
    };
    GameScreen.prototype.update = function () {
        if (this.song.getElapsedTime() > this.songTimeCodes[0] - 4) {
            this.generateNote();
            this.songTimeCodes.shift();
            if (this.songTimeCodes.length <= 0) {
                this.game.showEndScreen();
            }
        }
        for (var _i = 0, _a = this.notes; _i < _a.length; _i++) {
            var note = _a[_i];
            note.move();
            if (note.yPos < 10) {
                note.remove();
                new Feedback();
            }
        }
    };
    return GameScreen;
}());
var Key = (function (_super) {
    __extends(Key, _super);
    function Key(direction, game) {
        var _this = _super.call(this, game, 'key', direction) || this;
        _this.successThresholdLow = 65;
        _this.successThresholdHigh = 95;
        var background = document.querySelector('gameBackground');
        if (background != null) {
            background.appendChild(_this.element);
        }
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        _this.element.style.transform = "translate(" + _this.xPos + "px, 80px)";
        _this.element.style.backgroundImage = "url(images/static_" + _this.direction + ".png)";
        return _this;
    }
    Key.prototype.onKeyDown = function (e) {
        for (var _i = 0, _a = this.game.notes; _i < _a.length; _i++) {
            var note = _a[_i];
            if (e.keyCode == 37 && note.direction == "left") {
                this.checkNotePosition(note);
            }
            if (e.keyCode == 38 && note.direction == "up") {
                this.checkNotePosition(note);
            }
            if (e.keyCode == 40 && note.direction == "down") {
                this.checkNotePosition(note);
            }
            if (e.keyCode == 39 && note.direction == "right") {
                this.checkNotePosition(note);
            }
        }
    };
    Key.prototype.checkNotePosition = function (note) {
        var score;
        if (note.yPos < this.successThresholdHigh && note.yPos > this.successThresholdLow) {
            score = 10;
            if (note.yPos < this.successThresholdHigh - 8 && note.yPos > this.successThresholdLow + 8) {
                score += 5;
            }
            if (note.yPos < this.successThresholdHigh - 12 && note.yPos > this.successThresholdLow + 12) {
                score += 10;
            }
            new Feedback(score);
            this.game.score.scoreUp(score);
            note.remove();
        }
    };
    return Key;
}(GameElement));
var Note = (function (_super) {
    __extends(Note, _super);
    function Note(direction, game) {
        var _this = _super.call(this, game, 'note', direction) || this;
        _this.yPos = window.innerHeight - 100;
        var background = document.querySelector('gameBackground');
        if (background != null) {
            background.appendChild(_this.element);
        }
        _this.element.style.backgroundImage = "url(images/" + _this.direction + ".gif)";
        _this.element.style.transform = "translate(" + _this.xPos + "px, " + _this.yPos + "px)";
        return _this;
    }
    Note.prototype.move = function () {
        this.yPos -= (window.innerHeight - 180) / 400;
        this.element.style.transform = "translate(" + this.xPos + "px, " + this.yPos + "px)";
    };
    Note.prototype.remove = function () {
        this.element.remove();
        this.game.removeNote(this);
    };
    return Note;
}(GameElement));
var Score = (function () {
    function Score() {
        this.score = 0;
        this.element = document.createElement('score');
        var background = document.querySelector('gameBackground');
        if (background != null) {
            background.appendChild(this.element);
        }
        this.element.innerText = "Score: " + this.score;
    }
    Score.prototype.scoreUp = function (newScore) {
        this.score += newScore;
        this.element.innerText = "Score: " + this.score;
    };
    return Score;
}());
//# sourceMappingURL=main.js.map