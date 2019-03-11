"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BaseModel = /** @class */ (function () {
    function BaseModel() {
    }
    BaseModel.prototype.initialize = function (data) {
        var key;
        for (key in data) {
            // console.log(data[key]);
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
                this[key] = data[key];
            }
        }
    };
    BaseModel.prototype.serialize = function () {
        var toRet = [];
        var key;
        for (key in this) {
            if (typeof this[key] !== 'function') {
                toRet[key] = this[key];
            }
        }
        return toRet;
    };
    BaseModel.prototype.toString = function () {
        var toRet = '';
        var key;
        for (key in this) {
            if (typeof this[key] !== 'function') {
                toRet += key + " => " + this[key] + "\n";
            }
        }
        return toRet;
    };
    BaseModel.prototype.clear = function () {
        for (var key in this) {
            //set all properties to null
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
                if (key != 'http' && key != 'api' && key != 'helper') {
                    //                    console.log("removing ", key, typeof this[key]);
                    this[key] = null;
                }
            }
        }
    };
    BaseModel = __decorate([
        core_1.Injectable()
    ], BaseModel);
    return BaseModel;
}());
exports.BaseModel = BaseModel;
//# sourceMappingURL=base-model.js.map