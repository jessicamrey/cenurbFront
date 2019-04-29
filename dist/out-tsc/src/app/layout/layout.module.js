"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var common_1 = require("@angular/common");
var core_2 = require("@ngx-translate/core");
var ng_bootstrap_2 = require("@ng-bootstrap/ng-bootstrap");
var layout_routing_module_1 = require("./layout-routing.module");
var layout_component_1 = require("./layout.component");
var sidebar_component_1 = require("./components/sidebar/sidebar.component");
var header_component_1 = require("./components/header/header.component");
var dashboard_terr_component_1 = require("./dashboard-terr/dashboard-terr.component");
var selector_component_1 = require("../selector/selector.component");
var register_col_component_1 = require("./register-col/register-col.component");
var view_col_component_1 = require("./view-col/view-col.component");
var view_close_col_component_1 = require("./view-close-col/view-close-col.component");
var register_visit_component_1 = require("./register-visit/register-visit.component");
var view_visits_component_1 = require("./view-visits/view-visits.component");
var view_col_profile_component_1 = require("./view-col-profile/view-col-profile.component");
var view_visit_profile_component_1 = require("./view-visit-profile/view-visit-profile.component");
var core_3 = require("@agm/core");
var forms_1 = require("@angular/forms");
var angular_archwizard_1 = require("angular-archwizard");
var ngx_alerts_1 = require("ngx-alerts");
var ngx_loading_1 = require("ngx-loading");
var statistics_component_1 = require("./statistics/statistics.component");
var ng2_charts_1 = require("ng2-charts");
var general_col_component_1 = require("./general-col/general-col.component");
var general_terr_component_1 = require("./general-terr/general-terr.component");
var register_terr_component_1 = require("./register-terr/register-terr.component");
var view_terr_component_1 = require("./view-terr/view-terr.component");
var view_close_terr_component_1 = require("./view-close-terr/view-close-terr.component");
var statistics_terr_component_1 = require("./statistics-terr/statistics-terr.component");
var view_visit_profile_terr_component_1 = require("./view-visit-profile-terr/view-visit-profile-terr.component");
var statistics_nests_component_1 = require("./statistics-nests/statistics-nests.component");
var statistics_obsv_component_1 = require("./statistics-obsv/statistics-obsv.component");
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        core_1.NgModule({
            imports: [
                angular_archwizard_1.ArchwizardModule,
                ngx_loading_1.NgxLoadingModule.forRoot({}),
                ng2_charts_1.ChartsModule,
                ngx_alerts_1.AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: 'right' }),
                common_1.CommonModule,
                layout_routing_module_1.LayoutRoutingModule,
                core_2.TranslateModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                ng_bootstrap_2.NgbDropdownModule.forRoot(),
                core_3.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyBDfn3h8TWojAhZa2LxPr17zXkAAUSYtCU'
                })
            ],
            declarations: [layout_component_1.LayoutComponent,
                sidebar_component_1.SidebarComponent,
                header_component_1.HeaderComponent,
                dashboard_terr_component_1.DashboardTerrComponent,
                selector_component_1.SelectorComponent,
                register_col_component_1.RegisterColComponent,
                view_col_component_1.ViewColComponent,
                view_close_col_component_1.ViewCloseColComponent,
                register_visit_component_1.RegisterVisitComponent,
                view_visits_component_1.ViewVisitsComponent,
                view_col_profile_component_1.ViewColProfileComponent,
                view_visit_profile_component_1.ViewVisitProfileComponent,
                statistics_component_1.StatisticsComponent,
                general_col_component_1.GeneralColComponent,
                general_terr_component_1.GeneralTerrComponent,
                register_terr_component_1.RegisterTerrComponent,
                view_terr_component_1.ViewTerrComponent,
                view_close_terr_component_1.ViewCloseTerrComponent,
                statistics_terr_component_1.StatisticsTerrComponent,
                view_visit_profile_terr_component_1.ViewVisitProfileTerrComponent,
                statistics_nests_component_1.StatisticsNestsComponent,
                statistics_obsv_component_1.StatisticsObsvComponent,
            ]
        })
    ], LayoutModule);
    return LayoutModule;
}());
exports.LayoutModule = LayoutModule;
//# sourceMappingURL=layout.module.js.map