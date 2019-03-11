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
    ColoniasService.prototype.nuevaColonia = function (colonia) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/colonias', JSON.stringify(colonia), config);
        return response;
    };
    ColoniasService.prototype.recuperaColonias = function (page) {
        return this.http.get(this.url + '/api/colonias?page=' + page);
    };
    ColoniasService.prototype.recuperaColonia = function (colId) {
        return this.http.get(this.url + '/api/colonias/' + colId);
    };
    ColoniasService.prototype.modificarColonia = function (colId, colonia) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        return this.api.put('api/colonias/' + colId, JSON.stringify(colonia), config);
    };
    ColoniasService.prototype.completaColoniaNidos = function (locNidos, colId) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/colonias/' + colId + '/loc-nidos', JSON.stringify(locNidos), config);
        return response;
    };
    ColoniasService.prototype.completaColoniaEspecies = function (data, colId) {
        var config = { headers: new http_1.HttpHeaders().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/colonias/' + colId + '/otras-especies', JSON.stringify(data), config);
        return response;
    };
    ColoniasService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_provider_1.ApiProvider, http_1.HttpClient])
    ], ColoniasService);
    return ColoniasService;
}());
exports.ColoniasService = ColoniasService;
//# sourceMappingURL=colonias.service.js.map