import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { TempUser } from '../../models/temp-user';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import {AlertService} from 'ngx-alerts';

declare var $:any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

	isAnonymous:boolean=false;
    
	
    constructor(private translate: TranslateService, 
    			public router: Router,
    			private alertService: AlertService,
    			public authService: AuthService) {
    	this.translate.addLangs(['en', 'es']);
        this.translate.setDefaultLang('es');

         localStorage.setItem('isLoggedin', 'true');

        localStorage.clear();
    }

    ngOnInit() {}

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

    loginAnonymous(){
    	let data={
    		name: $('#name').val(),
    		lastName:$('#lastName').val() ,
    		email:$('#email').val() ,
    		phone: $('#phone').val()
    	};

    	let tempUser: TempUser= new TempUser();
    	tempUser.setName(data.name);
    	tempUser.setLastName(data.lastName);
    	tempUser.setEmail(data.email);
    	tempUser.setPhone(data.phone);

    	this.authService.loginAnonymous(tempUser).subscribe(
      		data => {
        		console.log(data);
      		},
      		error => {
      			this.alertService.warning(this.translate.instant("Login.errorLoginAno"));
      			
        	}
        );

    }
}

