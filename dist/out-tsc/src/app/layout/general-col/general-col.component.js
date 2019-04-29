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
var colonias_service_1 = require("../../../services/colonias.service");
var GeneralColComponent = /** @class */ (function () {
    function GeneralColComponent(translate, seoService, alertService, coloniasService) {
        this.translate = translate;
        this.seoService = seoService;
        this.alertService = alertService;
        this.coloniasService = coloniasService;
        this.listaCol = [];
        this.listaCCAA = [];
        this.listaProv = [];
        this.listaTemporadas = [];
        this.loading = false;
        this.chartData = [];
        this.dataList = [];
        this.chartLabels = [];
        this.especie = parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]);
        this.show = false;
        this.start = 1;
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartType = 'horizontalBar';
        this.barChartLegend = true;
    }
    GeneralColComponent.prototype.ngOnInit = function () {
        this.recuperaColoniales('Colonias registradas');
        this.recuperaCCAA();
        this.recuperaTemporadas();
    };
    GeneralColComponent.prototype.recuperaColoniales = function (titulo) {
        var _this = this;
        this.loading = true;
        this.show = false;
        console.log(this.chartData);
        console.log(this.chartLabels);
        this.chartData = [];
        this.dataList = [];
        this.chartLabels = [];
        if (this.listaCol.length <= 0) {
            this.chartData.push({ data: this.dataList, label: titulo });
            var clone = JSON.parse(JSON.stringify(this.chartData));
            clone[0].data = this.dataList;
            this.chartData = clone;
            this.seoService.listaColoniales().subscribe(function (data) {
                _this.listaCol = data;
                console.log(_this.listaCol);
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    _this.getStatsEspecie(item["ID_ESP"], data.length);
                    _this.chartLabels.push(item["DEN_ESP_CAS"]);
                }
            }, function (error) {
                _this.loading = false;
                _this.alertService.warning(_this.translate.instant("Dashboard.errorGetNoCol"));
            });
        }
        else { //Aqui nos ahorramos llamadas a seoService
            this.chartData.push({ data: this.dataList, label: titulo });
            var clone = JSON.parse(JSON.stringify(this.chartData));
            clone[0].data = this.dataList;
            this.chartData = clone;
            for (var _i = 0, _a = this.listaCol; _i < _a.length; _i++) {
                var item = _a[_i];
                this.getStatsEspecie(item["ID_ESP"], this.listaCol.length);
                this.chartLabels.push(item["DEN_ESP_CAS"]);
            }
        }
    };
    GeneralColComponent.prototype.getStatsEspecie = function (especie, cantidad) {
        var _this = this;
        var busqueda = '';
        var ccaa = $("#selectCCAA option:selected").attr("value");
        var prov = $("#selectProvincia option:selected").attr("value");
        var temp = $("#temporada option:selected").attr("value");
        ccaa != 'all' ? busqueda = busqueda + '&ccaa=' + ccaa : busqueda;
        prov != 'all' ? busqueda = busqueda + '&provincia=' + prov : busqueda;
        temp != 'all' ? busqueda = busqueda + '&temporada=' + temp : busqueda;
        console.log(busqueda);
        this.coloniasService.getStats(especie, busqueda).subscribe(function (data) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var item = data_2[_i];
                _this.dataList.push(item["1"]);
                if (_this.start == cantidad) {
                    _this.show = true;
                    _this.start = 1;
                    _this.loading = false;
                }
                _this.start++;
            }
        }, function (error) {
            console.log(error);
            _this.loading = false;
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetNoCol"));
        });
    };
    GeneralColComponent.prototype.recuperaCCAA = function () {
        var _this = this;
        this.seoService.getCCAA().subscribe(function (data) {
            _this.listaCCAA = data;
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetCCAA"));
        });
    };
    GeneralColComponent.prototype.recuperaProvincia = function () {
        var _this = this;
        this.listaProv = [];
        var id = $("#selectCCAA option:selected").attr("id");
        this.seoService.getProvincia(id).subscribe(function (data) {
            _this.listaProv = data;
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetProv"));
        });
    };
    GeneralColComponent.prototype.recuperaTemporadas = function () {
        var _this = this;
        this.coloniasService.getTemporadas().subscribe(function (data) {
            for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
                var item = data_3[_i];
                if (item["abierta"] == true) {
                    _this.listaTemporadas.push(item["anno"]);
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    GeneralColComponent = __decorate([
        core_1.Component({
            selector: 'app-general-col',
            templateUrl: './general-col.component.html',
            styleUrls: ['./general-col.component.scss']
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            seo_apis_service_1.SeoApisService,
            ngx_alerts_1.AlertService,
            colonias_service_1.ColoniasService])
    ], GeneralColComponent);
    return GeneralColComponent;
}());
exports.GeneralColComponent = GeneralColComponent;
//# sourceMappingURL=general-col.component.js.map