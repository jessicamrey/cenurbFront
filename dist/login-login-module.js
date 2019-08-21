(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "./src/app/login/login-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/login/login-routing.module.ts ***!
  \***********************************************/
/*! exports provided: LoginRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRoutingModule", function() { return LoginRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]
    }
];
var LoginRoutingModule = /** @class */ (function () {
    function LoginRoutingModule() {
    }
    LoginRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LoginRoutingModule);
    return LoginRoutingModule;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-page\" [@routerTransition]>\n<ngx-alerts></ngx-alerts>\n<ngx-loading [show]=\"loading\" [config]=\"{backdropBorderRadius: '14px'}\"></ngx-loading>\n    <div class=\"row justify-content-md-center\">\n        <div class=\"col-md-4\">\n            <img src=\"assets/images/logo.png\" width=\"150px\" class=\"user-avatar\" />\n            <h1>{{ 'Login.welcome' | translate }}</h1>\n            <form role=\"form\" id=\"loginForm\" name=\"frmUsuario\" method=\"POST\">\n                <div class=\"form-content\">\n                    <div class=\"form-group\" >\n                        <input type=\"text\"  class=\"form-control input-underline input-lg\" id=\"tbxUser\" name=\"_username\" placeholder=\"{{ 'Login.username' | translate }}\">\n                    </div>\n\n                    <div class=\"form-group\" >\n                        <input type=\"text\" class=\"form-control input-underline input-lg\" id=\"tbxPass\" name=\"_password\" placeholder=\"{{ 'Login.password' | translate }}\">\n                    </div>\n\n\n                    <input type=\"hidden\"  id=\"email\" value=\"\">\n                    <input type=\"hidden\"  id=\"id\" value=\"\">\n                    <input type=\"hidden\"  id=\"name\" value=\"\">\n\n                \n\n                </div>\n                <a class=\"btn rounded-btn\"  id=\"login2\"  (click)=\"abrirVentana(0);\"> {{ 'Login.in' | translate }} </a>\n               \n\n               \n                <p></p>\n                <h5 >{{ 'Login.msg1' | translate }}</h5>\n                <p></p>\n                <a class=\"btn rounded-btn\" [routerLink]=\"['/signup']\">{{ 'Login.register' | translate }}</a>\n                <div id=\"iframe\" class=\"clear\" style=\"visibility:hidden;\"></div>\n            </form>\n\n             <button style=\"display:none\" id=\"loginHidden\" (click)=\"onLoggedin()\"></button>\n\n\n        </div>\n    </div>\n\n\n\n</div>\n"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block; }\n\n.login-page {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: auto;\n  background: #1d5d83;\n  text-align: center;\n  color: #fff;\n  padding: 3em; }\n\n.login-page .col-lg-4 {\n    padding: 0; }\n\n.login-page .input-lg {\n    height: 46px;\n    padding: 10px 16px;\n    font-size: 18px;\n    line-height: 1.3333333;\n    border-radius: 0; }\n\n.login-page .input-underline {\n    background: 0 0;\n    border: none;\n    box-shadow: none;\n    border-bottom: 2px solid rgba(255, 255, 255, 0.5);\n    color: #fff;\n    border-radius: 0; }\n\n.login-page .input-underline:focus {\n    border-bottom: 2px solid #fff;\n    box-shadow: none; }\n\n.login-page .rounded-btn {\n    border-radius: 50px;\n    color: rgba(255, 255, 255, 0.8);\n    background: #1d5d83;\n    border: 2px solid rgba(255, 255, 255, 0.8);\n    font-size: 18px;\n    line-height: 40px;\n    padding: 0 25px; }\n\n.login-page .rounded-btn:hover,\n  .login-page .rounded-btn:focus,\n  .login-page .rounded-btn:active,\n  .login-page .rounded-btn:visited {\n    color: white;\n    border: 2px solid white;\n    outline: none; }\n\n.login-page h1 {\n    font-weight: 300;\n    margin-top: 20px;\n    margin-bottom: 10px;\n    font-size: 36px; }\n\n.login-page h1 small {\n      color: rgba(255, 255, 255, 0.7); }\n\n.login-page .form-group {\n    padding: 8px 0; }\n\n.login-page .form-group input::-webkit-input-placeholder {\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-group input:-moz-placeholder {\n      /* Firefox 18- */\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-group input::-moz-placeholder {\n      /* Firefox 19+ */\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-group input:-ms-input-placeholder {\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-content {\n    padding: 40px 0; }\n\n.login-page .user-avatar {\n    border-radius: 50%;\n    border: 2px solid #fff; }\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../router.animations */ "./src/app/router.animations.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/auth.service */ "./src/services/auth.service.ts");
/* harmony import */ var _services_seo_apis_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/seo-apis.service */ "./src/services/seo-apis.service.ts");
/* harmony import */ var ngx_alerts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-alerts */ "./node_modules/ngx-alerts/fesm5/ngx-alerts.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginComponent = /** @class */ (function () {
    function LoginComponent(translate, router, alertService, authService, seoApisService) {
        this.translate = translate;
        this.router = router;
        this.alertService = alertService;
        this.authService = authService;
        this.seoApisService = seoApisService;
        this.url = "localhost:8000/api/login";
        this.login1 = false;
        this.loading = false;
        this.madridLat = 40.417329;
        this.madridLon = -3.703722;
        this.translate.addLangs(['en', 'es', 'cat', 'gal', 'eus']);
        this.translate.setDefaultLang('es');
        //localStorage.setItem('isLoggedin', 'true');
        localStorage.clear();
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    //08072019--------------------------------------------------------------------------------------------------
    LoginComponent.prototype.getLocalizacion = function () {
        var _this = this;
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(function (position) {
                _this.geolocationPosition = position,
                    console.log(position);
                localStorage.setItem('latitude', '' + position["coords"]["latitude"]);
                localStorage.setItem('longitude', '' + position["coords"]["longitude"]);
            }, function (error) {
                localStorage.setItem('latitude', _this.madridLat);
                localStorage.setItem('longitude', _this.madridLon);
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
    LoginComponent.prototype.onLoggedin = function () {
        var _this = this;
        if (this.login1 == true) {
            this.login1 = false;
            this.loading = true;
            var idData = {
                id_usu: $("#id").val()
            };
            //Comprobamos si es la primera vez que se logea en la aplicacion
            this.authService.isRegistered(idData).subscribe(function (data) {
                console.log("DATA: ");
                console.log(data);
                //Ye tenemos datos
                _this.login();
            }, function (error) {
                console.log("ERROR: ");
                console.log(error);
                //Es la primera vez
                _this.firstTimeLogin();
            });
        }
        else {
            console.log("Error. falta el paso 1");
        }
        //
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var data = {
            "username": $("#email").val(),
            "password": $("#tbxPass").val()
        };
        this.authService.login(data).subscribe(function (message) {
            _this.loading = false;
            console.log(message);
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('token', message["access_token"]);
            localStorage.setItem('userName', $("#name").val());
            localStorage.setItem('userId', $("#id").val());
            localStorage.setItem('userEmail', $("#email").val());
            _this.getLocalizacion();
            _this.router.navigate(['/selector']);
        }, function (error) {
            _this.loading = false;
            _this.alertService.warning(_this.translate.instant("Login.error1"));
            console.log(error);
        });
    };
    LoginComponent.prototype.firstTimeLogin = function () {
        var _this = this;
        var data = {
            "id_usu": $("#id").val(),
            "password": $("#tbxPass").val(),
            "email": $("#email").val()
        };
        this.authService.register(data).subscribe(function (data) {
            //Nos hemos registrado correctamente, ahora nos logeamos
            _this.login();
        }, function (error) {
            console.log(error);
        });
    };
    //------------------------------------PEDRO SILOS ---------------------------------------------
    LoginComponent.prototype.abrirVentana = function (nTipo) {
        this.login1 = true;
        var sUser = $("#tbxUser").val();
        var sPass = $("#tbxPass").val();
        var sId = $("#tbxID").val();
        var result;
        var sLink = "http://www.seguimientodeaves.org/_Atlas/frmLoginCensosServer.php";
        sLink += "?TIPO=" + nTipo + "&USER=" + sUser + "&PASS=" + sPass + "&ID=" + sId;
        $(function () {
            var src = sLink + '&REF=#' + encodeURIComponent(document.location.href);
            var sty = 'visibility:hidden;';
            try {
                $('#iframe').children('iframe').remove();
                var iframe = $('<iframe src="' + src + '" style="' + sty + '" scrolling="no" frameborder="1"><\/iframe>').appendTo('#iframe');
            }
            catch (e) { }
            $.receiveMessage(function (e) {
                var h = e.data.replace('sVal=', '');
                h = decodeURIComponent(h);
                while (h.toString().indexOf('+') != -1)
                    h = h.toString().replace('+', ' ');
                function cerrar(sValor) {
                    var sTxt = "";
                    if (sValor != '') {
                        var sRet = sValor.split("#");
                        sTxt += "ID:" + sRet[0] + "#";
                        sTxt += "NOMBRE:" + sRet[1] + "#";
                        sTxt += "EMAIL:" + sRet[2] + "#";
                        document.getElementById("id").value = sRet[0];
                        document.getElementById("name").value = sRet[1];
                        document.getElementById("email").value = sRet[2];
                        document.getElementById("loginHidden").click();
                    }
                    else {
                        sTxt = "NOT FOUND";
                    }
                }
                cerrar(h);
            }, 'http://www.seguimientodeaves.org');
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")],
            animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_2__["routerTransition"])()]
        }),
        __metadata("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_alerts__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _services_seo_apis_service__WEBPACK_IMPORTED_MODULE_5__["SeoApisService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/login.module.ts":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login-routing.module */ "./src/app/login/login-routing.module.ts");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var ngx_alerts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-alerts */ "./node_modules/ngx-alerts/fesm5/ngx-alerts.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _login_routing_module__WEBPACK_IMPORTED_MODULE_3__["LoginRoutingModule"],
                ngx_loading__WEBPACK_IMPORTED_MODULE_6__["NgxLoadingModule"].forRoot({}),
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateModule"],
                ngx_alerts__WEBPACK_IMPORTED_MODULE_5__["AlertModule"].forRoot({ maxMessages: 5, timeout: 5000, position: 'right' })
            ],
            declarations: [_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]]
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map