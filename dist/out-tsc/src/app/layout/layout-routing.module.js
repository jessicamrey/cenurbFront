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
var view_visit_profile_terr_component_1 = require("./view-visit-profile-terr/view-visit-profile-terr.component");
var statistics_component_1 = require("./statistics/statistics.component");
var general_col_component_1 = require("./general-col/general-col.component");
var general_terr_component_1 = require("./general-terr/general-terr.component");
var register_terr_component_1 = require("./register-terr/register-terr.component");
var view_terr_component_1 = require("./view-terr/view-terr.component");
var view_close_terr_component_1 = require("./view-close-terr/view-close-terr.component");
var statistics_terr_component_1 = require("./statistics-terr/statistics-terr.component");
var statistics_nests_component_1 = require("./statistics-nests/statistics-nests.component");
var statistics_obsv_component_1 = require("./statistics-obsv/statistics-obsv.component");
var routes = [
    {
        path: '',
        component: layout_component_1.LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: ':colId/visitProfile', component: view_visit_profile_component_1.ViewVisitProfileComponent },
            { path: ':terrId/visitProfileTerr', component: view_visit_profile_terr_component_1.ViewVisitProfileTerrComponent },
            { path: 'registerCol', component: register_col_component_1.RegisterColComponent },
            { path: 'generalCol', component: general_col_component_1.GeneralColComponent },
            { path: 'generalTerr', component: general_terr_component_1.GeneralTerrComponent },
            { path: 'statistics', component: statistics_component_1.StatisticsComponent },
            { path: 'registerVisit', component: register_visit_component_1.RegisterVisitComponent },
            { path: 'viewCloseCol', component: view_close_col_component_1.ViewCloseColComponent },
            { path: 'viewCol', component: view_col_component_1.ViewColComponent },
            { path: 'registerTerr', component: register_terr_component_1.RegisterTerrComponent },
            { path: 'viewTerr', component: view_terr_component_1.ViewTerrComponent },
            { path: 'viewCloseTerr', component: view_close_terr_component_1.ViewCloseTerrComponent },
            { path: 'statisticsTerr', component: statistics_terr_component_1.StatisticsTerrComponent },
            { path: 'statisticsNests', component: statistics_nests_component_1.StatisticsNestsComponent },
            { path: 'statisticsObsv', component: statistics_obsv_component_1.StatisticsObsvComponent },
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