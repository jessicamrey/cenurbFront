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
var StatisticsNestsComponent = /** @class */ (function () {
    function StatisticsNestsComponent(translate, coloniasService, alertService, seoService) {
        this.translate = translate;
        this.coloniasService = coloniasService;
        this.alertService = alertService;
        this.seoService = seoService;
        this.loading = false;
        this.annoChartData = [];
        this.annoData = [];
        this.ccaaChartData = [];
        this.provChartData = [];
        this.listaCCAA = [];
        this.listaProv = [];
        this.listaMun = [];
        this.listaTipoEd = [];
        this.listaTemporadas = [];
        this.especie = parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]);
        this.especieNombre = JSON.parse(localStorage.getItem('especie'))["especie"];
        // bar chart
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartTypeH = 'horizontalBar';
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.labels = ["Num. nidos", "Num. nidos ocupados", "Num. nidos vacios", "Num. nidos exito"];
        this.show = false;
        this.showCcaa = false;
        this.showCcaa = false;
        this.disableProv = true;
        this.disableMun = true;
        this.ccaaFiltered = false;
        this.start = 1;
    }
    StatisticsNestsComponent.prototype.ngOnInit = function () {
        this.recuperaCCAA();
        this.recuperaTipoEd();
        this.recuperaTemporadas();
        this.statsAnno('');
        this.statsCcaa('all');
        /*this.labels=[this.translate.instant("ViewVisits.numNest"),
                     this.translate.instant("ViewVisits.numTaken"),
                     this.translate.instant("ViewVisits.numEmpty"),
                     this.translate.instant("ViewVisits.numSuccess")]*/
    };
    StatisticsNestsComponent.prototype.recuperaTipoEd = function () {
        var _this = this;
        this.seoService.getTipoEd().subscribe(function (data) {
            _this.listaTipoEd = data["hydra:member"];
        });
    };
    StatisticsNestsComponent.prototype.recuperaTemporadas = function () {
        var _this = this;
        this.coloniasService.getTemporadas().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                _this.listaTemporadas.push(item["anno"]);
            }
        }, function (error) {
            console.log(error);
        });
    };
    StatisticsNestsComponent.prototype.recuperaCCAA = function () {
        var _this = this;
        this.seoService.getCCAA().subscribe(function (data) {
            _this.listaCCAA = data;
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetCCAA"));
        });
    };
    StatisticsNestsComponent.prototype.recuperaProvincia = function () {
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
    StatisticsNestsComponent.prototype.recuperaMunicipio = function () {
        var _this = this;
        var id = $("#selectProvincia option:selected").attr("id");
        this.seoService.getMunicipio(id).subscribe(function (data) {
            _this.listaMun = data;
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetMun"));
        });
    };
    // RECUPERAMOS DATOS DE ESTADISTICAS, NO TODAS SE ASOCIARAN CON UN GRAFICO  
    StatisticsNestsComponent.prototype.statsAnno = function (busqueda) {
        var _this = this;
        this.show = false;
        this.loading = true;
        this.coloniasService.getStatsAnnoCol(this.especie, '').subscribe(function (data) {
            _this.annoData = data;
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var item = data_2[_i];
                var dataList = { data: [item[1], item[2], item[3], item[4]], label: _this.especieNombre };
                _this.annoChartData[item["anno"]] = [dataList];
                if (_this.start == data.length) {
                    _this.show = true;
                    _this.start = 1;
                    _this.loading = false;
                }
                _this.start++;
            }
        }, function (error) {
            _this.loading = false;
            console.log(error);
        });
    };
    StatisticsNestsComponent.prototype.statsCcaa = function (ccaa) {
        var _this = this;
        this.showCcaa = false;
        this.loading = true;
        if (ccaa == 'all') {
            this.ccaaFiltered = false;
            this.coloniasService.getStatsCcaaCol(this.especie, '').subscribe(function (data) {
                for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
                    var item = data_3[_i];
                    var dataList = { data: [item[1], item[2], item[3], item[4]], label: _this.especieNombre };
                    _this.ccaaChartData[item["ccaa"]] = [dataList];
                    if (_this.start == data.length) {
                        _this.showCcaa = true;
                        _this.start = 1;
                        _this.loading = false;
                    }
                    _this.start++;
                }
            }, function (error) {
                _this.loading = false;
                console.log(error);
            });
        }
        else {
            this.ccaaChartData = [this.ccaaChartData[ccaa]];
            this.ccaaFiltered = true;
        }
    };
    StatisticsNestsComponent.prototype.statsProvincia = function (busqueda) {
        console.log(this.listaProv);
        var ccaa = $("#selectCCAA option:selected").attr("value");
        this.coloniasService.getStatsProvinciaCol(this.especie, busqueda).subscribe(function (data) {
            console.log("DATA PROVINCIA");
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    StatisticsNestsComponent.prototype.statsMunicipio = function (busqueda) {
        this.coloniasService.getStatsMunicipioCol(this.especie, busqueda).subscribe(function (data) {
            console.log("DATA MUNICIPIO");
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    StatisticsNestsComponent.prototype.statsTipoEdificio = function (busqueda) {
        this.coloniasService.getStatsTipoEdificioCol(this.especie, busqueda).subscribe(function (data) {
            console.log("DATA TIPO EDIFICIO");
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    StatisticsNestsComponent.prototype.filtrar = function () {
        //reseteamos las listas de datos
        this.show = false;
        this.showCcaa = false;
        this.start = 1;
        var busqueda = '?';
        var ccaa = $("#selectCCAA option:selected").attr("value");
        var prov = $("#selectProvincia option:selected").attr("value");
        var temp = $("#temporada option:selected").attr("value");
        var mun = $("#selectMunicipio option:selected").attr("value");
        var tipoEd = $("#tipoEdificio option:selected").attr("value");
        this.ccaaSelected = ccaa;
        ccaa != 'all' ? busqueda = busqueda + '&ccaa=' + ccaa : busqueda;
        prov != 'all' ? busqueda = busqueda + '&provincia=' + prov : busqueda;
        temp != 'all' ? busqueda = busqueda + '&temporada=' + temp : busqueda;
        mun != 'all' && mun != undefined ? busqueda = busqueda + '&municipio=' + mun : busqueda;
        tipoEd != 'all' ? busqueda = busqueda + '&tipoEdificio=' + tipoEd : busqueda;
        console.log(busqueda);
        this.statsAnno(busqueda);
        this.statsCcaa(ccaa);
        //this.statsTipoEdificio(busqueda);
        if (ccaa != 'all') {
            this.disableProv = false;
            this.statsProvincia(busqueda);
        }
        else {
            this.disableProv = true;
        }
        if (prov != 'all') {
            this.disableMun = false;
            this.statsMunicipio(busqueda);
        }
        else {
            this.disableMun = true;
        }
    };
    StatisticsNestsComponent = __decorate([
        core_1.Component({
            selector: 'app-statistics-nests',
            templateUrl: './statistics-nests.component.html',
            styleUrls: ['./statistics-nests.component.scss']
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            colonias_service_1.ColoniasService,
            ngx_alerts_1.AlertService,
            seo_apis_service_1.SeoApisService])
    ], StatisticsNestsComponent);
    return StatisticsNestsComponent;
}());
exports.StatisticsNestsComponent = StatisticsNestsComponent;
//# sourceMappingURL=statistics-nests.component.js.map