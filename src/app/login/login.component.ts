import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean =  false;
  email: string;
  auth2: any;
  constructor(public _usuarioService: UsuarioService, public _router:Router) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.recuerdame = true;
    }

  }
 googleInit(){
   gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '306681952848-rfr7rcba3o6oaqjtrhidppajthbre3pb.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSingin( document.getElementById('btnGoogle') );

   });
 }

 attachSingin( element ){
  this.auth2.attachClickHandler( element, {}, (googleUser) =>{
    let profile = googleUser.getBasicProfile();
    console.log(profile);
    let token = googleUser.getAuthResponse().id_token;
    console.log('Token:', token);
    this._usuarioService.loginGoogle( token )
                        .subscribe( () => this._router.navigate(['/dashboard']) );
  });
 }

  ingresar(forma: NgForm){
    if( forma.invalid ) {
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password); 
     console.log(forma.valid);
     console.log(forma.value);
     this._usuarioService.login(usuario, this.recuerdame)
                         .subscribe( res => this._router.navigate(['/dashboard']) );
  }


}
