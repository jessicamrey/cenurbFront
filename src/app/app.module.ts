import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ApiProvider } from '../providers/api/api-provider';
import { AuthService } from '../services/auth.service';
import { SeoApisService } from '../services/seo-apis.service';
import { ColoniasService } from '../services/colonias.service';
import { TerritoriosService } from '../services/territorios.service';




 
// Import your library
import { AlertModule } from 'ngx-alerts';


// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard, 
                ApiProvider,
                AuthService,
                SeoApisService,
                ColoniasService,
                TerritoriosService],
    bootstrap: [AppComponent]
})
export class AppModule {}
