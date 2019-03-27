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
var colonia_1 = require("../../../models/colonia");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var RegisterVisitComponent = /** @class */ (function () {
    function RegisterVisitComponent(translate, coloniasService, alertService, modalService) {
        this.translate = translate;
        this.coloniasService = coloniasService;
        this.alertService = alertService;
        this.modalService = modalService;
        this.listaCol = [];
        this.col = new colonia_1.Colonia();
        this.found = false;
    }
    RegisterVisitComponent.prototype.ngOnInit = function () {
        this.recuperaColoniasFavoritas(0);
    };
    RegisterVisitComponent.prototype.recuperaColoniasFavoritas = function (userId) {
        var _this = this;
        this.coloniasService.recuperaFavoritos(userId).subscribe(function (data) {
            _this.listaCol = data;
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    RegisterVisitComponent.prototype.openLg = function (content) {
        this.modalService.open(content, { size: 'lg' });
    };
    RegisterVisitComponent.prototype.buscarColonia = function () {
        var _this = this;
        var id = $("#colId").val();
        this.coloniasService.recuperaColonia(id).subscribe(function (data) {
            _this.col = data;
            _this.alertService.success(_this.translate.instant("RegisterVisit.found"));
            _this.found = true;
            console.log(data);
            console.log(_this.col);
        }, function (error) {
            _this.found = false;
            _this.alertService.warning(_this.translate.instant("RegisterVisit.notFound"));
        });
    };
    RegisterVisitComponent = __decorate([
        core_1.Component({
            selector: 'app-register-visit',
            templateUrl: './register-visit.component.html',
            styleUrls: ['./register-visit.component.scss']
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            colonias_service_1.ColoniasService,
            ngx_alerts_1.AlertService,
            ng_bootstrap_1.NgbModal])
    ], RegisterVisitComponent);
    return RegisterVisitComponent;
}());
exports.RegisterVisitComponent = RegisterVisitComponent;
//# sourceMappingURL=register-visit.component.js.map