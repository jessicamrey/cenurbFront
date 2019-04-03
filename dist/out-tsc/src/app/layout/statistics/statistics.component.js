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
        this.mostrar = false;
        this.annoChartData = [];
        this.annoChartLabels = [];
        this.ccaaChartData = [];
        this.ccaaChartLabels = [];
        this.provChartData = [];
        this.provChartLabels = [];
        this.listaCCAA = [];
        this.listaProvinciasLabels = [];
        this.listaProvinciasLabels = [];
        // bar chart
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = [
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012'
        ];
        this.barChartType = 'horizontalBar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
        // Doughnut
        this.doughnutChartLabels = [
            'Download Sales',
            'In-Store Sales',
            'Mail-Order Sales'
        ];
        this.doughnutChartData = [350, 450, 100];
        this.doughnutChartType = 'doughnut';
        // Radar
        this.radarChartLabels = [
            'Eating',
            'Drinking',
            'Sleeping',
            'Designing',
            'Coding',
            'Cycling',
            'Running'
        ];
        this.radarChartData = [
            { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
        ];
        this.radarChartType = 'radar';
        // Pie
        this.pieChartLabels = [
            'Download Sales',
            'In-Store Sales',
            'Mail Sales'
        ];
        this.pieChartData = [300, 500, 100];
        this.pieChartType = 'pie';
        // PolarArea
        this.polarAreaChartLabels = [
            'Download Sales',
            'In-Store Sales',
            'Mail Sales',
            'Telesales',
            'Corporate Sales'
        ];
        this.polarAreaChartData = [300, 500, 100, 40, 120];
        this.polarAreaLegend = true;
        this.polarAreaChartType = 'polarArea';
        // lineChart
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
            { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
        ];
        this.lineChartLabels = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July'
        ];
        this.lineChartOptions = {
            responsive: true
        };
        this.lineChartColors = [
            {
                // grey
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                // dark grey
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                // grey
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    // events
    StatisticsComponent.prototype.chartClicked = function (e) {
        // console.log(e);
    };
    StatisticsComponent.prototype.chartHovered = function (e) {
        // console.log(e);
    };
    StatisticsComponent.prototype.randomize = function () {
        // Only Change 3 values
        var data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        var clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    };
    StatisticsComponent.prototype.ngOnInit = function () {
        //this.statsAnno();
        this.statsCcca();
        this.statsProvincia();
    };
    StatisticsComponent.prototype.statsAnno = function () {
        var _this = this;
        var dataList = [];
        //TODO: recuperar especie de localstorage, recuperar temporada de nueva entidad
        this.coloniasService.getStatsAnno(9, 2019).subscribe(function (data) {
            console.log(data);
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                dataList.push(item["1"]);
                _this.annoChartLabels.push(item["temporada"]);
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
        var dataList = [];
        this.coloniasService.getStatsProvincia(9, 2019).subscribe(function (data) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var item = data_2[_i];
                dataList.push(item["1"]);
                _this.provChartLabels.push(item["provincia"]);
            }
            _this.provChartData.push({ data: dataList, label: "Avion comun" });
        }, function (error) {
            console.log(error);
        });
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
                _this.recuperaProvincia(ccaa["ID_COM"]);
            }
            console.log(_this.listaCCAA);
            console.log(_this.listaProvincias);
            _this.coloniasService.getStatsCcaa(9, 2019).subscribe(function (data) {
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
    StatisticsComponent.prototype.recuperaProvincia = function (idCom) {
        var _this = this;
        this.seoService.getProvincia(idCom).subscribe(function (data) {
            var lista = [];
            for (var _i = 0, data_5 = data; _i < data_5.length; _i++) {
                var item = data_5[_i];
                lista.push(item["DEN_PROV"]);
            }
            console.log(lista);
            _this.listaProvinciasLabels[idCom] = lista;
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