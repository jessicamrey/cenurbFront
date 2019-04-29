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
var territorios_service_1 = require("../../../services/territorios.service");
var seo_apis_service_1 = require("../../../services/seo-apis.service");
var core_2 = require("@ngx-translate/core");
var ngx_alerts_1 = require("ngx-alerts");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ViewTerrComponent = /** @class */ (function () {
    function ViewTerrComponent(translate, territoriosService, alertService, modalService, seoService) {
        this.translate = translate;
        this.territoriosService = territoriosService;
        this.alertService = alertService;
        this.modalService = modalService;
        this.seoService = seoService;
        this.listaTerritorios = [];
        this.showList = true;
        this.totalPages = 0;
        this.listaCCAA = [];
        this.listaProv = [];
        this.listaMun = [];
        this.filtered = false;
        this.advancedPagination = 1;
    }
    ViewTerrComponent.prototype.ngOnInit = function () {
        this.recuperaCCAA();
        this.recuperaTerritorios(1);
    };
    ViewTerrComponent.prototype.pageChanged = function (page) {
        this.recuperaTerritorios(page);
    };
    ViewTerrComponent.prototype.pageChangedFiltered = function (page) {
        this.recuperaConFiltros(this.busqueda, page);
    };
    ViewTerrComponent.prototype.openLg = function (content) {
        this.modalService.open(content, { size: 'lg' });
    };
    ViewTerrComponent.prototype.recuperaTerritorios = function (pageNumber) {
        var _this = this;
        var especie = parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]);
        this.territoriosService.recuperaTerritorios(pageNumber, especie).subscribe(function (data) {
            _this.listaTerritorios = data["hydra:member"];
            var last = data["hydra:view"]["hydra:last"];
            last = last.substr(last.indexOf('page') + 5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
            _this.totalPages = last * 10;
            console.log(data);
            console.log(_this.listaTerritorios);
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("ViewCol.errorMsg1"));
        });
    };
    ViewTerrComponent.prototype.recuperaCCAA = function () {
        var _this = this;
        this.seoService.getCCAA().subscribe(function (data) {
            _this.listaCCAA = data;
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetCCAA"));
        });
    };
    ViewTerrComponent.prototype.recuperaProvincia = function () {
        var _this = this;
        this.listaProv = [];
        this.listaMun = [];
        var id = $("#selectCCAA option:selected").attr("id");
        this.seoService.getProvincia(id).subscribe(function (data) {
            _this.listaProv = data;
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetProv"));
        });
    };
    ViewTerrComponent.prototype.recuperaMunicipio = function () {
        var _this = this;
        var id = $("#selectProvincia option:selected").attr("id");
        this.seoService.getMunicipio(id).subscribe(function (data) {
            _this.listaMun = data;
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetMun"));
        });
    };
    ViewTerrComponent.prototype.getDatosBusqueda = function () {
        var ccaa = $("#selectCCAA option:selected").attr("value");
        var prov = $("#selectProvincia option:selected").attr("value");
        var mun = $("#selectMunicipio option:selected").attr("value");
        var nombre = $("#nombre").val();
        var temporada = $("#temporada").val();
        var centro = $("#nombreCentro").val();
        var cod = $("#cod").val();
        var vacio = $("#vacio").is(":checked");
        var busqueda = '';
        ccaa.length > 0 ? busqueda = busqueda + '&ccaa=' + ccaa : busqueda;
        prov != undefined && prov != '-' ? busqueda = busqueda + '&provincia=' + prov : busqueda;
        mun != undefined && mun != '-' ? busqueda = busqueda + '&municipio=' + mun : busqueda;
        nombre.length > 0 ? busqueda = busqueda + '&nombre=' + nombre : busqueda;
        centro.length > 0 ? busqueda = busqueda + '&nombreCentro=' + centro : busqueda;
        temporada.length > 0 ? busqueda = busqueda + '&temporada=' + temporada : busqueda;
        cod.length > 0 ? busqueda = busqueda + '&id=' + cod : busqueda;
        vacio != false ? busqueda = busqueda + '&vacio=true' : busqueda;
        console.log(busqueda);
        if (busqueda.length > 0) { //solo recuperamos cuando haya algun dato para buscar
            this.busqueda = busqueda;
            this.filtered = true;
            this.recuperaConFiltros(busqueda, 1);
        }
        else {
            //alertar de introducir datos
        }
    };
    ViewTerrComponent.prototype.recuperaConFiltros = function (busqueda, pageNumber) {
        var _this = this;
        this.territoriosService.recuperaTerritoriosFiltered(pageNumber, busqueda).subscribe(function (data) {
            _this.listaTerritorios = data["hydra:member"];
            var last = data["hydra:view"]["hydra:last"];
            if (last != undefined) {
                last = last.substr(last.indexOf('page') + 5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                _this.totalPages = last * 10;
            }
            else {
                _this.totalPages = 0;
            }
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("ViewCol.errorMsg1"));
        });
    };
    ViewTerrComponent = __decorate([
        core_1.Component({
            selector: 'app-view-terr',
            templateUrl: './view-terr.component.html',
            styleUrls: ['./view-terr.component.scss']
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            territorios_service_1.TerritoriosService,
            ngx_alerts_1.AlertService,
            ng_bootstrap_1.NgbModal,
            seo_apis_service_1.SeoApisService])
    ], ViewTerrComponent);
    return ViewTerrComponent;
}());
exports.ViewTerrComponent = ViewTerrComponent;
//# sourceMappingURL=view-terr.component.js.map