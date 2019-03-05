import { NgModule } from '@angular/core';
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
import { FormNewVisitComponent } from './form-new-visit/form-new-visit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
    imports: [
        ArchwizardModule,
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
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
     FormNewVisitComponent]
})
export class LayoutModule {}
