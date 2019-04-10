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
var seo_apis_service_1 = require("../../../services/seo-apis.service");
var colonias_service_1 = require("../../../services/colonias.service");
var core_2 = require("@ngx-translate/core");
var ngx_alerts_1 = require("ngx-alerts");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(translate, seoService, coloniasService, alertService) {
        this.translate = translate;
        this.seoService = seoService;
        this.coloniasService = coloniasService;
        this.alertService = alertService;
        this.listaCol = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.recuperaColoniales();
    };
    DashboardComponent.prototype.recuperaColoniales = function () {
        var _this = this;
        this.seoService.listaColoniales().subscribe(function (data) {
            _this.listaCol = data;
            console.log(_this.listaCol);
        }, function (error) {
            _this.alertService.danger(_this.translate.instant("Dashboard.errorGetCol"));
        });
    };
    DashboardComponent.prototype.seleccionar = function (nombre, id) {
        var data = {
            especie: nombre,
            especie_id: id
        };
        this.coloniasService.selectColonia(data);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            seo_apis_service_1.SeoApisService,
            colonias_service_1.ColoniasService,
            ngx_alerts_1.AlertService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map