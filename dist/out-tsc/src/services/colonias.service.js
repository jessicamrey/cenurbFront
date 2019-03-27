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
var ColoniasService = /** @class */ (function () {
    function ColoniasService(api, http) {
        this.api = api;
        this.http = http;
        this.url = environment_1.environment.backendUrl;
    }
    //Registra una nueva colonia
    ColoniasService.prototype.nuevaColonia = function (colonia) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/colonias', JSON.stringify(colonia), config);
        return response;
    };
    //Recupera las colonias cercanas a la posicion del usuario, con un radio de distancia
    ColoniasService.prototype.recuperaColoniasCercanas = function (radio, lat, lon, especie) {
        return this.http.get(this.url + '/api/closeCol?rad=' + radio + '&lat=' + lat + '&lon=' + lon + '&especie=' + especie);
    };
    //recupera todas las colonias con paginacion
    ColoniasService.prototype.recuperaColonias = function (page) {
        return this.http.get(this.url + '/api/colonias?page=' + page);
    };
    //Recupera las colonias marcadas como favoritas por el usuario
    ColoniasService.prototype.recuperaFavoritos = function (userId) {
        return this.http.get(this.url + '/api/favCol/' + userId);
    };
    //Recuperamos colonias con un string de busqueda que incluye filtros
    ColoniasService.prototype.recuperaColoniasFiltered = function (page, busqueda) {
        return this.http.get(this.url + '/api/colonias?page=' + page + busqueda);
    };
    //Recupera los datos de una sola colonia
    ColoniasService.prototype.recuperaColonia = function (colId) {
        return this.http.get(this.url + '/api/colonias/' + colId);
    };
    //Modificamos los datos de una colonia existente
    ColoniasService.prototype.modificarColonia = function (colId, colonia) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        return this.api.put('api/colonias/' + colId, JSON.stringify(colonia), config);
    };
    //Completamos los datos de la colonia con datos de nidos 
    ColoniasService.prototype.completaColoniaNidos = function (locNidos, colId) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/colonias/' + colId + '/loc-nidos', JSON.stringify(locNidos), config);
        return response;
    };
    //Completamos los datos de la colonia por si hay otras especies en la misma colonia
    ColoniasService.prototype.completaColoniaEspecies = function (data, colId) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/colonias/' + colId + '/otras-especies', JSON.stringify(data), config);
        return response;
    };
    //Recuperamos las visitas de un solo usuario
    ColoniasService.prototype.recuperaVisitas = function (userId, stringBusqueda) {
        return this.http.get(this.url + '/api/usuario/' + userId + '/visitas' + stringBusqueda);
    };
    //Recupera las visitas para una colonia
    ColoniasService.prototype.recuperaVisitasGeneral = function (stringBusqueda) {
        return this.http.get(this.url + '/api/visitas-colonias' + stringBusqueda);
    };
    //Registramos una nueva visita en una colonia
    ColoniasService.prototype.nuevaVisitaColonia = function (data, colId) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/colonias/' + colId + '/visitas', JSON.stringify(data), config);
        return response;
    };
    //Editamos los datos de una visita ya creada
    ColoniasService.prototype.modificarVisita = function (visitaId, visita) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        return this.api.put('api/visitas-colonias/' + visitaId, JSON.stringify(visita), config);
    };
    //Eliminamos una visita que hemos creado
    ColoniasService.prototype.eliminarVisita = function (visitaId) {
        return this.api.delete('api/visitas-colonias/' + visitaId);
    };
    //Obtenemos las estadisticas por año
    ColoniasService.prototype.getStatsAnno = function (especie, temp) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsAnno?temporada=' + temp);
    };
    //Obtenemos las estadisticas por ccaa
    ColoniasService.prototype.getStatsCcaa = function (especie, temp) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsCcaa?temporada=' + temp);
    };
    //Obtenemos las estadisticas por provincia
    ColoniasService.prototype.getStatsProvincia = function (especie, temp) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsProvincia?temporada=' + temp);
    };
    ColoniasService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_provider_1.ApiProvider, http_1.HttpClient])
    ], ColoniasService);
    return ColoniasService;
}());
exports.ColoniasService = ColoniasService;
//# sourceMappingURL=colonias.service.js.map