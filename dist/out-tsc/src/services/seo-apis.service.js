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
var SeoApisService = /** @class */ (function () {
    function SeoApisService(api, http) {
        this.api = api;
        this.http = http;
        this.url = environment_1.environment.backendUrl;
    }
    //Obtiene una lista con todas las aves coloniales y sus imágenes de perfil
    SeoApisService.prototype.listaColoniales = function () {
        return this.http.get(this.url + '/api/listCol');
    };
    //Obtiene una lista con todas las aves no coloniales y sus imágenes de perfil
    SeoApisService.prototype.listaNoColoniales = function () {
        return this.http.get(this.url + '/api/listNoCol');
    };
    //Recupera el listado de Comunidades autónomas de la base de datos de SEO
    SeoApisService.prototype.getCCAA = function () {
        return this.http.get(this.url + '/api/ccaa');
    };
    //Recupera un listado de provincias de una comunidad autónoma de la base de datos de SeO
    SeoApisService.prototype.getProvincia = function (idCom) {
        return this.http.get(this.url + '/api/provincias/' + idCom);
    };
    //Recupera los municipios de una provincia de la base de datos de SEO
    SeoApisService.prototype.getMunicipio = function (idProv) {
        return this.http.get(this.url + '/api/municipios/' + idProv);
    };
    //Recupera todos los tipos de propiedades
    SeoApisService.prototype.getTipoProp = function () {
        return this.http.get(this.url + '/api/tipo-propiedads');
    };
    //Recupera todos los tipos de edificios
    SeoApisService.prototype.getTipoEd = function () {
        return this.http.get(this.url + '/api/tipo-edificios');
    };
    SeoApisService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_provider_1.ApiProvider, http_1.HttpClient])
    ], SeoApisService);
    return SeoApisService;
}());
exports.SeoApisService = SeoApisService;
//# sourceMappingURL=seo-apis.service.js.map