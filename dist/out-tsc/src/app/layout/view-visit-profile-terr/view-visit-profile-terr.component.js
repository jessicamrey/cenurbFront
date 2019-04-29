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
var router_1 = require("@angular/router");
var territorios_service_1 = require("../../../services/territorios.service");
var core_2 = require("@ngx-translate/core");
var ngx_alerts_1 = require("ngx-alerts");
var visita_territorio_1 = require("../../../models/visita-territorio");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var ViewVisitProfileTerrComponent = /** @class */ (function () {
    function ViewVisitProfileTerrComponent(translate, territoriosService, alertService, route, modalService, formBuilder) {
        this.translate = translate;
        this.territoriosService = territoriosService;
        this.alertService = alertService;
        this.route = route;
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.listaVisitas = [];
        this.listaObservaciones = [];
        this.totalPages = 0;
        this.loading = false;
        this.usuario = 0;
        this.isEdit = false;
        this.selectedOb = false;
        this.markers = [];
    }
    ViewVisitProfileTerrComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.terrId = params["terrId"];
            _this.recuperaVisitas(params["terrId"], 1);
        });
        this.registerForm = this.formBuilder.group({
            observacion: ['', forms_1.Validators.required]
        });
        //TODO: recuperar usuario de localstorage
        this.recuperaObservaciones();
        this.getLocalizacion();
    };
    ViewVisitProfileTerrComponent.prototype.getLocalizacion = function () {
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
    ViewVisitProfileTerrComponent.prototype.placeMarker = function (position) {
        var lat = position.coords.lat;
        var lng = position.coords.lng;
        this.markers = [{ latitude: lat, longitude: lng }];
    };
    ViewVisitProfileTerrComponent.prototype.recuperaVisitas = function (terrId, pageNumber) {
        var _this = this;
        this.territoriosService.recuperaVisitasGeneral('?territorio=' + terrId + '&page=' + pageNumber).subscribe(function (data) {
            console.log(data);
            _this.listaVisitas = [];
            for (var _i = 0, _a = data["hydra:member"]; _i < _a.length; _i++) {
                var visita = _a[_i];
                var date = new Date((visita["fecha"]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getUTCDate();
                var h = date.getHours();
                var min = date.getMinutes();
                var s = date.getSeconds();
                visita["fecha"] = d + '/' + m + '/' + y;
                visita["hora"] = h + ':' + min + ':' + s;
                _this.listaVisitas.push(visita);
            }
            var last = data["hydra:view"]["hydra:last"];
            last = last.substr(last.indexOf('page') + 5); //Cogemos el substring a partir de page +5, es decir +4 (numero de letras de page) +1 para no coger el "=", es decir, +5
            _this.totalPages = last * 10;
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    ViewVisitProfileTerrComponent.prototype.openLg = function (content) {
        this.modalService.open(content, {});
    };
    ViewVisitProfileTerrComponent.prototype.pageChanged = function (page) {
        this.recuperaVisitas(this.terrId, page);
    };
    ViewVisitProfileTerrComponent.prototype.recuperaObservaciones = function () {
        var _this = this;
        this.territoriosService.getObservaciones().subscribe(function (data) {
            _this.listaObservaciones = data["hydra:member"];
            console.log(_this.listaObservaciones);
        });
    };
    ViewVisitProfileTerrComponent.prototype.registraVisita = function () {
        var _this = this;
        this.loading = true;
        var visita = new visita_territorio_1.VisitaTerritorio();
        visita.setObservacionId(this.registerForm.get("observacion").value);
        visita.setLat(this.markers[0]["latitude"]);
        visita.setLon(this.markers[0]["longitude"]);
        visita.setFecha(new Date());
        visita.setHora(new Date());
        //TODO: El usuario tiene que sacarse de localstorage
        visita.setUsuario("0");
        //TODO: Falta implementar subida de fotos
        console.log(visita);
        this.territoriosService.nuevaVisitaTerritorio(visita, this.terrId).subscribe(function (data) {
            console.log(data);
            _this.loading = false;
            var date = new Date((data["fecha"]));
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getUTCDate();
            var h = date.getHours();
            var min = date.getMinutes();
            var s = date.getSeconds();
            data["fecha"] = (d + '/' + m + '/' + y);
            data["hora"] = h + ':' + min + ':' + s;
            _this.listaVisitas.push(data);
            console.log(_this.listaVisitas);
            _this.alertService.success(_this.translate.instant("ViewVisitProfile.success1"));
        }, function (error) {
            _this.loading = false;
            console.log(error);
            _this.alertService.danger(_this.translate.instant("ViewVisitProfile.error1"));
        });
    };
    ViewVisitProfileTerrComponent.prototype.eliminaVisitaModal = function (contentEliminar) {
        this.modalService.open(contentEliminar, {});
    };
    ViewVisitProfileTerrComponent.prototype.eliminaVisita = function (visita) {
        var _this = this;
        this.loading = true;
        this.territoriosService.eliminarVisita(visita.id).subscribe(function (data) {
            _this.loading = false;
            _this.listaVisitas.splice(_this.listaVisitas.indexOf(visita), 1);
            _this.alertService.success(_this.translate.instant("ViewVisitProfile.success3"));
        }, function (error) {
            console.log(error);
            _this.alertService.danger(_this.translate.instant("ViewVisitProfile.error3"));
            _this.loading = false;
        });
    };
    ViewVisitProfileTerrComponent.prototype.editaVisitaModal = function (observacion, lat, lon, content) {
        this.isEdit = true;
        //Para rellenar el formulario
        this.markers = [{ latitude: lat, longitude: lon }];
        this.registerForm.get('observacion').setValue(observacion);
        this.modalService.open(content, {});
    };
    ViewVisitProfileTerrComponent.prototype.editaVisita = function (visita) {
        var _this = this;
        //Volvemos a recuperar los datos que han podido ser modificados por el usuario
        this.loading = true;
        var newVisita = new visita_territorio_1.VisitaTerritorio();
        newVisita.setObservacionId(this.registerForm.get("observacion").value);
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
            _this.listaVisitas[_this.listaVisitas.indexOf(visita)] = data;
            _this.alertService.success(_this.translate.instant("ViewVisitProfile.success2"));
        }, function (error) {
            _this.loading = false;
            _this.isEdit = false;
            console.log(error);
            _this.alertService.danger(_this.translate.instant("ViewVisitProfile.error2"));
        });
    };
    ViewVisitProfileTerrComponent = __decorate([
        core_1.Component({
            selector: 'app-view-visit-profile-terr',
            templateUrl: './view-visit-profile-terr.component.html',
            styleUrls: ['./view-visit-profile-terr.component.scss']
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            territorios_service_1.TerritoriosService,
            ngx_alerts_1.AlertService,
            router_1.ActivatedRoute,
            ng_bootstrap_1.NgbModal,
            forms_1.FormBuilder])
    ], ViewVisitProfileTerrComponent);
    return ViewVisitProfileTerrComponent;
}());
exports.ViewVisitProfileTerrComponent = ViewVisitProfileTerrComponent;
//# sourceMappingURL=view-visit-profile-terr.component.js.map