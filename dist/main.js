(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./access-denied/access-denied.module": [
		"./src/app/access-denied/access-denied.module.ts",
		"access-denied-access-denied-module"
	],
	"./dashboard/dashboard.module": [
		"./src/app/layout/dashboard/dashboard.module.ts",
		"dashboard-dashboard-module~layout-layout-module~login-login-module",
		"dashboard-dashboard-module~layout-layout-module",
		"common",
		"dashboard-dashboard-module"
	],
	"./layout/layout.module": [
		"./src/app/layout/layout.module.ts",
		"dashboard-dashboard-module~layout-layout-module~login-login-module",
		"dashboard-dashboard-module~layout-layout-module",
		"common",
		"layout-layout-module"
	],
	"./login/login.module": [
		"./src/app/login/login.module.ts",
		"dashboard-dashboard-module~layout-layout-module~login-login-module",
		"common",
		"login-login-module"
	],
	"./not-found/not-found.module": [
		"./src/app/not-found/not-found.module.ts",
		"not-found-not-found-module"
	],
	"./server-error/server-error.module": [
		"./src/app/server-error/server-error.module.ts",
		"server-error-server-error-module"
	],
	"./signup/signup.module": [
		"./src/app/signup/signup.module.ts",
		"common",
		"signup-signup-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error('Cannot find module "' + req + '".');
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var module = __webpack_require__(ids[0]);
		return module;
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared */ "./src/app/shared/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [_shared__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]] },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: createTranslateLoader, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslateLoader", function() { return createTranslateLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/http-loader */ "./node_modules/@ngx-translate/http-loader/esm5/ngx-translate-http-loader.js");
/* harmony import */ var _helpers_jwt_interceptor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/jwt-interceptor */ "./src/helpers/jwt-interceptor.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shared */ "./src/app/shared/index.ts");
/* harmony import */ var _providers_api_api_provider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../providers/api/api-provider */ "./src/providers/api/api-provider.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../services/auth.service */ "./src/services/auth.service.ts");
/* harmony import */ var _services_seo_apis_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../services/seo-apis.service */ "./src/services/seo-apis.service.ts");
/* harmony import */ var _services_colonias_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../services/colonias.service */ "./src/services/colonias.service.ts");
/* harmony import */ var _services_territorios_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../services/territorios.service */ "./src/services/territorios.service.ts");
/* harmony import */ var ngx_alerts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-alerts */ "./node_modules/ngx-alerts/fesm5/ngx-alerts.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















//import { SharedServicesService } from '../services/shared-services.service';
// Import your library

// AoT requires an exported function for factories
var createTranslateLoader = function (http) {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_6__["TranslateHttpLoader"](http, './assets/i18n/', '.json');
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateModule"].forRoot({
                    loader: {
                        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateLoader"],
                        useFactory: createTranslateLoader,
                        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]]
                    }
                }),
                ngx_alerts__WEBPACK_IMPORTED_MODULE_16__["AlertModule"].forRoot({ maxMessages: 5, timeout: 5000, position: 'right' }),
                _app_routing_module__WEBPACK_IMPORTED_MODULE_8__["AppRoutingModule"]
            ],
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]],
            providers: [_shared__WEBPACK_IMPORTED_MODULE_10__["AuthGuard"],
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HTTP_INTERCEPTORS"], useClass: _helpers_jwt_interceptor__WEBPACK_IMPORTED_MODULE_7__["JwtInterceptor"], multi: true },
                _providers_api_api_provider__WEBPACK_IMPORTED_MODULE_11__["ApiProvider"],
                _services_auth_service__WEBPACK_IMPORTED_MODULE_12__["AuthService"],
                _services_seo_apis_service__WEBPACK_IMPORTED_MODULE_13__["SeoApisService"],
                _services_colonias_service__WEBPACK_IMPORTED_MODULE_14__["ColoniasService"],
                //SharedServicesService,
                _services_territorios_service__WEBPACK_IMPORTED_MODULE_15__["TerritoriosService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/shared/guard/auth.guard.ts":
/*!********************************************!*\
  !*** ./src/app/shared/guard/auth.guard.ts ***!
  \********************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (localStorage.getItem('isLoggedin')) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/shared/guard/index.ts":
/*!***************************************!*\
  !*** ./src/app/shared/guard/index.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.guard */ "./src/app/shared/guard/auth.guard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return _auth_guard__WEBPACK_IMPORTED_MODULE_0__["AuthGuard"]; });




/***/ }),

