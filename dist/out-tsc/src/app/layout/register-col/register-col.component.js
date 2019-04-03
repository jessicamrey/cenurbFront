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
var colonias_service_1 = require("../../../services/colonias.service");
var core_2 = require("@ngx-translate/core");
var ngx_alerts_1 = require("ngx-alerts");
var colonia_1 = require("../../../models/colonia");
var loc_nidos_1 = require("../../../models/loc-nidos");
var forms_1 = require("@angular/forms");
var RegisterColComponent = /** @class */ (function () {
    function RegisterColComponent(translate, seoService, coloniasService, alertService, formBuilder) {
        this.translate = translate;
        this.seoService = seoService;
        this.coloniasService = coloniasService;
        this.alertService = alertService;
        this.formBuilder = formBuilder;
        this.listaCCAA = [];
        this.listaTemporadas = [];
        this.listaProv = [];
        this.listaMun = [];
        this.listaTipoProp = [];
        this.listaTipoEd = [];
        this.listaCol = [];
        this.listaNidos = [];
        this.listaEspecies = [];
        this.listaEspeciesNombres = [];
        this.otras = false;
        this.colonia = new colonia_1.Colonia();
        this.locNidos = new loc_nidos_1.LocNidos();
        this.loading = false;
        this.markers = [];
    }
    RegisterColComponent.prototype.ngOnInit = function () {
        this.getLocalizacion();
        this.recuperaTemporadas();
        this.recuperaCCAA();
        this.recuperaTipoProp();
        this.recuperaTipoEd();
        this.recuperaColoniales();
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
    RegisterColComponent.prototype.getLocalizacion = function () {
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
    RegisterColComponent.prototype.placeMarker = function (position) {
        var lat = position.coords.lat;
        var lng = position.coords.lng;
        this.markers = [{ latitude: lat, longitude: lng }];
    };
    RegisterColComponent.prototype.recuperaTemporadas = function () {
        var _this = this;
        this.coloniasService.getTemporadas().subscribe(function (data) {
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
    RegisterColComponent.prototype.recuperaColoniales = function () {
        var _this = this;
        this.seoService.listaColoniales().subscribe(function (data) {
            _this.listaCol = data;
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetCol"));
        });
    };
    RegisterColComponent.prototype.recuperaTipoProp = function () {
        var _this = this;
        this.seoService.getTipoProp().subscribe(function (data) {
            _this.listaTipoProp = data["hydra:member"];
        });
    };
    RegisterColComponent.prototype.recuperaTipoEd = function () {
        var _this = this;
        this.seoService.getTipoEd().subscribe(function (data) {
            _this.listaTipoEd = data["hydra:member"];
        });
    };
    RegisterColComponent.prototype.recuperaCCAA = function () {
        var _this = this;
        this.seoService.getCCAA().subscribe(function (data) {
            _this.listaCCAA = data;
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetCCAA"));
        });
    };
    RegisterColComponent.prototype.recuperaProvincia = function () {
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
    RegisterColComponent.prototype.recuperaMunicipio = function () {
        var _this = this;
        var id = $("#selectProvincia option:selected").attr("id");
        this.seoService.getMunicipio(id).subscribe(function (data) {
            _this.listaMun = data;
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Dashboard.errorGetMun"));
        });
    };
    RegisterColComponent.prototype.prepararDatos = function () {
        //PASO 1 ->Información general de la colonia
        //Esta info debe ser sacada de localstorage
        this.colonia.setUsuario("pruebaUsu");
        this.locNidos.setUsuario("pruebaUsu");
        this.colonia.setEspecie(9);
        //
        this.colonia.setNombre(this.registerForm.get("nombre").value);
        this.colonia.setNombreCentro(this.registerForm.get("nombreCentro").value);
        this.colonia.setAnno(parseInt(this.registerForm.get("temporada").value, 10));
        this.colonia.setCcaa(this.registerForm.get("ccaa").value);
        this.colonia.setProvincia(this.registerForm.get("provincia").value);
        this.colonia.setMunicipio(this.registerForm.get("municipio").value);
        this.colonia.setBarrio(this.registerForm.get("barrio").value);
        this.colonia.setCalleNumPiso(this.registerForm.get("calleNumPiso").value);
        this.colonia.setTipoEdificio(this.registerForm.get("tipoEdificio").value);
        this.colonia.setTipoPropiedad(this.registerForm.get("tipoPropiedad").value);
        //PASO 2 -> Información sobre los nidos
        this.locNidos.setFachada($("#fachada").is(":checked"));
        this.locNidos.setTrasera($("#trasera").is(":checked"));
        this.locNidos.setLatDer($("#latDer").is(":checked"));
        this.locNidos.setLatIzq($("#latIzq").is(":checked"));
        this.locNidos.setPatio($("#patio").is(":checked"));
        this.locNidos.setLat(this.markers["0"]["latitude"]);
        this.locNidos.setLon(this.markers["0"]["longitude"]);
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
        //PASO 3 -> Información sobre otras especies
        this.listaEspecies = [];
        this.listaEspeciesNombres = [];
        for (var _i = 0, _a = this.listaCol; _i < _a.length; _i++) {
            var item = _a[_i];
            if ($("#" + item.ID_ESP).is(":checked")) {
                this.listaEspecies.push(item.ID_ESP);
                this.listaEspeciesNombres.push(item.DEN_ESP_CAS);
            }
        }
        console.log(this.listaEspecies);
        console.log(this.listaEspeciesNombres);
    };
    RegisterColComponent.prototype.registrarColonia = function () {
        var _this = this;
        this.loading = true;
        //Empezamos registrando la colonia
        this.coloniasService.nuevaColonia(this.colonia).subscribe(function (data) {
            //Cuando la colonia es creada, obtenemos su id para completar los siguientes pasos
            _this.alertService.success(_this.translate.instant("RegisterCol.successMsg1"));
            //Completamos datos de nidos
            _this.coloniasService.completaColoniaNidos(_this.locNidos, data["id"]).subscribe(function (dataNidos) {
                _this.alertService.success(_this.translate.instant("RegisterCol.successMsg2"));
                _this.loading = false;
            }, function (errorNidos) {
                _this.alertService.danger(_this.translate.instant("RegisterCol.errorMsg2"));
                _this.loading = false;
            });
            //Completamos datos de especies en caso necesario
            if (_this.listaEspecies.length > 0) {
                for (var _i = 0, _a = _this.listaEspecies; _i < _a.length; _i++) {
                    var id_especie = _a[_i];
                    var params = {
                        especie: parseInt(id_especie, 10)
                    };
                    _this.coloniasService.completaColoniaEspecies(params, data["id"]).subscribe(function (dataEspecies) {
                        _this.alertService.success(_this.translate.instant("RegisterCol.successMsg3"));
                        _this.loading = false;
                    }, function (errorEspecies) {
                        _this.alertService.danger(_this.translate.instant("RegisterCol.errorMsg3"));
                        _this.loading = false;
                    });
                }
            }
        }, function (error) {
            _this.alertService.danger(_this.translate.instant("RegisterCol.errorMsg1"));
        });
    };
    RegisterColComponent = __decorate([
        core_1.Component({
            selector: 'app-register-col',
            templateUrl: './register-col.component.html',
            styleUrls: ['./register-col.component.scss']
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            seo_apis_service_1.SeoApisService,
            colonias_service_1.ColoniasService,
            ngx_alerts_1.AlertService,
            forms_1.FormBuilder])
    ], RegisterColComponent);
    return RegisterColComponent;
}());
exports.RegisterColComponent = RegisterColComponent;
//# sourceMappingURL=register-col.component.js.map