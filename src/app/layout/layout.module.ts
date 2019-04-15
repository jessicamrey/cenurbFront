import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardTerrComponent } from './dashboard-terr/dashboard-terr.component';
import { SelectorComponent } from '../selector/selector.component';
import { RegisterColComponent } from './register-col/register-col.component';
import { ViewColComponent } from './view-col/view-col.component';

import { ViewCloseColComponent } from './view-close-col/view-close-col.component';
import { RegisterVisitComponent } from './register-visit/register-visit.component';
import { ViewVisitsComponent } from './view-visits/view-visits.component';
import { ViewColProfileComponent } from './view-col-profile/view-col-profile.component';
import { ViewVisitProfileComponent } from './view-visit-profile/view-visit-profile.component';

import { AgmCoreModule } from '@agm/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ArchwizardModule } from 'angular-archwizard';


import { AlertModule } from 'ngx-alerts';
import { NgxLoadingModule } from 'ngx-loading';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { GeneralColComponent } from './general-col/general-col.component';
import { GeneralTerrComponent } from './general-terr/general-terr.component';
import { RegisterTerrComponent } from './register-terr/register-terr.component';
import { ViewTerrComponent } from './view-terr/view-terr.component';
import { ViewCloseTerrComponent } from './view-close-terr/view-close-terr.component';
import { StatisticsTerrComponent } from './statistics-terr/statistics-terr.component';
import { ViewVisitProfileTerrComponent } from './view-visit-profile-terr/view-visit-profile-terr.component';
import { StatisticsNestsComponent } from './statistics-nests/statistics-nests.component';


@NgModule({
    imports: [
        ArchwizardModule,
        NgxLoadingModule.forRoot({}),
        Ng2Charts,
        AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        NgbDropdownModule.forRoot(),
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBDfn3h8TWojAhZa2LxPr17zXkAAUSYtCU'
    })
    ],
    declarations: [LayoutComponent, 
    SidebarComponent,
     HeaderComponent, 
     DashboardTerrComponent,
     SelectorComponent,
     RegisterColComponent,
     ViewColComponent,
     ViewCloseColComponent,
     RegisterVisitComponent,
     ViewVisitsComponent,
     ViewColProfileComponent,
     ViewVisitProfileComponent,
     StatisticsComponent,
     GeneralColComponent,
     GeneralTerrComponent,
     RegisterTerrComponent,
     ViewTerrComponent,
     ViewCloseTerrComponent,
     StatisticsTerrComponent,
     ViewVisitProfileTerrComponent,
     StatisticsNestsComponent,
     ]
})
export class LayoutModule {}