/***/ "./src/app/shared/index.ts":
/*!*********************************!*\
  !*** ./src/app/shared/index.ts ***!
  \*********************************/
/*! exports provided: SharedPipesModule, PageHeaderModule, StatModule, AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules */ "./src/app/shared/modules/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageHeaderModule", function() { return _modules__WEBPACK_IMPORTED_MODULE_0__["PageHeaderModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StatModule", function() { return _modules__WEBPACK_IMPORTED_MODULE_0__["StatModule"]; });

/* harmony import */ var _pipes_shared_pipes_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pipes/shared-pipes.module */ "./src/app/shared/pipes/shared-pipes.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SharedPipesModule", function() { return _pipes_shared_pipes_module__WEBPACK_IMPORTED_MODULE_1__["SharedPipesModule"]; });

/* harmony import */ var _guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./guard */ "./src/app/shared/guard/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return _guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]; });






/***/ }),

/***/ "./src/app/shared/modules/index.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/modules/index.ts ***!
  \*****************************************/
/*! exports provided: PageHeaderModule, StatModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _page_header_page_header_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-header/page-header.module */ "./src/app/shared/modules/page-header/page-header.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageHeaderModule", function() { return _page_header_page_header_module__WEBPACK_IMPORTED_MODULE_0__["PageHeaderModule"]; });

/* harmony import */ var _stat_stat_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stat/stat.module */ "./src/app/shared/modules/stat/stat.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StatModule", function() { return _stat_stat_module__WEBPACK_IMPORTED_MODULE_1__["StatModule"]; });





/***/ }),

/***/ "./src/app/shared/modules/page-header/page-header.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/shared/modules/page-header/page-header.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-xl-12\">\n        <h2 class=\"page-header\">\n            {{heading}}\n        </h2>\n        <ol class=\"breadcrumb\">\n            <li class=\"breadcrumb-item\">\n                <i class=\"fa fa-dashboard\"></i> <a href=\"Javascript:void(0)\" [routerLink]=\"['/dashboard']\">Dashboard</a>\n            </li>\n            <li class=\"breadcrumb-item active\"><i class=\"fa {{icon}}\"></i> {{heading}}</li>\n        </ol>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/modules/page-header/page-header.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/shared/modules/page-header/page-header.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/shared/modules/page-header/page-header.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/shared/modules/page-header/page-header.component.ts ***!
  \*********************************************************************/
/*! exports provided: PageHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageHeaderComponent", function() { return PageHeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageHeaderComponent = /** @class */ (function () {
    function PageHeaderComponent() {
    }
    PageHeaderComponent.prototype.ngOnInit = function () { };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], PageHeaderComponent.prototype, "heading", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], PageHeaderComponent.prototype, "icon", void 0);
    PageHeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-header',
            template: __webpack_require__(/*! ./page-header.component.html */ "./src/app/shared/modules/page-header/page-header.component.html"),
            styles: [__webpack_require__(/*! ./page-header.component.scss */ "./src/app/shared/modules/page-header/page-header.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PageHeaderComponent);
    return PageHeaderComponent;
}());



/***/ }),

/***/ "./src/app/shared/modules/page-header/page-header.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/shared/modules/page-header/page-header.module.ts ***!
  \******************************************************************/
