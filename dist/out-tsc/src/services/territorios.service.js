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
    TerritoriosService.prototype.nuevaTerritorio = function (territoio) {
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
    TerritoriosService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_provider_1.ApiProvider, http_1.HttpClient])
    ], TerritoriosService);
    return TerritoriosService;
}());
exports.TerritoriosService = TerritoriosService;
//# sourceMappingURL=territorios.service.js.map