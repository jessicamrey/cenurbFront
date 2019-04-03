"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocNidos = /** @class */ (function () {
    function LocNidos() {
    }
    //getters and setters
    LocNidos.prototype.getFachada = function () {
        return this.fachada;
    };
    LocNidos.prototype.setFachada = function (value) {
        this.fachada = value;
    };
    LocNidos.prototype.getTrasera = function () {
        return this.trasera;
    };
    LocNidos.prototype.setTrasera = function (value) {
        this.trasera = value;
    };
    LocNidos.prototype.getLatIzq = function () {
        return this.latIzq;
    };
    LocNidos.prototype.setLatIzq = function (value) {
        this.latIzq = value;
    };
    LocNidos.prototype.getLatDer = function () {
        return this.latDer;
    };
    LocNidos.prototype.setLatDer = function (value) {
        this.latDer = value;
    };
    LocNidos.prototype.getPatio = function () {
        return this.patio;
    };
    LocNidos.prototype.setPatio = function (value) {
        this.patio = value;
    };
    LocNidos.prototype.getUsuario = function () {
        return this.usuario;
    };
    LocNidos.prototype.setUsuario = function (value) {
        this.usuario = value;
    };
    LocNidos.prototype.getLat = function () {
        return this.lat;
    };
    LocNidos.prototype.setLat = function (value) {
        this.lat = value;
    };
    LocNidos.prototype.getLon = function () {
        return this.lon;
    };
    LocNidos.prototype.setLon = function (value) {
        this.lon = value;
    };
    LocNidos.prototype.toString = function () {
        var toRet = '';
        var key;
        for (key in this) {
            if (typeof this[key] !== 'function') {
                toRet += key + " => " + this[key] + "\n";
            }
        }
        return toRet;
    };
    return LocNidos;
}());
exports.LocNidos = LocNidos;
//# sourceMappingURL=loc-nidos.js.map