/*! exports provided: PageHeaderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageHeaderModule", function() { return PageHeaderModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _page_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page-header.component */ "./src/app/shared/modules/page-header/page-header.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PageHeaderModule = /** @class */ (function () {
    function PageHeaderModule() {
    }
    PageHeaderModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
            declarations: [_page_header_component__WEBPACK_IMPORTED_MODULE_3__["PageHeaderComponent"]],
            exports: [_page_header_component__WEBPACK_IMPORTED_MODULE_3__["PageHeaderComponent"]]
        })
    ], PageHeaderModule);
    return PageHeaderModule;
}());



/***/ }),

/***/ "./src/app/shared/modules/stat/stat.component.html":
/*!*********************************************************!*\
  !*** ./src/app/shared/modules/stat/stat.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card text-white bg-{{bgClass}}\">\n    <div class=\"card-header\">\n        <div class=\"row\">\n            <div class=\"col col-xs-3\">\n                <i class=\"fa {{icon}} fa-5x\"></i>\n            </div>\n            <div class=\"col col-xs-9 text-right\">\n                <div class=\"d-block huge\">{{count}}</div>\n                <div class=\"d-block\">{{label}}</div>\n            </div>\n        </div>\n    </div>\n \n</div>\n"

/***/ }),

/***/ "./src/app/shared/modules/stat/stat.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/shared/modules/stat/stat.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/shared/modules/stat/stat.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/shared/modules/stat/stat.component.ts ***!
  \*******************************************************/
/*! exports provided: StatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatComponent", function() { return StatComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StatComponent = /** @class */ (function () {
    function StatComponent() {
        this.event = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    StatComponent.prototype.ngOnInit = function () { };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], StatComponent.prototype, "bgClass", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], StatComponent.prototype, "icon", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], StatComponent.prototype, "count", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], StatComponent.prototype, "label", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], StatComponent.prototype, "data", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], StatComponent.prototype, "event", void 0);
    StatComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-stat',
            template: __webpack_require__(/*! ./stat.component.html */ "./src/app/shared/modules/stat/stat.component.html"),
            styles: [__webpack_require__(/*! ./stat.component.scss */ "./src/app/shared/modules/stat/stat.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], StatComponent);
    return StatComponent;
}());



/***/ }),

/***/ "./src/app/shared/modules/stat/stat.module.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/modules/stat/stat.module.ts ***!
  \****************************************************/
/*! exports provided: StatModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatModule", function() { return StatModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _stat_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stat.component */ "./src/app/shared/modules/stat/stat.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StatModule = /** @class */ (function () {
    function StatModule() {
    }
    StatModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
            declarations: [_stat_component__WEBPACK_IMPORTED_MODULE_2__["StatComponent"]],
            exports: [_stat_component__WEBPACK_IMPORTED_MODULE_2__["StatComponent"]]
        })
    ], StatModule);
    return StatModule;
}());



/***/ }),

/***/ "./src/app/shared/pipes/shared-pipes.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/pipes/shared-pipes.module.ts ***!
  \*****************************************************/
/*! exports provided: SharedPipesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedPipesModule", function() { return SharedPipesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var SharedPipesModule = /** @class */ (function () {
    function SharedPipesModule() {
    }
    SharedPipesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
            ],
            declarations: []
        })
    ], SharedPipesModule);
    return SharedPipesModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    backendUrl: 'http://localhost:8000',
    loginSeoUrl: 'http://www.seguimientodeaves.org/_Atlas/frmLoginCensosServer.php',
    grant_type: "password",
    client_secret: "1utbw9ki61og0008ko8ko0gskg4ckgsk08g8gowkk4w8wgkg48",
    client_id: "1_37v2qyyqfw4kww444c888co8o084soscos0owcwwcs8g00c8ck"
};


/***/ }),

/***/ "./src/helpers/jwt-interceptor.ts":
/*!****************************************!*\
  !*** ./src/helpers/jwt-interceptor.ts ***!
  \****************************************/
