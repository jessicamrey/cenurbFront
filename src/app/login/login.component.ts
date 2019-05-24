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

    ngOnInit() {
    }

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



    //------------------------------------PEDRO SILOS ---------------------------------------------

    cerrarVentana(sValor) {
        //alert(sValor);
            var sTxt = "";
            if (sValor != '') {
                var sRet = sValor.split("#");
                sTxt += "ID:"+sRet[0]+"#";
                sTxt += "NOMBRE:"+sRet[1]+"#";
                sTxt += "EMAIL:"+sRet[2]+"#";
            } else{
                sTxt = "NOT FOUND";
            }
            alert(sTxt);
        }

    abrirVentana(nTipo) {

        /*var sUser = document.getElementById("tbxUser").value;
        var sPass = document.getElementById("tbxPass").value;
        var sId = document.getElementById("tbxID").value;*/

        var sUser = $("#tbxUser").val();
        var sPass = $("#tbxPass").val();
        var sId = $("#tbxID").val();


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
                    console.log(h);
                    while (h.toString().indexOf('+') != -1) h = h.toString().replace('+',' ');
                    //this.cerrarVentana(h);

                    function cerrar (sValor){
                        var sTxt = "";
                        if (sValor != '') {
                            var sRet = sValor.split("#");
                            sTxt += "ID:"+sRet[0]+"#";
                            sTxt += "NOMBRE:"+sRet[1]+"#";
                            sTxt += "EMAIL:"+sRet[2]+"#";
                        } else{
                            sTxt = "NOT FOUND";
                        }
                        alert(sTxt);
                            }

                     cerrar(h);
                     
            }, 'http://www.seguimientodeaves.org' );
        });
    }




    


}

