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
var territorios_service_1 = require("../../../services/territorios.service");
var core_2 = require("@ngx-translate/core");
var ngx_alerts_1 = require("ngx-alerts");
var forms_1 = require("@angular/forms");
var RegisterTerrComponent = /** @class */ (function () {
    function RegisterTerrComponent(translate, seoService, territoriosService, alertService, formBuilder) {
        this.translate = translate;
        this.seoService = seoService;
        this.territoriosService = territoriosService;
        this.alertService = alertService;
        this.formBuilder = formBuilder;
        this.listaEmpl = [];
        this.listaCCAA = [];
        this.listaTemporadas = [];
        this.listaProv = [];
        this.listaMun = [];
        this.listaTipoProp = [];
        this.listaTipoEd = [];
    }
    RegisterTerrComponent.prototype.ngOnInit = function () {
        this.recuperaTemporadas();
        this.recuperaCCAA();
        this.recuperaTipoProp();
        this.recuperaTipoEd();
        this.registerForm = this.formBuilder.group({
            nombre: ['', forms_1.Validators.required],
            nombreCentro: ['', forms_1.Validators.required],
            barrio: ['', forms_1.Validators.required],
            calleNumPiso: ['', forms_1.Validators.required],
            ccaa: ['', forms_1.Validators.required],
            provincia: ['', forms_1.Validators.required],
            municipio: ['', forms_1.Validators.required],
            tipoPropiedad: ['', forms_1.Validators.required],
            tipoEdificio: ['', forms_1.Validators.required],
            temporada: ['', forms_1.Validators.required]
        });
    };
    RegisterTerrComponent.prototype.recuperaTemporadas = function () {
        var _this = this;
        this.territoriosService.getTemporadas().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                if (item["abierta"] == true) {
                    _this.listaTemporadas.push(item["anno"]);
                }
            }
            console.log(_this.listaTemporadas);
        }, function (error) {
            console.log(error);
        });
    };
    RegisterTerrComponent.prototype.recuperaTipoProp = function () {
        var _this = this;
        this.seoService.getTipoProp().subscribe(function (data) {
            _this.listaTipoProp = data["hydra:member"];
        });
    };
    RegisterTerrComponent.prototype.recuperaTipoEd = function () {
        var _this = this;
        this.seoService.getTipoEd().subscribe(function (data) {
            _this.listaTipoEd = data["hydra:member"];
        });
    };
    RegisterTerrComponent.prototype.recuperaCCAA = function () {
        var _this = this;
        this.seoService.getCCAA().subscribe(function (data) {
            _this.listaCCAA = data;
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetCCAA"));
        });
    };
    RegisterTerrComponent.prototype.recuperaProvincia = function () {
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
    RegisterTerrComponent.prototype.recuperaMunicipio = function () {
        var _this = this;
        var id = $("#selectProvincia option:selected").attr("id");
        this.seoService.getMunicipio(id).subscribe(function (data) {
            _this.listaMun = data;
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetMun"));
        });
    };
    RegisterTerrComponent = __decorate([
        core_1.Component({
            selector: 'app-register-terr',
            templateUrl: './register-terr.component.html',
            styleUrls: ['./register-terr.component.scss']
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            seo_apis_service_1.SeoApisService,
            territorios_service_1.TerritoriosService,
            ngx_alerts_1.AlertService,
            forms_1.FormBuilder])
    ], RegisterTerrComponent);
    return RegisterTerrComponent;
}());
exports.RegisterTerrComponent = RegisterTerrComponent;
//# sourceMappingURL=register-terr.component.js.map