/*! exports provided: JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return JwtInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor() {
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        // add authorization header with jwt token if available
        var token = localStorage.getItem('token');
        if (token) {
            if (!request.headers.has("Authorization")) {
                request = request.clone({
                    setHeaders: {
                        Authorization: "Bearer " + token
                    }
                });
            }
        }
        return next.handle(request);
    };
    JwtInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], JwtInterceptor);
    return JwtInterceptor;
}());



/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "./src/providers/api/api-provider.ts":
/*!*******************************************!*\
  !*** ./src/providers/api/api-provider.ts ***!
  \*******************************************/
/*! exports provided: ApiProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiProvider", function() { return ApiProvider; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ApiProvider = /** @class */ (function () {
    function ApiProvider(http) {
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].backendUrl;
    }
    ApiProvider.prototype.get = function (endpoint, options) {
        return this.http.get(this.url + '/' + endpoint, options);
    };
    ApiProvider.prototype.post = function (endpoint, body, options) {
        return this.http.post(this.url + '/' + endpoint, body, options);
    };
    ApiProvider.prototype.put = function (endpoint, body, options) {
        return this.http.put(this.url + '/' + endpoint, body, options);
    };
    ApiProvider.prototype.delete = function (endpoint, options) {
        return this.http.delete(this.url + '/' + endpoint, options);
    };
    ApiProvider.prototype.patch = function (endpoint, body, options) {
        return this.http.put(this.url + '/' + endpoint, body, options);
    };
    ApiProvider.prototype.getUrl = function () {
        return this.url;
    };
    ApiProvider = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ApiProvider);
    return ApiProvider;
}());



/***/ }),

