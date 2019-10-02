import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor( public _usuarioService: UsuarioService,
    public router: Router ){

  }

  canActivate( ): Promise<boolean> | boolean {
    console.log('renueva token');
    let token = this._usuarioService.token;
    let payload = JSON.parse( atob( token.split('.')[1] ) );
    let expirado = this.expiro( payload.exp );

    if ( expirado ) {
      this._usuarioService.logOut();
      return false;
    }
    

    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExp: number ): Promise<boolean> {
    return new Promise( ( resolve, reject ) => {
      let tokenExp = new Date( fechaExp * 1000 );
      let ahora = new Date();
      
      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ));
      
      if ( tokenExp.getTime() > ahora.getTime() ) {
      //  console.log('no se renueva');
        resolve(true);
      }else{
        this._usuarioService.renuevaToken().subscribe( () =>{
        //  console.log('renovado');
          resolve(true);
        }, () => {
          reject(false);
        });
      }
     // reject(false);
    });
  }
  expiro(fechaExp: number){
    let ahora = new Date().getTime() / 1000;
    if ( fechaExp < ahora ){
      return true;
    }else{
      return false;
    }
  }
}
