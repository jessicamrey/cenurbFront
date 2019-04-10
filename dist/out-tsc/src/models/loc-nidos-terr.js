"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocNidosTerr = /** @class */ (function () {
    function LocNidosTerr() {
    }
    //getters and setters
    LocNidosTerr.prototype.getEmplazamientoId = function () {
        return this.emplazamientoId;
    };
    LocNidosTerr.prototype.setEmplazamientoId = function (value) {
        this.emplazamientoId = value;
    };
    LocNidosTerr.prototype.getFachada = function () {
        return this.fachada;
    };
    LocNidosTerr.prototype.setFachada = function (value) {
        this.fachada = value;
    };
    LocNidosTerr.prototype.getTrasera = function () {
        return this.trasera;
    };
    LocNidosTerr.prototype.setTrasera = function (value) {
        this.trasera = value;
    };
    LocNidosTerr.prototype.getLatIzq = function () {
        return this.latIzq;
    };
    LocNidosTerr.prototype.setLatIzq = function (value) {
        this.latIzq = value;
    };
    LocNidosTerr.prototype.getLatDer = function () {
        return this.latDer;
    };
    LocNidosTerr.prototype.setLatDer = function (value) {
        this.latDer = value;
    };
    LocNidosTerr.prototype.getPatio = function () {
        return this.patio;
    };
    LocNidosTerr.prototype.setPatio = function (value) {
        this.patio = value;
    };
    LocNidosTerr.prototype.getUsuario = function () {
        return this.usuario;
    };
    LocNidosTerr.prototype.setUsuario = function (value) {
        this.usuario = value;
    };
    LocNidosTerr.prototype.getLat = function () {
        return this.lat;
    };
    LocNidosTerr.prototype.setLat = function (value) {
        this.lat = value;
    };
    LocNidosTerr.prototype.getLon = function () {
        return this.lon;
    };
    LocNidosTerr.prototype.setLon = function (value) {
        this.lon = value;
    };
    LocNidosTerr.prototype.getNumPiso = function () {
        return this.numPiso;
    };
    LocNidosTerr.prototype.setNumPiso = function (value) {
        this.numPiso = value;
    };
    LocNidosTerr.prototype.toString = function () {
        var toRet = '';
        var key;
        for (key in this) {
            if (typeof this[key] !== 'function') {
                toRet += key + " => " + this[key] + "\n";
            }
        }
        return toRet;
    };
    return LocNidosTerr;
}());
exports.LocNidosTerr = LocNidosTerr;
//# sourceMappingURL=loc-nidos-terr.js.map