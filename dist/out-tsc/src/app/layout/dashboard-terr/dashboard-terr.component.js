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
var core_2 = require("@ngx-translate/core");
var ngx_alerts_1 = require("ngx-alerts");
var DashboardTerrComponent = /** @class */ (function () {
    function DashboardTerrComponent(translate, seoService, alertService) {
        this.translate = translate;
        this.seoService = seoService;
        this.alertService = alertService;
        this.listaNoCol = [];
    }
    DashboardTerrComponent.prototype.ngOnInit = function () {
        this.recuperaNoColoniales();
    };
    DashboardTerrComponent.prototype.recuperaNoColoniales = function () {
        var _this = this;
        this.seoService.listaNoColoniales().subscribe(function (data) {
            _this.listaNoCol = data;
            console.log(_this.listaNoCol);
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetNoCol"));
        });
    };
    DashboardTerrComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard-terr',
            templateUrl: './dashboard-terr.component.html',
            styleUrls: ['./dashboard-terr.component.scss']
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            seo_apis_service_1.SeoApisService,
            ngx_alerts_1.AlertService])
    ], DashboardTerrComponent);
    return DashboardTerrComponent;
}());
exports.DashboardTerrComponent = DashboardTerrComponent;
//# sourceMappingURL=dashboard-terr.component.js.map