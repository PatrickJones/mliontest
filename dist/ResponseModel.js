"use strict";
class ResponseModel {
    constructor(x, y) {
        this._x = 0;
        this._y = 0;
        this.result = () => {
            return this._x + this._y;
        };
        this._y = y;
        this._x = x;
    }
}
module.exports = ResponseModel;
//# sourceMappingURL=ResponseModel.js.map