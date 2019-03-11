"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Colonia = /** @class */ (function () {
    function Colonia() {
    }
    //getters and setters
    Colonia.prototype.getNombre = function () {
        return this.nombre;
    };
    Colonia.prototype.setNombre = function (value) {
        this.nombre = value;
    };
    Colonia.prototype.getNombreCentro = function () {
        return this.nombreCentro;
    };
    Colonia.prototype.setNombreCentro = function (value) {
        this.nombreCentro = value;
    };
    Colonia.prototype.getCcaa = function () {
        return this.ccaa;
    };
    Colonia.prototype.setCcaa = function (value) {
        this.ccaa = value;
    };
    Colonia.prototype.getProvincia = function () {
        return this.provincia;
    };
    Colonia.prototype.setProvincia = function (value) {
        this.provincia = value;
    };
    Colonia.prototype.getMunicipio = function () {
        return this.municipio;
    };
    Colonia.prototype.setMunicipio = function (value) {
        this.municipio = value;
    };
    Colonia.prototype.getBarrio = function () {
        return this.barrio;
    };
    Colonia.prototype.setBarrio = function (value) {
        this.barrio = value;
    };
    Colonia.prototype.getCalleNumPiso = function () {
        return this.calleNumPiso;
    };
    Colonia.prototype.setCalleNumPiso = function (value) {
        this.calleNumPiso = value;
    };
    Colonia.prototype.getTipoPropiedad = function () {
        return this.tipoPropiedadId;
    };
    Colonia.prototype.setTipoPropiedad = function (value) {
        this.tipoPropiedadId = value;
    };
    Colonia.prototype.getTipoEdificio = function () {
        return this.tipoEdificioId;
    };
    Colonia.prototype.setTipoEdificio = function (value) {
        this.tipoEdificioId = value;
    };
    Colonia.prototype.getTemporada = function () {
        return this.temporada;
    };
    Colonia.prototype.setTemporada = function (value) {
        this.temporada = value;
    };
    Colonia.prototype.getLocNidos = function () {
        return this.locNidos;
    };
    Colonia.prototype.setLocNidos = function (value) {
        this.locNidos = value;
    };
    Colonia.prototype.getUsuario = function () {
        return this.usuario;
    };
    Colonia.prototype.setUsuario = function (value) {
        this.usuario = value;
    };
    Colonia.prototype.getEspecie = function () {
        return this.especie;
    };
    Colonia.prototype.setEspecie = function (value) {
        this.especie = value;
    };
    Colonia.prototype.toString = function () {
        var toRet = '';
        var key;
        for (key in this) {
            if (typeof this[key] !== 'function') {
                toRet += key + " => " + this[key] + "\n";
            }
        }
        return toRet;
    };
    return Colonia;
}());
exports.Colonia = Colonia;
//# sourceMappingURL=colonia.js.map