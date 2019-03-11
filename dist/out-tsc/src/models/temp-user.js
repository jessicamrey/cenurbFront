"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_model_1 = require("./base-model");
var TempUser = /** @class */ (function (_super) {
    __extends(TempUser, _super);
    function TempUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //getters and setters
    TempUser.prototype.getName = function () {
        return this.name;
    };
    TempUser.prototype.setName = function (value) {
        this.name = value;
    };
    TempUser.prototype.getLastName = function () {
        return this.lastName;
    };
    TempUser.prototype.setLastName = function (value) {
        this.lastName = value;
    };
    TempUser.prototype.getEmail = function () {
        return this.email;
    };
    TempUser.prototype.setEmail = function (value) {
        this.email = value;
    };
    TempUser.prototype.getPhone = function () {
        return this.phone;
    };
    TempUser.prototype.setPhone = function (value) {
        this.phone = value;
    };
    return TempUser;
}(base_model_1.BaseModel));
exports.TempUser = TempUser;
//# sourceMappingURL=temp-user.js.map