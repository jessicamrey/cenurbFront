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
var colonias_service_1 = require("../../../services/colonias.service");
var core_2 = require("@ngx-translate/core");
var ngx_alerts_1 = require("ngx-alerts");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ViewVisitsComponent = /** @class */ (function () {
    function ViewVisitsComponent(translate, coloniasService, alertService, modalService) {
        this.translate = translate;
        this.coloniasService = coloniasService;
        this.alertService = alertService;
        this.modalService = modalService;
        this.listaVisitas = [];
        this.colonias = [];
        this.coloniasId = [];
    }
    ViewVisitsComponent.prototype.ngOnInit = function () {
        this.recuperaVisitas();
    };
    ViewVisitsComponent.prototype.recuperaVisitas = function () {
        var _this = this;
        this.coloniasService.recuperaVisitas(0, '').subscribe(function (data) {
            _this.listaVisitas = data;
            console.log(data);
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                if (_this.coloniasId.indexOf(item.colonia["id"]) < 0) {
                    _this.colonias.push(item.colonia);
                    _this.coloniasId.push(item.colonia["id"]);
                }
            }
            //Tenemos que utilizar los Id's por separado porque indexOf(colonia) no lo detecta como el mismo objeto y no funciona
        }, function (error) {
            console.log(error);
        });
    };
    ViewVisitsComponent.prototype.filtrar = function (coloniaId) {
        var _this = this;
        this.coloniasService.recuperaVisitas(0, '?colonia=' + coloniaId).subscribe(function (data) {
            _this.listaVisitas = data;
        }, function (error) {
            console.log(error);
        });
    };
    ViewVisitsComponent.prototype.openLg = function (content) {
        this.modalService.open(content, { size: 'lg' });
    };
    ViewVisitsComponent = __decorate([
        core_1.Component({
            selector: 'app-view-visits',
            templateUrl: './view-visits.component.html',
            styleUrls: ['./view-visits.component.scss']
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            colonias_service_1.ColoniasService,
            ngx_alerts_1.AlertService,
            ng_bootstrap_1.NgbModal])
    ], ViewVisitsComponent);
    return ViewVisitsComponent;
}());
exports.ViewVisitsComponent = ViewVisitsComponent;
//# sourceMappingURL=view-visits.component.js.map