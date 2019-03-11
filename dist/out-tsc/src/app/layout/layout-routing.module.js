"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var layout_component_1 = require("./layout.component");
var dashboard_terr_component_1 = require("./dashboard-terr/dashboard-terr.component");
var selector_component_1 = require("../selector/selector.component");
var register_col_component_1 = require("./register-col/register-col.component");
var register_visit_component_1 = require("./register-visit/register-visit.component");
var view_close_col_component_1 = require("./view-close-col/view-close-col.component");
var view_col_component_1 = require("./view-col/view-col.component");
var view_visits_component_1 = require("./view-visits/view-visits.component");
var view_visit_profile_component_1 = require("./view-visit-profile/view-visit-profile.component");
var form_new_visit_component_1 = require("./form-new-visit/form-new-visit.component");
var routes = [
    {
        path: '',
        component: layout_component_1.LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'formNewVisit', component: form_new_visit_component_1.FormNewVisitComponent },
            { path: 'visitProfile', component: view_visit_profile_component_1.ViewVisitProfileComponent },
            { path: 'registerCol', component: register_col_component_1.RegisterColComponent },
            { path: 'registerVisit', component: register_visit_component_1.RegisterVisitComponent },
            { path: 'viewCloseCol', component: view_close_col_component_1.ViewCloseColComponent },
            { path: 'viewCol', component: view_col_component_1.ViewColComponent },
            { path: 'viewVisits', component: view_visits_component_1.ViewVisitsComponent },
            { path: 'dashboardTerr', component: dashboard_terr_component_1.DashboardTerrComponent },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }
        ]
    },
    { path: 'selector', component: selector_component_1.SelectorComponent }
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());
exports.LayoutRoutingModule = LayoutRoutingModule;
//# sourceMappingURL=layout-routing.module.js.map