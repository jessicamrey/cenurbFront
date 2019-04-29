"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var api_provider_1 = require("../providers/api/api-provider");
var environment_1 = require("../environments/environment");
var core_2 = require("@angular/core");
var TerritoriosService = /** @class */ (function () {
    function TerritoriosService(api, http) {
        this.api = api;
        this.http = http;
        this.url = environment_1.environment.backendUrl;
        this.territorioSelectedEvent = new core_2.EventEmitter();
    }
    //Operación para dejar seleccionada una especie en memoria
    TerritoriosService.prototype.selectTerritorio = function (data) {
        localStorage.setItem('especie', JSON.stringify(data));
        this.territorioSelectedEvent.emit(data);
        return data;
    };
    //Registra un nuevo territorio
    TerritoriosService.prototype.nuevoTerritorio = function (territoio) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/territorios', JSON.stringify(territoio), config);
        return response;
    };
    //Completamos los datos del territorio con datos de nidos 
    TerritoriosService.prototype.completaTerritorioNidos = function (locNidos, terrId) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/territorios/' + terrId + '/loc-nidos', JSON.stringify(locNidos), config);
        return response;
    };
    //Obtenemos las temporadas
    TerritoriosService.prototype.getTemporadas = function () {
        return this.http.get(this.url + '/api/temporadas');
    };
    //Obtenemos los emplazamientos
    TerritoriosService.prototype.getEmplazamientos = function () {
        return this.http.get(this.url + '/api/emplazamientos');
    };
    //Obtenemos los emplazamientos
    TerritoriosService.prototype.getObservaciones = function () {
        return this.http.get(this.url + '/api/observaciones-territorios');
    };
    //Obtenemos los tipos de territorio
    TerritoriosService.prototype.getTipos = function () {
        return this.http.get(this.url + '/api/tipo-territorios');
    };
    //recupera todos los territorios con paginacion
    TerritoriosService.prototype.recuperaTerritorios = function (page, especie) {
        return this.http.get(this.url + '/api/territorios?page=' + page + '&especie=' + especie);
    };
    //Recuperamos territorios con un string de busqueda que incluye filtros
    TerritoriosService.prototype.recuperaTerritoriosFiltered = function (page, busqueda) {
        return this.http.get(this.url + '/api/territorios?page=' + page + busqueda);
    };
    //Recupera los datos de un solo territorio
    TerritoriosService.prototype.recuperaTerritorio = function (terrId) {
        return this.http.get(this.url + '/api/territorios/' + terrId);
    };
    //Recupera los territorios marcados como favoritos por el usuario
    TerritoriosService.prototype.recuperaFavoritos = function (userId) {
        return this.http.get(this.url + '/api/territorios/favoritos/' + userId);
    };
    //Marca un nuevo territorio como favorito
    TerritoriosService.prototype.nuevoFavorito = function (data) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/territorios/favoritos', JSON.stringify(data), config);
        return response;
    };
    //Recupera las visitas para un territorio
    TerritoriosService.prototype.recuperaVisitasGeneral = function (stringBusqueda) {
        return this.http.get(this.url + '/api/visitas-territorios' + stringBusqueda);
    };
    //Registramos una nueva visita en un territorio
    TerritoriosService.prototype.nuevaVisitaTerritorio = function (data, terrId) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/territorios/' + terrId + '/visitas', JSON.stringify(data), config);
        return response;
    };
    //Editamos los datos de una visita ya creada
    TerritoriosService.prototype.modificarVisita = function (visitaId, visita) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        return this.api.put('api/visitas-territorios/' + visitaId, JSON.stringify(visita), config);
    };
    //Eliminamos una visita que hemos creado
    TerritoriosService.prototype.eliminarVisita = function (visitaId) {
        return this.api.delete('api/visitas-territorios/' + visitaId);
    };
    //Obtenemos las estadisticas por año
    TerritoriosService.prototype.getStatsAnno = function (especie, temp) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsAnnoTerr?temporada=' + temp);
    };
    //Obtenemos las estadisticas por ccaa
    TerritoriosService.prototype.getStatsCcaa = function (especie, temp) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsCcaaTerr?temporada=' + temp);
    };
    //Obtenemos las estadisticas por provincia
    TerritoriosService.prototype.getStatsProvincia = function (especie, temp, ccaa) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsProvinciaTerr?temporada=' + temp + '&ccaa=' + ccaa);
    };
    //Obtenemos estadisticas generales, una llamada por especie
    TerritoriosService.prototype.getStats = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/statsTerr?especie=' + especie + busqueda);
    };
    //Obtenemos estadisticas para observaciones
    TerritoriosService.prototype.getStatsObsv = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsObservaciones' + busqueda);
    };
    TerritoriosService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_provider_1.ApiProvider, http_1.HttpClient])
    ], TerritoriosService);
    return TerritoriosService;
}());
exports.TerritoriosService = TerritoriosService;
//# sourceMappingURL=territorios.service.js.map