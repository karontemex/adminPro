import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})

export class LoginGuardGuard implements CanActivate {
  constructor(public _usuarioServicio: UsuarioService, public router: Router){}
  canActivate() {
    console.log('Paso por Guard Login');
    if(this._usuarioServicio.estaLogueado()){
      return true;
    }else{
      this.router.navigate(['/login']);
      console.log('Block');
      return false;
    }
    
  }
  
}
