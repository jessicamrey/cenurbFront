import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { TempUser } from '../../models/temp-user';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { SeoApisService } from '../../services/seo-apis.service';


import {AlertService} from 'ngx-alerts';

declare var $:any;



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    url:string="localhost:8000/api/login";
    login1:boolean=false;	
    loading:boolean=false;
    geolocationPosition:any;

    constructor(private translate: TranslateService, 
    			public router: Router,
    			private alertService: AlertService,
    			public authService: AuthService,
                public seoApisService: SeoApisService) {
    	this.translate.addLangs(['en', 'es']);
        this.translate.setDefaultLang('es');

         localStorage.setItem('isLoggedin', 'true');

        localStorage.clear();
    }

    ngOnInit() {
    }

//08072019--------------------------------------------------------------------------------------------------
    
    getLocalizacion(){
     if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.geolocationPosition = position,
                    console.log(position);
                localStorage.setItem('geoLocationPosition', position);
            },
            error => {
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        break;
                    case 2:
                        console.log('Position Unavailable');
                        break;
                    case 3:
                        console.log('Timeout');
                        break;
                }
            }
        );
    };
  }
    
    
    

    onLoggedin() {

        if (this.login1==true){
               this.login1=false;
               this.loading=true;
               
              
                let idData={
                    id_usu: $("#id").val()
                }

                //Comprobamos si es la primera vez que se logea en la aplicacion

                this.authService.isRegistered(idData).subscribe(
                    data=>{
                        console.log("DATA: ");
                        console.log(data);
                       //Ye tenemos datos
                       this.login();
                    },
                    error=>{
                        console.log("ERROR: ");
                        console.log(error);
                        //Es la primera vez
                        this.firstTimeLogin();
                    }


                    );

               
  
        }else{
            console.log("Error. falta el paso 1");
        }
        

                //
    }

    login(){

        let data={
                  "username":$("#email").val(),
                  "password":$("#tbxPass").val()
                };
         this.authService.login(data).subscribe(
                      message => {
                        this.loading=false;
                        console.log(message);
                        localStorage.setItem('isLoggedin', 'true');
                        localStorage.setItem('token',message["access_token"] );
                        localStorage.setItem('userName', $("#name").val());
                        localStorage.setItem('userId', $("#id").val());
                        localStorage.setItem('userEmail', $("#email").val());
                        this.getLocalizacion();

                        this.router.navigate(['/selector']);
                      },
                      error => {
                          this.loading=false;
                          this.alertService.warning(this.translate.instant("Login.error1"));
                        console.log(error);

                          
                    }
                );
    }

    firstTimeLogin(){

        let data={
                  "id_usu": $("#id").val(),
                  "password":$("#tbxPass").val(),
                  "email":$("#email").val()
                };


                this.authService.register(data).subscribe(
                    data=>{
                        //Nos hemos registrado correctamente, ahora nos logeamos
                        this.login();
                    },
                    error=>{
                        console.log(error);

                    }
                    );

    }

    //------------------------------------PEDRO SILOS ---------------------------------------------

   

    abrirVentana(nTipo) {
        
         
        this.login1=true;

        var sUser = $("#tbxUser").val();
        var sPass = $("#tbxPass").val();
        var sId = $("#tbxID").val();
        var result;

        var sLink = "http://www.seguimientodeaves.org/_Atlas/frmLoginCensosServer.php";
        sLink += "?TIPO="+nTipo+"&USER="+sUser+"&PASS="+sPass+"&ID="+sId;
        $(function(){
            var src = sLink + '&REF=#' + encodeURIComponent( document.location.href );
            var sty = 'visibility:hidden;';
            try {
                $('#iframe').children('iframe').remove();
                let iframe = $( '<iframe src="' + src + '" style="' + sty + '" scrolling="no" frameborder="1"><\/iframe>' ).appendTo( '#iframe' );
            } catch (e) {}
            $.receiveMessage(

                function(e){
                    var h = e.data.replace( 'sVal=', '' );

                    h = decodeURIComponent(h);
                    while (h.toString().indexOf('+') != -1) h = h.toString().replace('+',' ');

                    function cerrar (sValor){
                        var sTxt = "";
                        if (sValor != '') {

                            var sRet = sValor.split("#");
                            sTxt += "ID:"+sRet[0]+"#";
                            sTxt += "NOMBRE:"+sRet[1]+"#";
                            sTxt += "EMAIL:"+sRet[2]+"#";
                            
                            (<HTMLInputElement>document.getElementById("id")).value=sRet[0];
                            (<HTMLInputElement>document.getElementById("name")).value=sRet[1];
                            (<HTMLInputElement>document.getElementById("email")).value=sRet[2];


                            document.getElementById("loginHidden").click();

                        } else{
                            sTxt = "NOT FOUND";
                        }
                    }

                     cerrar(h);


                     
            }, 'http://www.seguimientodeaves.org' );

        });

        
    }


    

}

