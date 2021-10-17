class ResponseModel {
    _x:number = 0;
    _y:number = 0;
    constructor(x:number, y:number) {
        this._y = y;
        this._x = x;
    }

    public result = (): number =>{
        return this._x + this._y;
    };
}

export = ResponseModel;