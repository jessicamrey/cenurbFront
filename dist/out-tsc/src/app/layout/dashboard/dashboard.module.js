"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var core_2 = require("@ngx-translate/core");
var dashboard_routing_module_1 = require("./dashboard-routing.module");
var dashboard_component_1 = require("./dashboard.component");
var components_1 = require("./components");
var shared_1 = require("../../shared");
var ngx_alerts_1 = require("ngx-alerts");
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ng_bootstrap_1.NgbCarouselModule.forRoot(),
                ng_bootstrap_1.NgbAlertModule.forRoot(),
                dashboard_routing_module_1.DashboardRoutingModule,
                core_2.TranslateModule,
                shared_1.StatModule,
                ngx_alerts_1.AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: 'right' })
            ],
            declarations: [
                dashboard_component_1.DashboardComponent,
                components_1.TimelineComponent,
                components_1.NotificationComponent,
                components_1.ChatComponent
            ]
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map