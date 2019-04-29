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
var territorio_1 = require("../../../models/territorio");
var loc_nidos_terr_1 = require("../../../models/loc-nidos-terr");
var forms_1 = require("@angular/forms");
var RegisterTerrComponent = /** @class */ (function () {
    function RegisterTerrComponent(translate, seoService, territoriosService, alertService, formBuilder) {
        this.translate = translate;
        this.seoService = seoService;
        this.territoriosService = territoriosService;
        this.alertService = alertService;
        this.formBuilder = formBuilder;
        this.listaEmpl = [];
        this.listaTipos = [];
        this.listaCCAA = [];
        this.listaTemporadas = [];
        this.listaProv = [];
        this.listaMun = [];
        this.listaTipoProp = [];
        this.listaTipoEd = [];
        this.listaNidos = [];
        this.loading = false;
        this.markers = [];
    }
    RegisterTerrComponent.prototype.ngOnInit = function () {
        this.getLocalizacion();
        this.recuperaTemporadas();
        this.recuperaCCAA();
        this.recuperaTipoProp();
        this.recuperaTipoEd();
        this.recuperaEmplazamientos();
        this.recuperaTipos();
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
            temporada: ['', forms_1.Validators.required],
            numPiso: [''],
            emplazamiento: ['', forms_1.Validators.required],
            tipo: [''],
            amenazada: ['', forms_1.Validators.required]
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
    RegisterTerrComponent.prototype.recuperaEmplazamientos = function () {
        var _this = this;
        this.territoriosService.getEmplazamientos().subscribe(function (data) {
            _this.listaEmpl = data["hydra:member"];
        });
    };
    RegisterTerrComponent.prototype.recuperaTipos = function () {
        var _this = this;
        this.territoriosService.getTipos().subscribe(function (data) {
            console.log(data);
            _this.listaTipos = data["hydra:member"];
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
    RegisterTerrComponent.prototype.getLocalizacion = function () {
        var _this = this;
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position["coords"]["latitude"];
                _this.longitude = position["coords"]["longitude"];
                console.log(_this.latitude);
                console.log(_this.longitude);
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
    //https://mdbootstrap.com/docs/angular/advanced/google-maps/
    RegisterTerrComponent.prototype.placeMarker = function (position) {
        var lat = position.coords.lat;
        var lng = position.coords.lng;
        this.markers = [{ latitude: lat, longitude: lng }];
    };
    RegisterTerrComponent.prototype.registraTerritorio = function () {
        //PASO 1 ->Información general del territorio
        var _this = this;
        var territorio = new territorio_1.Territorio();
        var locNidos = new loc_nidos_terr_1.LocNidosTerr();
        //Esta info debe ser sacada de localstorage
        territorio.setUsuario("pruebaUsu");
        locNidos.setUsuario("pruebaUsu");
        territorio.setEspecie(parseInt(JSON.parse(localStorage.getItem('especie'))["especie_id"]));
        //
        territorio.setNombre(this.registerForm.get("nombre").value);
        territorio.setNombreCentro(this.registerForm.get("nombreCentro").value);
        territorio.setAnno(parseInt(this.registerForm.get("temporada").value, 10));
        territorio.setCcaa(this.registerForm.get("ccaa").value);
        territorio.setProvincia(this.registerForm.get("provincia").value);
        territorio.setMunicipio(this.registerForm.get("municipio").value);
        territorio.setBarrio(this.registerForm.get("barrio").value);
        territorio.setCalleNumPiso(this.registerForm.get("calleNumPiso").value);
        territorio.setTipoEdificio(this.registerForm.get("tipoEdificio").value);
        territorio.setTipoPropiedad(this.registerForm.get("tipoPropiedad").value);
        territorio.setTipoTerritorioId(this.registerForm.get("tipo").value);
        territorio.setAmenazada(JSON.parse(this.registerForm.get("amenazada").value));
        //PASO 2 -> Información sobre los nidos
        locNidos.setFachada($("#fachada").is(":checked"));
        locNidos.setTrasera($("#trasera").is(":checked"));
        locNidos.setLatDer($("#latDer").is(":checked"));
        locNidos.setLatIzq($("#latIzq").is(":checked"));
        locNidos.setPatio($("#patio").is(":checked"));
        locNidos.setLat(this.markers["0"]["latitude"]);
        locNidos.setLon(this.markers["0"]["longitude"]);
        locNidos.setNumPiso(this.registerForm.get("numPiso").value);
        locNidos.setEmplazamientoId(this.registerForm.get("emplazamiento").value);
        this.listaNidos = [];
        if ($("#fachada").is(":checked")) {
            this.listaNidos.push(this.translate.instant("RegisterCol.fachada"));
        }
        if ($("#trasera").is(":checked")) {
            this.listaNidos.push(this.translate.instant("RegisterCol.trasera"));
        }
        if ($("#latDer").is(":checked")) {
            this.listaNidos.push(this.translate.instant("RegisterCol.latDer"));
        }
        if ($("#latIzq").is(":checked")) {
            this.listaNidos.push(this.translate.instant("RegisterCol.latIzq"));
        }
        if ($("#patio").is(":checked")) {
            this.listaNidos.push(this.translate.instant("RegisterCol.patio"));
        }
        console.log(territorio);
        console.log(locNidos);
        this.loading = true;
        //Empezamos registrando el territorio
        this.territoriosService.nuevoTerritorio(territorio).subscribe(function (data) {
            //Cuando el territorio es creado, obtenemos su id para completar los siguientes pasos
            _this.alertService.success(_this.translate.instant("RegisterTerr.successMsg1"));
            //Completamos datos de nidos
            _this.territoriosService.completaTerritorioNidos(locNidos, data["id"]).subscribe(function (dataNidos) {
                _this.alertService.success(_this.translate.instant("RegisterCol.successMsg2"));
                _this.loading = false;
            }, function (errorNidos) {
                _this.alertService.danger(_this.translate.instant("RegisterCol.errorMsg2"));
                _this.loading = false;
            });
        }, function (error) {
            _this.alertService.danger(_this.translate.instant("RegisterTerr.errorMsg1"));
            _this.loading = false;
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