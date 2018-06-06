"use strict";
var Game = (function () {
    function Game() {
        this.rotate = 0;
        this.rotateLimit = 360;
        this.frame = 0;
        this.spawnRate = 50;
        this.score = new Score();
        this.notes = new Array();
        this.key = new Key('left', this);
        this.key = new Key('up', this);
        this.key = new Key('down', this);
        this.key = new Key('right', this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.frame++ % this.spawnRate === 0) {
            this.generateNote();
        }
        if (this.score.score > 100) {
            if (this.rotate < this.rotateLimit) {
                this.rotate += 2;
            }
            document.body.style.webkitTransformOrigin = 'center';
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
        if (randNum === 1) {
            this.notes.push(new Note("left"));
        }
        if (randNum === 2) {
            this.notes.push(new Note("right"));
        }
        if (randNum === 3) {
            this.notes.push(new Note("up"));
        }
        if (randNum === 4) {
            this.notes.push(new Note("down"));
        }
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Key = (function () {
    function Key(direction, game) {
        var _this = this;
        this.direction = direction;
        this.xPos = 0;
        this.game = game;
        switch (this.direction) {
            case "left":
                this.xPos = 350;
                break;
            case "up":
                this.xPos = 450;
                break;
            case "down":
                this.xPos = 550;
                break;
            case "right":
                this.xPos = 650;
                break;
        }
        this.key = document.createElement('key');
        document.body.appendChild(this.key);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
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
                if (note.yPos < 90 && note.yPos > 70) {
                    console.log("LEFT! ");
                    this.game.score.scoreUp();
                    note.remove();
                }
            }
            if (e.keyCode == 38 && note.direction == "up") {
                if (note.yPos < 90 && note.yPos > 70) {
                    console.log("UP! ");
                    this.game.score.scoreUp();
                    note.remove();
                }
            }
            if (e.keyCode == 40 && note.direction == "down") {
                if (note.yPos < 90 && note.yPos > 70) {
                    console.log("DOWN! ");
                    this.game.score.scoreUp();
                    note.remove();
                }
            }
            if (e.keyCode == 39 && note.direction == "right") {
                if (note.yPos < 90 && note.yPos > 70) {
                    console.log("RIGHT! ");
                    this.game.score.scoreUp();
                    note.remove();
                }
            }
        }
    };
    return Key;
}());
var Note = (function () {
    function Note(direction) {
        this.direction = direction;
        this.xPos = 0;
        switch (this.direction) {
            case "left":
                this.xPos = 350;
                break;
            case "up":
                this.xPos = 450;
                break;
            case "down":
                this.xPos = 550;
                break;
            case "right":
                this.xPos = 650;
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