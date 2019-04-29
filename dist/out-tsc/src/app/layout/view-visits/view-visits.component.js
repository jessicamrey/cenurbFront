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
var territorios_service_1 = require("../../../services/territorios.service");
var core_2 = require("@ngx-translate/core");
var ngx_alerts_1 = require("ngx-alerts");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var visita_colonia_1 = require("../../../models/visita-colonia");
var visita_territorio_1 = require("../../../models/visita-territorio");
var ViewVisitsComponent = /** @class */ (function () {
    function ViewVisitsComponent(translate, coloniasService, territoriosService, alertService, modalService, formBuilder) {
        this.translate = translate;
        this.coloniasService = coloniasService;
        this.territoriosService = territoriosService;
        this.alertService = alertService;
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.listaVisitas = [];
        this.listaVisitasTerr = [];
        this.listaObservaciones = [];
        this.colonias = [];
        this.coloniasId = [];
        this.territorios = [];
        this.territoriosId = [];
        this.showCol = true;
        this.totalPages = 0;
        this.totalPagesTerr = 0;
        this.loading = false;
        this.isEdit = false;
        this.markers = [];
    }
    ViewVisitsComponent.prototype.ngOnInit = function () {
        this.recuperaVisitas(0);
        this.recuperaVisitasTerritorio(0);
        this.registerForm = this.formBuilder.group({
            nombre: ['', forms_1.Validators.required],
            numNidos: ['', forms_1.Validators.required],
            numNidosExito: ['', forms_1.Validators.required],
            numNidosOcupados: ['', forms_1.Validators.required],
            numNidosVacios: ['', forms_1.Validators.required],
            numVisita: ['', forms_1.Validators.required]
        });
        this.registerFormTerr = this.formBuilder.group({
            observacion: ['', forms_1.Validators.required]
        });
        this.recuperaObservaciones();
        this.getLocalizacion();
    };
    ViewVisitsComponent.prototype.recuperaObservaciones = function () {
        var _this = this;
        this.territoriosService.getObservaciones().subscribe(function (data) {
            _this.listaObservaciones = data["hydra:member"];
            console.log(_this.listaObservaciones);
        });
    };
    ViewVisitsComponent.prototype.getLocalizacion = function () {
        var _this = this;
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position["coords"]["latitude"];
                _this.longitude = position["coords"]["longitude"];
                console.log(_this.latitude);
                console.log(_this.longitude);
                _this.markers = [{ latitude: position["coords"]["latitude"],
                        longitude: position["coords"]["longitude"] }];
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
    ViewVisitsComponent.prototype.placeMarker = function (position) {
        var lat = position.coords.lat;
        var lng = position.coords.lng;
        this.markers = [{ latitude: lat, longitude: lng }];
    };
    ViewVisitsComponent.prototype.recuperaVisitas = function (user) {
        var _this = this;
        this.listaVisitas = [];
        this.coloniasService.recuperaVisitasGeneral('?usuario=' + user).subscribe(function (data) {
            var last = data["hydra:view"]["hydra:last"];
            if (last != undefined) {
                last = last.substr(last.indexOf('page') + 5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                _this.totalPages = last * 10;
            }
            for (var _i = 0, _a = data["hydra:member"]; _i < _a.length; _i++) {
                var item = _a[_i];
                var date = new Date((item["fecha"]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getUTCDate() + 1;
                item["fecha"] = d + '/' + m + '/' + y;
                _this.listaVisitas.push(item);
                if (_this.coloniasId.indexOf(item.colonia["id"]) < 0) {
                    _this.colonias.push(item.colonia);
                    _this.coloniasId.push(item.colonia["id"]);
                }
            }
            //Tenemos que utilizar los Id's por separado porque indexOf(colonia) no lo detecta como el mismo objeto y no funciona
        }, function (error) {
            console.log(error);
        });
    };
    ViewVisitsComponent.prototype.recuperaVisitasTerritorio = function (user) {
        var _this = this;
        this.listaVisitasTerr = [];
        this.territoriosService.recuperaVisitasGeneral('?usuario=' + user).subscribe(function (data) {
            var last = data["hydra:view"]["hydra:last"];
            if (last != undefined) {
                last = last.substr(last.indexOf('page') + 5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                _this.totalPagesTerr = last * 10;
            }
            for (var _i = 0, _a = data["hydra:member"]; _i < _a.length; _i++) {
                var visita = _a[_i];
                var date = new Date((visita["fecha"]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getUTCDate() + 1;
                var h = date.getHours();
                var min = date.getMinutes();
                var s = date.getSeconds();
                visita["fecha"] = d + '/' + m + '/' + y;
                visita["hora"] = h + ':' + min + ':' + s;
                _this.listaVisitasTerr.push(visita);
                if (_this.territoriosId.indexOf(visita.territorio["id"]) < 0) {
                    _this.territorios.push(visita.territorio);
                    _this.territoriosId.push(visita.territorio["id"]);
                }
            }
        }, function (error) {
            console.log(error);
        });
        console.log(this.listaVisitasTerr);
    };
    ViewVisitsComponent.prototype.filtrar = function (user, page) {
        var _this = this;
        if (user === void 0) { user = 0; }
        var id = $("#colonia option:selected").attr("id");
        var busqueda = '?usuario=' + user;
        if (id != "all") {
            busqueda = busqueda + '&colonia=' + id;
        }
        this.dateSince != undefined ? busqueda = busqueda + '&fecha[after]=' + this.dateSince.year + '-' + this.dateSince.month + '-' + this.dateSince.day : busqueda;
        this.dateUntil != undefined ? busqueda = busqueda + '&fecha[before]=' + this.dateUntil.year + '-' + this.dateUntil.month + '-' + this.dateUntil.day : busqueda;
        page ? busqueda = busqueda + '&page=' + page : busqueda;
        this.listaVisitas = [];
        this.coloniasService.recuperaVisitasGeneral(busqueda).subscribe(function (data) {
            var last = data["hydra:view"]["hydra:last"];
            if (last != undefined) {
                last = last.substr(last.indexOf('page') + 5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                _this.totalPages = last * 10;
            }
            for (var _i = 0, _a = data["hydra:member"]; _i < _a.length; _i++) {
                var visita = _a[_i];
                var date = new Date((visita["fecha"]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getUTCDate() + 1;
                visita["fecha"] = d + '/' + m + '/' + y;
                _this.listaVisitas.push(visita);
            }
        }, function (error) {
            console.log(error);
        });
    };
    ViewVisitsComponent.prototype.filtrarTerr = function (user, page) {
        var _this = this;
        if (user === void 0) { user = 0; }
        var id = $("#territorio option:selected").attr("id");
        var busqueda = '?usuario=' + user;
        if (id != "all") {
            busqueda = busqueda + '&territorio=' + id;
        }
        this.dateSince != undefined ? busqueda = busqueda + '&fecha[after]=' + this.dateSince.year + '-' + this.dateSince.month + '-' + this.dateSince.day : busqueda;
        this.dateUntil != undefined ? busqueda = busqueda + '&fecha[before]=' + this.dateUntil.year + '-' + this.dateUntil.month + '-' + this.dateUntil.day : busqueda;
        page ? busqueda = busqueda + '&page=' + page : busqueda;
        this.listaVisitasTerr = [];
        this.territoriosService.recuperaVisitasGeneral(busqueda).subscribe(function (data) {
            var last = data["hydra:view"]["hydra:last"];
            if (last != undefined) {
                last = last.substr(last.indexOf('page') + 5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
                _this.totalPagesTerr = last * 10;
            }
            for (var _i = 0, _a = data["hydra:member"]; _i < _a.length; _i++) {
                var visita = _a[_i];
                var date = new Date((visita["fecha"]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getUTCDate() + 1;
                var h = date.getHours();
                var min = date.getMinutes();
                var s = date.getSeconds();
                visita["fecha"] = d + '/' + m + '/' + y;
                visita["hora"] = h + ':' + min + ':' + s;
                _this.listaVisitasTerr.push(visita);
            }
        }, function (error) {
            console.log(error);
        });
    };
    ViewVisitsComponent.prototype.openLg = function (content) {
        this.modalService.open(content, { size: 'lg' });
    };
    ViewVisitsComponent.prototype.limpiar = function () {
        this.dateSince = undefined;
        this.dateUntil = undefined;
    };
    ViewVisitsComponent.prototype.pageChanged = function (page) {
        this.filtrar(0, page);
    };
    ViewVisitsComponent.prototype.pageChangedTerr = function (page) {
        this.filtrarTerr(0, page);
    };
    //-------------------PARTE DE EDITAR Y ELIMINAR DE   COLONIAS---------------------------
    ViewVisitsComponent.prototype.editaVisitaModal = function (visita, content) {
        this.isEdit = true;
        //Para rellenar el formulario
        this.registerForm.get('nombre').setValue(visita.nombreUsuario);
        this.registerForm.get('numNidos').setValue(visita.numNidos);
        this.registerForm.get('numNidosExito').setValue(visita.numNidosExito);
        this.registerForm.get('numNidosOcupados').setValue(visita.numNidosOcupados);
        this.registerForm.get('numNidosVacios').setValue(visita.numNidosVacios);
        this.registerForm.get('numVisita').setValue(visita.numVisita);
        this.modalService.open(content, {});
    };
    ViewVisitsComponent.prototype.editaVisita = function (visita) {
        var _this = this;
        //Volvemos a recuperar los datos que han podido ser modificados por el usuario
        this.loading = true;
        var newVisita = new visita_colonia_1.VisitaColonia();
        newVisita.setNombreUsuario(this.registerForm.get("nombre").value);
        newVisita.setNumNidos(parseInt(this.registerForm.get("numNidos").value));
        newVisita.setNumNidosExito(parseInt(this.registerForm.get("numNidosExito").value));
        newVisita.setNumNidosOcupados(parseInt(this.registerForm.get("numNidosOcupados").value));
        newVisita.setNumNidosVacios(parseInt(this.registerForm.get("numNidosVacios").value));
        newVisita.setNumVisita(parseInt(this.registerForm.get("numVisita").value));
        this.coloniasService.modificarVisita(visita.id, newVisita).subscribe(function (data) {
            _this.loading = false;
            _this.isEdit = false;
            var date = new Date((data["fecha"]));
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getUTCDate();
            data["fecha"] = (d + '/' + m + '/' + y);
            _this.listaVisitas[_this.listaVisitas.indexOf(visita)] = data;
            _this.alertService.success(_this.translate.instant("ViewVisitProfile.success2"));
        }, function (error) {
            _this.loading = false;
            _this.isEdit = false;
            console.log(error);
            _this.alertService.danger(_this.translate.instant("ViewVisitProfile.error2"));
        });
    };
    ViewVisitsComponent.prototype.eliminaVisitaModal = function (contentEliminar) {
        this.modalService.open(contentEliminar, {});
    };
    ViewVisitsComponent.prototype.eliminaVisita = function (visita) {
        var _this = this;
        this.loading = true;
        this.coloniasService.eliminarVisita(visita.id).subscribe(function (data) {
            _this.loading = false;
            _this.listaVisitas.splice(_this.listaVisitas.indexOf(visita), 1);
            _this.alertService.success(_this.translate.instant("ViewVisitProfile.success3"));
        }, function (error) {
            console.log(error);
            _this.alertService.danger(_this.translate.instant("ViewVisitProfile.error3"));
            _this.loading = false;
        });
    };
    //-------------------PARTE DE EDITAR Y ELIMINAR DE TERRITORIOS---------------------------
    ViewVisitsComponent.prototype.eliminaVisitaModalTerr = function (contentEliminar) {
        this.modalService.open(contentEliminar, {});
    };
    ViewVisitsComponent.prototype.eliminaVisitaTerr = function (visita) {
        var _this = this;
        this.loading = true;
        this.territoriosService.eliminarVisita(visita.id).subscribe(function (data) {
            _this.loading = false;
            _this.listaVisitasTerr.splice(_this.listaVisitasTerr.indexOf(visita), 1);
            _this.alertService.success(_this.translate.instant("ViewVisitProfile.success3"));
        }, function (error) {
            console.log(error);
            _this.alertService.danger(_this.translate.instant("ViewVisitProfile.error3"));
            _this.loading = false;
        });
    };
    ViewVisitsComponent.prototype.editaVisitaModalTerr = function (observacion, lat, lon, content) {
        this.isEdit = true;
        //Para rellenar el formulario
        this.markers = [{ latitude: lat, longitude: lon }];
        this.registerFormTerr.get('observacion').setValue(observacion);
        this.modalService.open(content, {});
    };
    ViewVisitsComponent.prototype.editaVisitaTerr = function (visita) {
        var _this = this;
        //Volvemos a recuperar los datos que han podido ser modificados por el usuario
        this.loading = true;
        var newVisita = new visita_territorio_1.VisitaTerritorio();
        newVisita.setObservacionId(this.registerFormTerr.get("observacion").value);
        newVisita.setLat(this.markers[0]["latitude"]);
        newVisita.setLon(this.markers[0]["longitude"]);
        this.territoriosService.modificarVisita(visita.id, newVisita).subscribe(function (data) {
            _this.loading = false;
            _this.isEdit = false;
            var date = new Date((data["fecha"]));
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getUTCDate();
            var h = date.getHours();
            var min = date.getMinutes();
            var s = date.getSeconds();
            data["fecha"] = (d + '/' + m + '/' + y);
            data["hora"] = h + ':' + min + ':' + s;
            _this.listaVisitasTerr[_this.listaVisitasTerr.indexOf(visita)] = data;
            _this.alertService.success(_this.translate.instant("ViewVisitProfile.success2"));
        }, function (error) {
            _this.loading = false;
            _this.isEdit = false;
            console.log(error);
            _this.alertService.danger(_this.translate.instant("ViewVisitProfile.error2"));
        });
    };
    ViewVisitsComponent = __decorate([
        core_1.Component({
            selector: 'app-view-visits',
            templateUrl: './view-visits.component.html',
            styleUrls: ['./view-visits.component.scss']
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            colonias_service_1.ColoniasService,
            territorios_service_1.TerritoriosService,
            ngx_alerts_1.AlertService,
            ng_bootstrap_1.NgbModal,
            forms_1.FormBuilder])
    ], ViewVisitsComponent);
    return ViewVisitsComponent;
}());
exports.ViewVisitsComponent = ViewVisitsComponent;
//# sourceMappingURL=view-visits.component.js.map