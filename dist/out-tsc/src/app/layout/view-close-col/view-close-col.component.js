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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var colonias_service_1 = require("../../../services/colonias.service");
var ngx_alerts_1 = require("ngx-alerts");
var core_2 = require("@ngx-translate/core");
var ViewCloseColComponent = /** @class */ (function () {
    function ViewCloseColComponent(coloniasService, alertService, translate, modalService) {
        this.coloniasService = coloniasService;
        this.alertService = alertService;
        this.translate = translate;
        this.modalService = modalService;
        this.title = 'My first AGM project';
        this.lat = 51.678418;
        this.lng = 7.809007;
        this.listaColonias = [];
    }
    ViewCloseColComponent.prototype.ngOnInit = function () {
        this.getLocalizacion();
    };
    ViewCloseColComponent.prototype.getLocalizacion = function () {
        var _this = this;
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(function (position) {
                _this.geolocationPosition = position,
                    console.log(position);
            }, function (error) {
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        break;
                    case 2:
                        console.log('Position Unavailable');
                        break;
                    case 3:
                        console.log('Timeout');
                        break;
                }
            });
        }
        ;
    };
    ViewCloseColComponent.prototype.getColoniasCercanas = function (radio) {
        var _this = this;
        var lat = this.geolocationPosition["coords"]["latitude"];
        var lon = this.geolocationPosition["coords"]["longitude"];
        var especie = 9;
        this.coloniasService.recuperaColoniasCercanas(radio, lat, lon, especie).subscribe(function (data) {
            _this.listaColonias = data;
            console.log(data);
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("ViewCol.errorMsg1"));
        });
    };
    ViewCloseColComponent.prototype.openLg = function (content) {
        this.modalService.open(content, { size: 'lg' });
    };
    ViewCloseColComponent.prototype.newFavorito = function (colId) {
        var data = {
            "usuario": "1",
            "colonia": colId
        };
        this.coloniasService.nuevoFavorito(data).subscribe(function (message) {
            console.log(message);
        }, function (error) {
            console.log(error);
        });
    };
    ViewCloseColComponent = __decorate([
        core_1.Component({
            selector: 'app-view-close-col',
            templateUrl: './view-close-col.component.html',
            styleUrls: ['./view-close-col.component.scss']
        }),
        __metadata("design:paramtypes", [colonias_service_1.ColoniasService,
            ngx_alerts_1.AlertService,
            core_2.TranslateService,
            ng_bootstrap_1.NgbModal])
    ], ViewCloseColComponent);
    return ViewCloseColComponent;
}());
exports.ViewCloseColComponent = ViewCloseColComponent;
//# sourceMappingURL=view-close-col.component.js.map