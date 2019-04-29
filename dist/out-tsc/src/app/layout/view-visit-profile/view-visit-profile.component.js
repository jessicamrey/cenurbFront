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
var colonias_service_1 = require("../../../services/colonias.service");
var core_2 = require("@ngx-translate/core");
var ngx_alerts_1 = require("ngx-alerts");
var visita_colonia_1 = require("../../../models/visita-colonia");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var ViewVisitProfileComponent = /** @class */ (function () {
    function ViewVisitProfileComponent(translate, coloniasService, alertService, route, modalService, formBuilder) {
        this.translate = translate;
        this.coloniasService = coloniasService;
        this.alertService = alertService;
        this.route = route;
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.listaVisitas = [];
        this.listaTemporadas = [];
        this.totalPages = 0;
        this.loading = false;
        this.usuario = 0;
        this.isEdit = false;
    }
    ViewVisitProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.colId = params["colId"];
            _this.recuperaVisitas(params["colId"], 1);
        });
        this.registerForm = this.formBuilder.group({
            nombre: ['', forms_1.Validators.required],
            numNidos: ['', forms_1.Validators.required],
            numNidosExito: ['', forms_1.Validators.required],
            numNidosOcupados: ['', forms_1.Validators.required],
            numNidosVacios: ['', forms_1.Validators.required],
            numVisita: ['', forms_1.Validators.required],
            temporada: ['', forms_1.Validators.required]
        });
        this.recuperaTemporadas();
        //TODO: recuperar usuario de localstorage
    };
    ViewVisitProfileComponent.prototype.recuperaVisitas = function (colId, pageNumber) {
        var _this = this;
        this.coloniasService.recuperaVisitasGeneral('?colonia=' + colId + '&page=' + pageNumber).subscribe(function (data) {
            _this.listaVisitas = [];
            for (var _i = 0, _a = data["hydra:member"]; _i < _a.length; _i++) {
                var visita = _a[_i];
                var date = new Date((visita["fecha"]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getUTCDate();
                visita["fecha"] = d + '/' + m + '/' + y;
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
    ViewVisitProfileComponent.prototype.openLg = function (content) {
        this.modalService.open(content, {});
    };
    ViewVisitProfileComponent.prototype.registraVisita = function () {
        var _this = this;
        this.loading = true;
        var visita = new visita_colonia_1.VisitaColonia();
        visita.setNombreUsuario(this.registerForm.get("nombre").value);
        visita.setNumNidos(this.registerForm.get("numNidos").value);
        visita.setNumNidosExito(this.registerForm.get("numNidosExito").value);
        visita.setNumNidosOcupados(this.registerForm.get("numNidosOcupados").value);
        visita.setNumNidosVacios(this.registerForm.get("numNidosVacios").value);
        visita.setNumVisita(parseInt(this.registerForm.get("numVisita").value));
        visita.setAnno(parseInt(this.registerForm.get("temporada").value));
        visita.setFecha(new Date());
        //TODO: El usuario tiene que sacarse de localstorage
        visita.setUsuario("0");
        //TODO: Falta implementar subida de fotos
        console.log(visita);
        this.coloniasService.nuevaVisitaColonia(visita, this.colId).subscribe(function (data) {
            _this.loading = false;
            var date = new Date((data["fecha"]));
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getUTCDate();
            data["fecha"] = (d + '/' + m + '/' + y);
            data["usuario"] = visita.getUsuario();
            data["nombreUsuario"] = visita.getNombreUsuario();
            _this.listaVisitas.push(data);
            console.log(_this.listaVisitas);
            _this.alertService.success(_this.translate.instant("ViewVisitProfile.success1"));
        }, function (error) {
            _this.loading = false;
            console.log(error);
            _this.alertService.danger(_this.translate.instant("ViewVisitProfile.error1"));
        });
    };
    ViewVisitProfileComponent.prototype.pageChanged = function (page) {
        this.recuperaVisitas(this.colId, page);
    };
    ViewVisitProfileComponent.prototype.editaVisitaModal = function (visita, content) {
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
    ViewVisitProfileComponent.prototype.editaVisita = function (visita) {
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
    ViewVisitProfileComponent.prototype.eliminaVisitaModal = function (contentEliminar) {
        this.modalService.open(contentEliminar, {});
    };
    ViewVisitProfileComponent.prototype.eliminaVisita = function (visita) {
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
    ViewVisitProfileComponent.prototype.recuperaTemporadas = function () {
        var _this = this;
        this.coloniasService.getTemporadas().subscribe(function (data) {
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
    ViewVisitProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-view-visit-profile',
            templateUrl: './view-visit-profile.component.html',
            styleUrls: ['./view-visit-profile.component.scss']
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            colonias_service_1.ColoniasService,
            ngx_alerts_1.AlertService,
            router_1.ActivatedRoute,
            ng_bootstrap_1.NgbModal,
            forms_1.FormBuilder])
    ], ViewVisitProfileComponent);
    return ViewVisitProfileComponent;
}());
exports.ViewVisitProfileComponent = ViewVisitProfileComponent;
//# sourceMappingURL=view-visit-profile.component.js.map