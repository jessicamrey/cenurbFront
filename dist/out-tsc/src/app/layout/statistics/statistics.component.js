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
var seo_apis_service_1 = require("../../../services/seo-apis.service");
var StatisticsComponent = /** @class */ (function () {
    function StatisticsComponent(translate, coloniasService, alertService, seoService) {
        this.translate = translate;
        this.coloniasService = coloniasService;
        this.alertService = alertService;
        this.seoService = seoService;
        this.loading = false;
        this.annoChartData = [];
        this.annoChartLabels = [];
        this.ccaaChartData = [];
        this.ccaaChartLabels = [];
        this.provChartData = [];
        this.provChartLabels = [];
        this.listaCCAA = [];
        this.listaProvinciasLabels = [];
        this.listaProvinciasData = [];
        this.especie = parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]);
        // bar chart
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartTypeH = 'horizontalBar';
        this.barChartType = 'bar';
        this.barChartLegend = true;
    }
    StatisticsComponent.prototype.ngOnInit = function () {
        this.statsAnno();
        this.statsCcca();
    };
    StatisticsComponent.prototype.statsAnno = function () {
        var _this = this;
        var dataList = [];
        //TODO: recuperar especie de localstorage, recuperar temporada de nueva entidad
        this.coloniasService.getStatsAnno(this.especie, 2019).subscribe(function (data) {
            console.log(data);
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                dataList.push(item["1"]);
                _this.annoChartLabels.push(item["anno"]);
            }
            _this.annoChartData.push({ data: dataList, label: "Avion comun" });
        }, function (error) {
            console.log(error);
        });
    };
    StatisticsComponent.prototype.statsCcca = function () {
        //Primero recuperamos todas las comunidades, ya que tienen que estar todas en el grafico, aunque su dato sea 0
        this.recuperaCCAA();
    };
    StatisticsComponent.prototype.statsProvincia = function () {
        var _this = this;
        this.loading = true;
        var finish = this.listaCCAA.length;
        var init = 0;
        var _loop_1 = function (ccaa) {
            this_1.coloniasService.getStatsProvincia(this_1.especie, 2019, ccaa["DEN_COM"]).subscribe(function (data) {
                var dataList = [];
                for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                    var item = data_2[_i];
                    dataList[_this.listaProvinciasLabels[item["ccaa"]].indexOf(item["provincia"])] = item["1"];
                }
                _this.listaProvinciasData[ccaa["DEN_COM"]] =
                    [{ data: dataList, label: "Avion comun" }];
                init++;
                if (init == finish) {
                    _this.loading = false;
                }
            }, function (error) {
                _this.loading = false;
                console.log(error);
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.listaCCAA; _i < _a.length; _i++) {
            var ccaa = _a[_i];
            _loop_1(ccaa);
        }
    };
    StatisticsComponent.prototype.recuperaCCAA = function () {
        var _this = this;
        var dataList = [];
        this.seoService.getCCAA().subscribe(function (data) {
            _this.listaCCAA = data;
            //Una vez que las hemos recuperado sin error, procedemos a obtener sus estadisticas
            for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
                var ccaa = data_3[_i];
                _this.ccaaChartLabels.push(ccaa["DEN_COM"]);
                _this.recuperaProvincia(ccaa["ID_COM"], ccaa["DEN_COM"]);
            }
            _this.statsProvincia();
            _this.coloniasService.getStatsCcaa(_this.especie, 2019).subscribe(function (data) {
                for (var _i = 0, data_4 = data; _i < data_4.length; _i++) {
                    var item = data_4[_i];
                    dataList[_this.ccaaChartLabels.indexOf(item["ccaa"])] = item["1"];
                }
                _this.ccaaChartData.push({ data: dataList, label: "Avion comun" });
            }, function (error) {
                console.log(error);
            });
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetCCAA"));
        });
    };
    StatisticsComponent.prototype.recuperaProvincia = function (idCom, den) {
        var _this = this;
        this.seoService.getProvincia(idCom).subscribe(function (data) {
            var lista = [];
            for (var _i = 0, data_5 = data; _i < data_5.length; _i++) {
                var item = data_5[_i];
                lista.push(item["DEN_PROV"]);
            }
            _this.listaProvinciasLabels[den] = lista;
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetProv"));
        });
    };
    StatisticsComponent.prototype.recuperaTemporadas = function () {
    };
    StatisticsComponent = __decorate([
        core_1.Component({
            selector: 'app-statistics',
            templateUrl: './statistics.component.html',
            styleUrls: ['./statistics.component.scss']
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            colonias_service_1.ColoniasService,
            ngx_alerts_1.AlertService,
            seo_apis_service_1.SeoApisService])
    ], StatisticsComponent);
    return StatisticsComponent;
}());
exports.StatisticsComponent = StatisticsComponent;
//# sourceMappingURL=statistics.component.js.map