/***/ "./src/services/auth.service.ts":
/*!**************************************!*\
  !*** ./src/services/auth.service.ts ***!
  \**************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _providers_api_api_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../providers/api/api-provider */ "./src/providers/api/api-provider.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = /** @class */ (function () {
    function AuthService(api, http) {
        this.api = api;
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendUrl;
    }
    AuthService.prototype.login = function (accountData) {
        var body = "username=" + accountData.username + "&password=" + accountData.password + "&grant_type=" + _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].grant_type + "&client_id=" + _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].client_id + "&client_secret=" + _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].client_secret;
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/x-www-form-urlencoded') };
        return this.api.post('api/login', body, config)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (user) {
            // login successful if there's a jwt token in the response
            if (user && user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        }));
    };
    //Sabemos si es la primera ez que el usuario se logea en nuestra aplicación
    AuthService.prototype.isRegistered = function (id) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/isRegistered', JSON.stringify(id), config);
        return response;
    };
    //Nos registramos en la aplicacion
    AuthService.prototype.register = function (data) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/register', JSON.stringify(data), config);
        return response;
    };
    //Guardaremos si es admin
    AuthService.prototype.isAdmin = function () {
        return this.http.get(this.url + '/api/isAdmin');
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_providers_api_api_provider__WEBPACK_IMPORTED_MODULE_2__["ApiProvider"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/services/colonias.service.ts":
/*!******************************************!*\
  !*** ./src/services/colonias.service.ts ***!
  \******************************************/
/*! exports provided: ColoniasService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColoniasService", function() { return ColoniasService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _providers_api_api_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../providers/api/api-provider */ "./src/providers/api/api-provider.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ColoniasService = /** @class */ (function () {
    function ColoniasService(api, http) {
        this.api = api;
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendUrl;
        this.coloniaSelectedEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    //Registra una nueva colonia
    ColoniasService.prototype.nuevaColonia = function (colonia) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/colonias', JSON.stringify(colonia), config);
        return response;
    };
    //Recupera las colonias cercanas a la posicion del usuario, con un radio de distancia
    ColoniasService.prototype.recuperaColoniasCercanas = function (radio, lat, lon, especie) {
        return this.http.get(this.url + '/api/closeCol?rad=' + radio + '&lat=' + lat + '&lon=' + lon + '&especie=' + especie);
    };
    //recupera todas las colonias con paginacion
    ColoniasService.prototype.recuperaColonias = function (page, especie) {
        return this.http.get(this.url + '/api/colonias?page=' + page + '&especie=' + especie);
    };
    //Recupera las colonias marcadas como favoritas por el usuario
    ColoniasService.prototype.recuperaFavoritos = function (userId) {
        return this.http.get(this.url + '/api/colonias/favoritos/' + userId);
    };
    //Marca una nueva colonia como favorita
    ColoniasService.prototype.nuevoFavorito = function (data) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/colonias/favoritos', JSON.stringify(data), config);
        return response;
    };
    //Desmarcamos un favorito
    ColoniasService.prototype.removeFavorito = function (colId, usuario) {
        return this.api.delete('api/colonias/favoritos/' + colId + '?usuario=' + usuario);
    };
    //Recuperamos colonias con un string de busqueda que incluye filtros
    ColoniasService.prototype.recuperaColoniasFiltered = function (page, busqueda) {
        return this.http.get(this.url + '/api/colonias?page=' + page + busqueda);
    };
    //Recupera los datos de una sola colonia
    ColoniasService.prototype.recuperaColonia = function (colId) {
        return this.http.get(this.url + '/api/colonias/' + colId);
    };
    //Modificamos los datos de una colonia existente
    ColoniasService.prototype.modificarColonia = function (colId, data) {
        console.log(data);
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        return this.api.put('api/putColonia/' + colId, JSON.stringify(data), config);
    };
    //Completamos los datos de la colonia con datos de nidos 
    ColoniasService.prototype.completaColoniaNidos = function (locNidos, colId) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/colonias/' + colId + '/loc-nidos', JSON.stringify(locNidos), config);
        return response;
    };
    //Completamos los datos de la colonia por si hay otras especies en la misma colonia
    ColoniasService.prototype.completaColoniaEspecies = function (data, colId) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/colonias/' + colId + '/otras-especies', JSON.stringify(data), config);
        return response;
    };
    //Recupera las visitas para una colonia
    ColoniasService.prototype.recuperaVisitasGeneral = function (stringBusqueda) {
        return this.http.get(this.url + '/api/visitas-colonias' + stringBusqueda);
    };
    //Registramos una nueva visita en una colonia
    ColoniasService.prototype.nuevaVisitaColonia = function (data, colId) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/colonias/' + colId + '/visitas', JSON.stringify(data), config);
        return response;
    };
    //Editamos los datos de una visita ya creada
    ColoniasService.prototype.modificarVisita = function (visitaId, visita) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        return this.api.put('api/visitas-colonias/' + visitaId, JSON.stringify(visita), config);
    };
    //Eliminamos una visita que hemos creado
    ColoniasService.prototype.eliminarVisita = function (visitaId) {
        return this.api.delete('api/visitas-colonias/' + visitaId);
    };
    //Obtenemos datos para el dashboard
    ColoniasService.prototype.getDashboardData = function (anno) {
        return this.http.get(this.url + '/api/dashboardData?anno=' + anno);
    };
    //Obtenemos las estadisticas por año
    ColoniasService.prototype.getStatsAnno = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsAnno' + busqueda);
    };
    //Obtenemos las estadisticas por ccaa
    ColoniasService.prototype.getStatsCcaa = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsCcaa' + busqueda);
    };
    //Obtenemos las estadisticas por provincia
    ColoniasService.prototype.getStatsProvincia = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsProvincia' + busqueda);
    };
    //Obtenemos las temporadas
    ColoniasService.prototype.getTemporadas = function () {
        return this.http.get(this.url + '/api/temporadas');
    };
    //Obtenemos estadisticas generales, una llamada por especie
    ColoniasService.prototype.getStats = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/stats?especie=' + especie + busqueda);
    };
    //Operación para dejar seleccionada una especie en memoria
    ColoniasService.prototype.selectColonia = function (data) {
        localStorage.setItem('especie', JSON.stringify(data));
        this.coloniaSelectedEvent.emit(data);
        return data;
    };
    //Obtenemos las estadisticas por año para numero de nidos
    ColoniasService.prototype.getStatsAnnoCol = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsAnnoCol' + busqueda);
    };
    //Obtenemos las estadisticas por ccaa para numero de nidos
    ColoniasService.prototype.getStatsCcaaCol = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsCcaaCol' + busqueda);
    };
    //Obtenemos las estadisticas por provincia para numero de nidos
    ColoniasService.prototype.getStatsProvinciaCol = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsProvinciaCol' + busqueda);
    };
    //Obtenemos las estadisticas por municipio para numero de nidos
    ColoniasService.prototype.getStatsMunicipioCol = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsMunicipioCol' + busqueda);
    };
    //Obtenemos las estadisticas por tipo de edificio para numero de nidos
    ColoniasService.prototype.getStatsTipoEdificioCol = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsTipoEdificioCol' + busqueda);
    };
    ColoniasService.prototype.getStatsTipoPropiedadCol = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsTipoPropiedadCol' + busqueda);
    };
    //Buscamos un censo de municipio
    ColoniasService.prototype.getCensoMunicipio = function (especie, municipio, temporada) {
        return this.http.get(this.url + '/api/censo-municipios?especie=' + especie + '&municipio' + municipio + '&temporada=' + temporada);
    };
    //Registramos un nuevo censo en un municipio
    ColoniasService.prototype.nuevoCensoMunicipio = function (data) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/censo-municipios', JSON.stringify(data), config);
        return response;
    };
    //Modificamos los datos de un censo
    ColoniasService.prototype.modificarCenso = function (censoId, data) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        return this.api.put('api/censo-municipios/' + censoId, JSON.stringify(data), config);
    };
    //Subimos una imagen
    ColoniasService.prototype.uploadImage = function (id, images) {
        var formData = new FormData();
        for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
            var image = images_1[_i];
            console.log(image);
            formData.append('file[]', image, id + '_image' + new Date().getTime());
        }
        return this.api.post('api/visitas-colonias/' + id + '/image', formData);
    };
    //Recuperamos documentos
    ColoniasService.prototype.recuperaDocs = function () {
        return this.http.get(this.url + '/api/docs/colonias');
    };
    ColoniasService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_providers_api_api_provider__WEBPACK_IMPORTED_MODULE_2__["ApiProvider"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ColoniasService);
    return ColoniasService;
}());



