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
var router_animations_1 = require("../router.animations");
var temp_user_1 = require("../../models/temp-user");
var core_2 = require("@ngx-translate/core");
var auth_service_1 = require("../../services/auth.service");
var ngx_alerts_1 = require("ngx-alerts");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(translate, router, alertService, authService) {
        this.translate = translate;
        this.router = router;
        this.alertService = alertService;
        this.authService = authService;
        this.isAnonymous = false;
        this.translate.addLangs(['en', 'es']);
        this.translate.setDefaultLang('es');
        localStorage.setItem('isLoggedin', 'true');
        localStorage.clear();
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.onLoggedin = function () {
        localStorage.setItem('isLoggedin', 'true');
    };
    LoginComponent.prototype.loginAnonymous = function () {
        var _this = this;
        var data = {
            name: $('#name').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            phone: $('#phone').val()
        };
        var tempUser = new temp_user_1.TempUser();
        tempUser.setName(data.name);
        tempUser.setLastName(data.lastName);
        tempUser.setEmail(data.email);
        tempUser.setPhone(data.phone);
        this.authService.loginAnonymous(tempUser).subscribe(function (data) {
            console.log(data);
        }, function (error) {
            _this.alertService.warning(_this.translate.instant("Login.errorLoginAno"));
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss'],
            animations: [router_animations_1.routerTransition()]
        }),
        __metadata("design:paramtypes", [core_2.TranslateService,
            router_1.Router,
            ngx_alerts_1.AlertService,
            auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map