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
var ViewColComponent = /** @class */ (function () {
    function ViewColComponent(translate, coloniasService, alertService, modalService) {
        this.translate = translate;
        this.coloniasService = coloniasService;
        this.alertService = alertService;
        this.modalService = modalService;
        this.listaColonias = [];
        this.showList = true;
        this.totalPages = 0;
        this.advancedPagination = 1;
    }
    ViewColComponent.prototype.ngOnInit = function () {
        this.recuperaColonias(1);
    };
    ViewColComponent.prototype.recuperaColonias = function (pageNumber) {
        var _this = this;
        this.coloniasService.recuperaColonias(pageNumber).subscribe(function (data) {
            _this.listaColonias = data["hydra:member"];
            var last = data["hydra:view"]["hydra:last"];
            last = last.substr(last.indexOf('page') + 5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
            _this.totalPages = last * 10;
            console.log(data);
            console.log(_this.listaColonias);
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("ViewCol.errorMsg1"));
        });
    };
    ViewColComponent.prototype.openWindowCustomClass = function (content) {
        this.modalService.open(content, { windowClass: 'dark-modal' });
    };
    ViewColComponent.prototype.pageChanged = function (page) {
        console.log('Page changed: ' + page);
    };
    ViewColComponent = __decorate([
        core_1.Component({
            selector: 'app-view-col',
            templateUrl: './view-col.component.html',
            styleUrls: ['./view-col.component.scss'],
        })
        //Ejemplo en: http://embed.plnkr.co/TOi5T5h6ZOu3XpNdGMy8/
        ,
        __metadata("design:paramtypes", [core_2.TranslateService,
            colonias_service_1.ColoniasService,
            ngx_alerts_1.AlertService,
            ng_bootstrap_1.NgbModal])
    ], ViewColComponent);
    return ViewColComponent;
}());
exports.ViewColComponent = ViewColComponent;
//# sourceMappingURL=view-col.component.js.map