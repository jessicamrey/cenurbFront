import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {DashboardTerrComponent} from './dashboard-terr/dashboard-terr.component';
import {SelectorComponent} from '../selector/selector.component';
import {RegisterColComponent} from './register-col/register-col.component';
import {RegisterVisitComponent} from './register-visit/register-visit.component';
import {ViewCloseColComponent} from './view-close-col/view-close-col.component';
import {ViewColComponent} from './view-col/view-col.component';
import {ViewVisitsComponent} from './view-visits/view-visits.component';
import {ViewVisitProfileComponent} from './view-visit-profile/view-visit-profile.component';
import {ViewVisitProfileTerrComponent} from './view-visit-profile-terr/view-visit-profile-terr.component';

import {StatisticsComponent} from './statistics/statistics.component';
import {GeneralColComponent} from './general-col/general-col.component';
import {GeneralTerrComponent} from './general-terr/general-terr.component';
import {RegisterTerrComponent} from './register-terr/register-terr.component';
import {ViewTerrComponent} from './view-terr/view-terr.component';
import {ViewCloseTerrComponent} from './view-close-terr/view-close-terr.component';
import {StatisticsTerrComponent} from './statistics-terr/statistics-terr.component';
import {StatisticsNestsComponent} from './statistics-nests/statistics-nests.component';
import {StatisticsObsvComponent} from './statistics-obsv/statistics-obsv.component';
import {DocsComponent} from './docs/docs.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [

            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: ':colId/visitProfile', component: ViewVisitProfileComponent },
            { path: ':terrId/visitProfileTerr', component: ViewVisitProfileTerrComponent },
            { path: 'registerCol', component: RegisterColComponent },
            { path: 'generalCol', component: GeneralColComponent },
            { path: 'generalTerr', component: GeneralTerrComponent },
            { path: 'statistics', component: StatisticsComponent },
            { path: 'registerVisit', component: RegisterVisitComponent },
            { path: 'viewCloseCol', component: ViewCloseColComponent },
            { path: 'viewCol', component: ViewColComponent },
            { path: 'registerTerr', component: RegisterTerrComponent },
            { path: 'viewTerr', component: ViewTerrComponent },
            { path: 'viewCloseTerr', component: ViewCloseTerrComponent },
            { path: 'statisticsTerr', component: StatisticsTerrComponent },
            { path: 'statisticsNests', component: StatisticsNestsComponent },
            { path: 'statisticsObsv', component: StatisticsObsvComponent },
            { path: 'viewVisits', component: ViewVisitsComponent },
            { path: 'dashboardTerr', component: DashboardTerrComponent },
            { path: 'docs', component: DocsComponent },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }
        ]
    },
    { path: 'selector', component: SelectorComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
