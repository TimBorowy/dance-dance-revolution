class GameElement{
    
    protected screen:GameScreen
    protected element:HTMLElement
    protected _direction:string = ''
    protected _xPos:number = 0
    protected _yPos:number = 0

    constructor(screen:GameScreen, elementName:string, direction:string){
        this.screen = screen

        this.direction = direction

        let windowWidth:number = window.innerWidth / 2 - 200

        switch(this.direction) {
            case "left" : this.xPos = windowWidth;
            break;
    
            case "up" : this.xPos = windowWidth + 100;
            break;
    
            case "down" : this.xPos = windowWidth + 200;
            break;
    
            case "right" : this.xPos = windowWidth + 300;
            break;
        }

        this.element = document.createElement(elementName)
    }

    get xPos():number{
        return this._xPos
    }
    set xPos(xPos:number){
        this._xPos = xPos
    }

    get yPos():number{
        return this._yPos
    }
    set yPos(yPos:number){
        this._yPos = yPos
    }

    get direction():string{
        return this._direction
    }
    set direction(direction:string){
        this._direction = direction
    }
}