/***/ }),

/***/ "./src/services/seo-apis.service.ts":
/*!******************************************!*\
  !*** ./src/services/seo-apis.service.ts ***!
  \******************************************/
/*! exports provided: SeoApisService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeoApisService", function() { return SeoApisService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _providers_api_api_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../providers/api/api-provider */ "./src/providers/api/api-provider.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SeoApisService = /** @class */ (function () {
    function SeoApisService(api, http) {
        this.api = api;
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendUrl;
        this.urlSeo = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].loginSeoUrl;
    }
    //Obtiene una lista con todas las aves coloniales y sus imágenes de perfil
    SeoApisService.prototype.listaColoniales = function () {
        return this.http.get(this.url + '/api/listCol');
    };
    //Obtiene una lista con todas las aves no coloniales y sus imágenes de perfil
    SeoApisService.prototype.listaNoColoniales = function () {
        return this.http.get(this.url + '/api/listNoCol');
    };
    //Recupera el listado de Comunidades autónomas de la base de datos de SEO
    SeoApisService.prototype.getCCAA = function () {
        return this.http.get(this.url + '/api/ccaa');
    };
    //Recupera un listado de provincias de una comunidad autónoma de la base de datos de SeO
    SeoApisService.prototype.getProvincia = function (idCom) {
        return this.http.get(this.url + '/api/provincias/' + idCom);
    };
    //Recupera un listado de todas las provincias de la base de datos de SeO
    SeoApisService.prototype.getProvincias = function () {
        return this.http.get(this.url + '/api/provincias');
    };
    //Recupera los municipios de una provincia de la base de datos de SEO
    SeoApisService.prototype.getMunicipio = function (idProv) {
        return this.http.get(this.url + '/api/municipios/' + idProv);
    };
    //Recupera todos los tipos de propiedades
    SeoApisService.prototype.getTipoProp = function () {
        return this.http.get(this.url + '/api/tipo-propiedads');
    };
    //Recupera todos los tipos de edificios
    SeoApisService.prototype.getTipoEd = function () {
        return this.http.get(this.url + '/api/tipo-edificios');
    };
    //LLAMADA A LOGIN DE SEO
    SeoApisService.prototype.loginSeo = function (data) {
        //let config = {headers: new HttpHeaders().set("Content-Type", 'application/json')};
        var response = this.http.post(this.urlSeo + data, [], {});
        return response;
    };
    SeoApisService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_providers_api_api_provider__WEBPACK_IMPORTED_MODULE_2__["ApiProvider"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], SeoApisService);
    return SeoApisService;
}());



