import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AlertModule } from 'ngx-alerts';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
    imports: [CommonModule, 
    			LoginRoutingModule,
    			NgxLoadingModule.forRoot({}),
    			TranslateModule,
        		AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'})
        ],
    declarations: [LoginComponent]
})
export class LoginModule {}
