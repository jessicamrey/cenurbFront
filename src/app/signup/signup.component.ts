import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

declare var $:any;
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    constructor() {}

    ngOnInit() {}



    abrirVentana(nTipo) {
	var sLink = 'http://www.seguimientodeaves.org/_ATLAS/subfRegistro.php';
	sLink += "?CTRL_APPS="+nTipo+"&USU_BUSCAR=";
	if (nTipo == 1) {
		var sId = $("#tbxID").val();
		sLink += sId;
	}
	sLink += '&LOG_APP=CENSOS';
	document.getElementById("iframe").style.visibility = 'visible';;
	$(function(){
		var src = sLink + '&REF=#' + encodeURIComponent( document.location.href );
//alert(src);
		var sty = 'POSITION:relative; LEFT:0px; TOP:0px; WIDTH:740px; HEIGHT:950px; BORDER:solid 1px;';
		try {
			$('#iframe').children('iframe').remove();
			let iframe = $( '<iframe src="' + src + '" style="' + sty + '" scrolling="no" frameborder="1"><\/iframe>' ).appendTo( '#iframe' );
		} catch (e) {}

		$.receiveMessage(function(e){
			var h = e.data.replace( 'nRet=', '' );
			h = decodeURIComponent(h);
			while (h.toString().indexOf('+') != -1) h = h.toString().replace('+',' ');

			function cerrar(sValor){
				document.getElementById("iframe").style.visibility = 'hidden';;
				if (sValor != '0') {
					//this.registerForm.get('nombre').setValue(visita.nombreUsuario);
					//document.frmUsuario.resultado.value = sValor;
					alert('Aceptar: '+sValor);
				} else
					alert('Cancelar');
			}
			cerrar(h);
		}, 'http://www.seguimientodeaves.org' );
	});
}


}
