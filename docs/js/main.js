"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TitleScreen = (function () {
    function TitleScreen(game) {
        var _this = this;
        this.game = game;
        this.introSound = new Audio("songs/introSound.mp3");
        var background = document.createElement('titleBackground');
        var start = document.createElement("start");
        var songChoice = document.createElement("songChoice");
        var menuBox = document.createElement('menuBox');
        var highScoreList = document.createElement('highScore');
        this.game.score.highScore = this.game.score.highScore.sort(function (a, b) { return b - a; });
        var highScore = document.createElement('textLine');
        highScore.innerText = 'Highscores:';
        highScoreList.appendChild(highScore);
        var limit = this.game.score.highScore.length <= 5 ? this.game.score.highScore.length : 5;
        for (var i = 0; i < limit; i++) {
            var temp = document.createElement('textLine');
            temp.innerText = this.game.score.highScore[i];
            highScoreList.appendChild(temp);
        }
        songChoice.innerText = "Playing: " + this.game.songTitle;
        start.innerText = 'Click here to start the game';
        start.addEventListener("click", function () { return _this.onClick(); });
        menuBox.appendChild(highScoreList);
        menuBox.appendChild(songChoice);
        menuBox.appendChild(start);
        document.body.appendChild(background);
        document.body.appendChild(menuBox);
        setTimeout(function () { return _this.playIntroSound(); }, 1000);
        this.game.startGameLoop();
    }
    TitleScreen.prototype.playIntroSound = function () {
        this.introSound.play();
    };
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
        var perfectScore = document.createElement('textLine');
        var greatScore = document.createElement('textLine');
        var niceScore = document.createElement('textLine');
        var totalScore = document.createElement('textLine');
        var highScoreList = document.createElement('highScore');
        this.game.score.highScore = this.game.score.highScore.sort(function (a, b) { return b - a; });
        var highScore = document.createElement('textLine');
        highScore.innerText = 'Highscores:';
        highScoreList.appendChild(highScore);
        var limit = this.game.score.highScore.length <= 5 ? this.game.score.highScore.length : 5;
        for (var i = 0; i < limit; i++) {
            var temp = document.createElement('textLine');
            temp.innerText = this.game.score.highScore[i];
            highScoreList.appendChild(temp);
        }
        perfectScore.innerText = "Perfect score: " + this.game.score.score.perfect;
        greatScore.innerText = "Great score: " + this.game.score.score.great;
        niceScore.innerText = "Nice score: " + this.game.score.score.nice;
        totalScore.innerText = "Total score: " + this.game.score.score.totalScore;
        songChoice.innerText = "Goed gedaan! NOg een keertje?";
        start.innerText = 'JAAAA!!!';
        start.addEventListener("click", function () { return _this.onClick(); });
        menuBox.appendChild(highScoreList);
        menuBox.appendChild(perfectScore);
        menuBox.appendChild(greatScore);
        menuBox.appendChild(niceScore);
        menuBox.appendChild(totalScore);
        menuBox.appendChild(songChoice);
        menuBox.appendChild(start);
        document.body.appendChild(background);
        document.body.appendChild(menuBox);
        this.game.startGameLoop();
        console.log('endscreen');
    }
    EndScreen.prototype.onClick = function () {
        console.log('click');
        this.game.score.resetScore();
        this.game.showGameScreen();
    };
    EndScreen.prototype.update = function () {
    };
    return EndScreen;
}());
var Feedback = (function () {
    function Feedback(screen) {
        this.screen = screen;
        this.feedbackString = '';
        this.div = document.createElement('feedback');
        this.div.style.transform = "translate(" + (window.innerWidth / 2 - 125) + "px, " + (window.innerHeight / 2 - 200) + "px)";
    }
    Feedback.prototype.giveFeedback = function (score) {
        var _this = this;
        if (score === void 0) { score = 0; }
        switch (score) {
            case 10:
                this.feedbackString = 'NICE!';
                this.screen.game.score.niceUp();
                break;
            case 15:
                this.feedbackString = 'GREAT!';
                this.screen.game.score.greatUp();
                break;
            case 25:
                this.feedbackString = 'PERFECT!!!';
                this.screen.game.score.perfectUp();
                break;
            default:
                this.feedbackString = "MISS!";
                break;
        }
        if (this.feedbackString != '') {
            this.div.innerText = this.feedbackString;
            this.div.style.color = "rgb(41, 10, 219)";
            document.body.appendChild(this.div);
            setTimeout(function () { return _this.div.remove(); }, 400);
        }
    };
    return Feedback;
}());
var Game = (function () {
    function Game() {
        this.score = new Score();
        this.songTitle = 'around_the_world';
        this.screen = null;
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
        this.screen = null;
        this.screen = new GameScreen(this);
    };
    Game.prototype.showEndScreen = function () {
        document.body.innerHTML = '';
        this.screen = null;
        this.screen = new EndScreen(this);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameElement = (function () {
    function GameElement(screen, elementName, direction) {
        this._direction = '';
        this._xPos = 0;
        this._yPos = 0;
        this.screen = screen;
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "yPos", {
        get: function () {
            return this._yPos;
        },
        set: function (yPos) {
            this._yPos = yPos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (direction) {
            this._direction = direction;
        },
        enumerable: false,
        configurable: true
    });
    return GameElement;
}());
var GameScreen = (function () {
    function GameScreen(game) {
        var _this = this;
        this.game = game;
        this.songTimeCodes = [];
        this.background = document.createElement('gameBackground');
        document.body.appendChild(this.background);
        this.song = new Audio("songs/" + this.game.songTitle + ".mp3");
        fetch("songs/" + this.game.songTitle + ".beatmap.js")
            .then(function (response) { return response.json(); })
            .then(function (data) { return _this.successHandler(data); })
            .catch(function (error) { return _this.errorHandler(error); });
        this.game.score.showScore();
        this.notes = new Array();
        new Key('left', this);
        new Key('up', this);
        new Key('down', this);
        new Key('right', this);
        this.feedback = new Feedback(this);
    }
    GameScreen.prototype.successHandler = function (data) {
        this.songTimeCodes = data;
        this.song.play();
        this.game.startGameLoop();
    };
    GameScreen.prototype.errorHandler = function (data) {
        console.log(data);
    };
    GameScreen.prototype.generateNote = function () {
        var randNum = Math.floor(Math.random() * 4);
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
        if (this.song.currentTime > this.songTimeCodes[0] - 4) {
            this.generateNote();
            this.songTimeCodes.shift();
        }
        if (this.songTimeCodes.length <= 0 && this.notes.length <= 0) {
            this.song.pause();
            this.song.currentTime = 0;
            console.log('klaar');
            this.game.score.saveScore();
            this.game.showEndScreen();
        }
        for (var _i = 0, _a = this.notes; _i < _a.length; _i++) {
            var note = _a[_i];
            note.move();
            if (note.yPos < 10) {
                note.remove();
                this.feedback.giveFeedback();
            }
        }
    };
    return GameScreen;
}());
var Key = (function (_super) {
    __extends(Key, _super);
    function Key(direction, screen) {
        var _this = _super.call(this, screen, 'key', direction) || this;
        _this.successThresholdLow = 65;
        _this.successThresholdHigh = 95;
        if (_this.screen.background != null) {
            _this.screen.background.appendChild(_this.element);
        }
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        _this.element.style.transform = "translate(" + _this.xPos + "px, 80px)";
        _this.element.style.backgroundImage = "url(images/static_" + _this.direction + ".png)";
        return _this;
    }
    Key.prototype.onKeyDown = function (e) {
        for (var _i = 0, _a = this.screen.notes; _i < _a.length; _i++) {
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
            this.screen.feedback.giveFeedback(score);
            this.screen.game.score.scoreUp(score);
            note.remove();
        }
    };
    return Key;
}(GameElement));
var Note = (function (_super) {
    __extends(Note, _super);
    function Note(direction, screen) {
        var _this = _super.call(this, screen, 'note', direction) || this;
        _this.yPos = window.innerHeight - 100;
        if (_this.screen.background != null) {
            _this.screen.background.appendChild(_this.element);
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
        this.screen.removeNote(this);
    };
    return Note;
}(GameElement));
var Score = (function () {
    function Score() {
        this._score = {
            totalScore: 0,
            perfect: 0,
            great: 0,
            nice: 0
        };
        this.element = document.createElement('score');
        var storage = window.localStorage.getItem('highScore');
        if (storage === null) {
            this.highScore = new Array();
            window.localStorage.setItem('highScore', this.highScore.toString());
        }
        else {
            this.highScore = storage.split(',');
        }
    }
    Score.prototype.showScore = function () {
        var background = document.querySelector('gameBackground');
        if (background != null) {
            background.appendChild(this.element);
        }
        this.element.innerText = "Score: " + this.score.totalScore;
    };
    Score.prototype.saveScore = function () {
        window.localStorage.setItem('highScore', this.highScore.push(this.score.totalScore));
    };
    Score.prototype.resetScore = function () {
        this._score = {
            totalScore: 0,
            perfect: 0,
            great: 0,
            nice: 0
        };
    };
    Score.prototype.scoreUp = function (newScore) {
        this._score.totalScore += newScore;
        this.element.innerText = "Score: " + this.score.totalScore;
    };
    Score.prototype.perfectUp = function () {
        this._score.perfect++;
    };
    Score.prototype.greatUp = function () {
        this._score.great++;
    };
    Score.prototype.niceUp = function () {
        this._score.nice++;
    };
    Object.defineProperty(Score.prototype, "score", {
        get: function () {
            return this._score;
        },
        enumerable: false,
        configurable: true
    });
    return Score;
}());
//# sourceMappingURL=main.js.map