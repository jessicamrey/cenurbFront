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
import {FormNewVisitComponent} from './form-new-visit/form-new-visit.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [

            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: ':colId/formNewVisit', component: FormNewVisitComponent },
            { path: ':colId/visitProfile', component: ViewVisitProfileComponent },
            { path: 'registerCol', component: RegisterColComponent },
            { path: 'registerVisit', component: RegisterVisitComponent },
            { path: 'viewCloseCol', component: ViewCloseColComponent },
            { path: 'viewCol', component: ViewColComponent },
            { path: 'viewVisits', component: ViewVisitsComponent },
            { path: 'dashboardTerr', component: DashboardTerrComponent },
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