/***/ }),

/***/ "./src/services/territorios.service.ts":
/*!*********************************************!*\
  !*** ./src/services/territorios.service.ts ***!
  \*********************************************/
/*! exports provided: TerritoriosService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TerritoriosService", function() { return TerritoriosService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _providers_api_api_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../providers/api/api-provider */ "./src/providers/api/api-provider.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TerritoriosService = /** @class */ (function () {
    function TerritoriosService(api, http) {
        this.api = api;
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].backendUrl;
        this.territorioSelectedEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    //Operación para dejar seleccionada una especie en memoria
    TerritoriosService.prototype.selectTerritorio = function (data) {
        localStorage.setItem('especie', JSON.stringify(data));
        this.territorioSelectedEvent.emit(data);
        return data;
    };
    //Recupera el número de territorios cercanos a la posicion del usuario, con un radio de distancia
    TerritoriosService.prototype.recuperaTerritoriosCercanos = function (radio, lat, lon, especie) {
        return this.http.get(this.url + '/api/closeTerr?rad=' + radio + '&lat=' + lat + '&lon=' + lon + '&especie=' + especie);
    };
    //Modificamos los datos de un territorio existente
    TerritoriosService.prototype.modificarTerritorio = function (terrId, data) {
        console.log(data);
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        return this.api.put('api/putTerritorio/' + terrId, JSON.stringify(data), config);
    };
    //Registra un nuevo territorio
    TerritoriosService.prototype.nuevoTerritorio = function (territoio) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/territorios', JSON.stringify(territoio), config);
        return response;
    };
    //Completamos los datos del territorio con datos de nidos 
    TerritoriosService.prototype.completaTerritorioNidos = function (locNidos, terrId) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/territorios/' + terrId + '/loc-nidos', JSON.stringify(locNidos), config);
        return response;
    };
    //Obtenemos las temporadas
    TerritoriosService.prototype.getTemporadas = function () {
        return this.http.get(this.url + '/api/temporadas');
    };
    //Obtenemos los tipos de territorio
    TerritoriosService.prototype.getTiposTerritorio = function () {
        return this.http.get(this.url + '/api/tipo-territorios');
    };
    //Obtenemos los emplazamientos
    TerritoriosService.prototype.getEmplazamientos = function () {
        return this.http.get(this.url + '/api/emplazamientos');
    };
    //Obtenemos los emplazamientos
    TerritoriosService.prototype.getObservaciones = function () {
        return this.http.get(this.url + '/api/observaciones-territorios');
    };
    //Obtenemos los tipos de territorio
    TerritoriosService.prototype.getTipos = function () {
        return this.http.get(this.url + '/api/tipo-territorios');
    };
    //recupera todos los territorios con paginacion
    TerritoriosService.prototype.recuperaTerritorios = function (page, especie) {
        return this.http.get(this.url + '/api/territorios?page=' + page + '&especie=' + especie);
    };
    //Recuperamos territorios con un string de busqueda que incluye filtros
    TerritoriosService.prototype.recuperaTerritoriosFiltered = function (page, busqueda) {
        return this.http.get(this.url + '/api/territorios?page=' + page + busqueda);
    };
    //Recupera los datos de un solo territorio
    TerritoriosService.prototype.recuperaTerritorio = function (terrId) {
        return this.http.get(this.url + '/api/territorios/' + terrId);
    };
    //Recupera los territorios marcados como favoritos por el usuario
    TerritoriosService.prototype.recuperaFavoritos = function (userId) {
        return this.http.get(this.url + '/api/territorios/favoritos/' + userId);
    };
    //Marca un nuevo territorio como favorito
    TerritoriosService.prototype.nuevoFavorito = function (data) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/territorios/favoritos', JSON.stringify(data), config);
        return response;
    };
    //Desmarcamos un favorito
    TerritoriosService.prototype.removeFavorito = function (colId, usuario) {
        return this.api.delete('api/territorios/favoritos/' + colId + '?usuario=' + usuario);
    };
    //Recupera las visitas para un territorio
    TerritoriosService.prototype.recuperaVisitasGeneral = function (stringBusqueda) {
        return this.http.get(this.url + '/api/visitas-territorios' + stringBusqueda);
    };
    //Registramos una nueva visita en un territorio
    TerritoriosService.prototype.nuevaVisitaTerritorio = function (data, terrId) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        var response = this.http.post(this.url + '/api/territorios/' + terrId + '/visitas', JSON.stringify(data), config);
        return response;
    };
    //Editamos los datos de una visita ya creada
    TerritoriosService.prototype.modificarVisita = function (visitaId, visita) {
        var config = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set("Content-Type", 'application/json') };
        return this.api.put('api/visitas-territorios/' + visitaId, JSON.stringify(visita), config);
    };
    //Eliminamos una visita que hemos creado
    TerritoriosService.prototype.eliminarVisita = function (visitaId) {
        return this.api.delete('api/visitas-territorios/' + visitaId);
    };
    //Obtenemos las estadisticas por año
    TerritoriosService.prototype.getStatsAnno = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsAnnoTerr' + busqueda);
    };
    //Obtenemos las estadisticas por ccaa
    TerritoriosService.prototype.getStatsCcaa = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsCcaaTerr' + busqueda);
    };
    //Obtenemos las estadisticas por provincia
    TerritoriosService.prototype.getStatsProvincia = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsProvinciaTerr' + busqueda);
    };
    //Obtenemos estadisticas generales, una llamada por especie
    TerritoriosService.prototype.getStats = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/statsTerr?especie=' + especie + busqueda);
    };
    //Obtenemos estadisticas para observaciones
    TerritoriosService.prototype.getStatsObsv = function (especie, busqueda) {
        return this.http.get(this.url + '/api/especies/' + especie + '/statsObservaciones' + busqueda);
    };
    //Subimos una imagen
    TerritoriosService.prototype.uploadImage = function (id, images) {
        var formData = new FormData();
        for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
            var image = images_1[_i];
            console.log(image);
            formData.append('file[]', image, id + '_image' + new Date().getTime());
        }
        return this.api.post('api/visitas-territorios/' + id + '/image', formData);
    };
    //Recuperamos documentos
    TerritoriosService.prototype.recuperaDocs = function () {
        return this.http.get(this.url + '/api/docs/territorios');
    };
    TerritoriosService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_providers_api_api_provider__WEBPACK_IMPORTED_MODULE_2__["ApiProvider"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TerritoriosService);
    return TerritoriosService;
}());



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/jessica/Escritorio/front3/cenurbFront/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map