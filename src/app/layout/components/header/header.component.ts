import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ColoniasService } from '../../../../services/colonias.service';
import { TerritoriosService } from '../../../../services/territorios.service';
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    selected=false;
    name="";
    userName:string='';
    userEmail:string='';
    userId:string='';
    isAdmin:boolean;
    url:any;

    constructor(private translate: TranslateService, 
                public router: Router, 
                private coloniasService: ColoniasService,
                private territoriosService: TerritoriosService) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
         this.url = environment.backendUrl + '/login';
        this.userEmail=localStorage.getItem('userEmail');
        this.userName=localStorage.getItem('userName');
        this.userId=localStorage.getItem('userId');

        this.coloniasService.coloniaSelectedEvent.subscribe(
            (data: any) => {
                this.selected=true;
                this.name=data.especie;

            }
        );

        this.territoriosService.territorioSelectedEvent.subscribe(
            (data: any) => {
                this.selected=true;
                this.name=data.especie;

            }
        );

        if (JSON.parse(localStorage.getItem('especie'))){
            this.selected=true;
            this.name=JSON.parse(localStorage.getItem('especie'))["especie"];
        }
    }
    
    comprobarAdmin(){
    //Comprobar si el ususario es admin o no
    
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
