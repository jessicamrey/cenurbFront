"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VisitaTerritorio = /** @class */ (function () {
    function VisitaTerritorio() {
    }
    //getters and setters
    VisitaTerritorio.prototype.getObservacionId = function () {
        return this.observacionId;
    };
    VisitaTerritorio.prototype.setObservacionId = function (value) {
        this.observacionId = value;
    };
    VisitaTerritorio.prototype.getHuso = function () {
        return this.huso;
    };
    VisitaTerritorio.prototype.setHuso = function (value) {
        this.huso = value;
    };
    VisitaTerritorio.prototype.getHora = function () {
        return this.hora;
    };
    VisitaTerritorio.prototype.setHora = function (value) {
        this.hora = value;
    };
    VisitaTerritorio.prototype.getUsuario = function () {
        return this.usuario;
    };
    VisitaTerritorio.prototype.setUsuario = function (value) {
        this.usuario = value;
    };
    VisitaTerritorio.prototype.getfecha = function () {
        return this.fecha;
    };
    VisitaTerritorio.prototype.setFecha = function (value) {
        this.fecha = value;
    };
    VisitaTerritorio.prototype.getLat = function () {
        return this.lat;
    };
    VisitaTerritorio.prototype.setLat = function (value) {
        this.lat = value;
    };
    VisitaTerritorio.prototype.getLon = function () {
        return this.lon;
    };
    VisitaTerritorio.prototype.setLon = function (value) {
        this.lon = value;
    };
    VisitaTerritorio.prototype.toString = function () {
        var toRet = '';
        var key;
        for (key in this) {
            if (typeof this[key] !== 'function') {
                toRet += key + " => " + this[key] + "\n";
            }
        }
        return toRet;
    };
    return VisitaTerritorio;
}());
exports.VisitaTerritorio = VisitaTerritorio;
//# sourceMappingURL=visita-territorio.js.map