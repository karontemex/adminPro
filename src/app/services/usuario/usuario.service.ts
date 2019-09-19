import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
   usuario: Usuario;
   token: string;

  constructor(public http: HttpClient, public router: Router) {
    console.log('servicio usuario listo');
    this.cargarStorage();
  }
  
  estaLogueado(){
    return ( this.token.length > 5 ) ? true : false;
  }

  guardarStorage( id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }


  cargarStorage(){
    if( localStorage.getItem('token') ){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    }else{
      this.token = '';
      this.usuario = null;

    }
  }
  login(usuario: Usuario, recordar: boolean){
    let url = URL_SERVICIOS + '/login';
    
    if( recordar ){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }
    return this.http.post(url, usuario)
                    .pipe(
                      map( ( resp:any ) => {
                        this.guardarStorage(resp.id,resp.token,resp.usuario);
                        return true;
                      })
                    );
  }

  loginGoogle(token: string){
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token})
                    .pipe(
                      map( (resp: any ) =>{
                        this.guardarStorage(resp.id,resp.token,resp.usuario);
                        return true;
                      })
                    );
  }

   logOut(){
     this.usuario = null;
     this.token = '';
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('id');
    this.router.navigate(['/login']);
   }
   
  crearUsuario( usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario)
                    .pipe(
                      map( (resp: any) => {
                          Swal.fire('Usuario creado',usuario.email,'success');
                          return resp.usuario;
                      }) 
                    );
  }


}