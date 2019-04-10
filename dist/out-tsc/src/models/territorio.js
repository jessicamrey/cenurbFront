"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Territorio = /** @class */ (function () {
    function Territorio() {
    }
    //getters and setters
    Territorio.prototype.getNombre = function () {
        return this.nombre;
    };
    Territorio.prototype.setNombre = function (value) {
        this.nombre = value;
    };
    Territorio.prototype.getNombreCentro = function () {
        return this.nombreCentro;
    };
    Territorio.prototype.setNombreCentro = function (value) {
        this.nombreCentro = value;
    };
    Territorio.prototype.getCcaa = function () {
        return this.ccaa;
    };
    Territorio.prototype.setCcaa = function (value) {
        this.ccaa = value;
    };
    Territorio.prototype.getProvincia = function () {
        return this.provincia;
    };
    Territorio.prototype.setProvincia = function (value) {
        this.provincia = value;
    };
    Territorio.prototype.getMunicipio = function () {
        return this.municipio;
    };
    Territorio.prototype.setMunicipio = function (value) {
        this.municipio = value;
    };
    Territorio.prototype.getBarrio = function () {
        return this.barrio;
    };
    Territorio.prototype.setBarrio = function (value) {
        this.barrio = value;
    };
    Territorio.prototype.getCalleNumPiso = function () {
        return this.calleNumPiso;
    };
    Territorio.prototype.setCalleNumPiso = function (value) {
        this.calleNumPiso = value;
    };
    Territorio.prototype.getTipoPropiedad = function () {
        return this.tipoPropiedadId;
    };
    Territorio.prototype.setTipoPropiedad = function (value) {
        this.tipoPropiedadId = value;
    };
    Territorio.prototype.getTipoEdificio = function () {
        return this.tipoEdificioId;
    };
    Territorio.prototype.setTipoTerritorioId = function (value) {
        this.tipoTerritorioId = value;
    };
    Territorio.prototype.getTipoTerritorioId = function () {
        return this.tipoTerritorioId;
    };
    Territorio.prototype.setTipoEdificio = function (value) {
        this.tipoEdificioId = value;
    };
    Territorio.prototype.getAnno = function () {
        return this.anno;
    };
    Territorio.prototype.setAnno = function (value) {
        this.anno = value;
    };
    Territorio.prototype.getLocNidos = function () {
        return this.locNidos;
    };
    Territorio.prototype.setLocNidos = function (value) {
        this.locNidos = value;
    };
    Territorio.prototype.getUsuario = function () {
        return this.usuario;
    };
    Territorio.prototype.setUsuario = function (value) {
        this.usuario = value;
    };
    Territorio.prototype.getEspecie = function () {
        return this.especie;
    };
    Territorio.prototype.setEspecie = function (value) {
        this.especie = value;
    };
    Territorio.prototype.getAmenazada = function () {
        return this.amenazada;
    };
    Territorio.prototype.setAmenazada = function (value) {
        this.amenazada = value;
    };
    Territorio.prototype.toString = function () {
        var toRet = '';
        var key;
        for (key in this) {
            if (typeof this[key] !== 'function') {
                toRet += key + " => " + this[key] + "\n";
            }
        }
        return toRet;
    };
    return Territorio;
}());
exports.Territorio = Territorio;
//# sourceMappingURL=territorio.js.map