import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
   usuario: Usuario;
   token: string;

  constructor(public http: HttpClient, public router: Router, public _imagenService: SubirArchivoService) {
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

  actualizarUsuario( usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token='+ this.token;
    return this.http.put( url, usuario )
                    .pipe(
                      map( (resp: any) => {
                        if(usuario._id === this.usuario._id) {
                          this.guardarStorage( resp.usuarios._id, this.token, resp.usuarios);
                        }
                        Swal.fire('Usuario Actualizado', resp.usuarios.nombre, 'success');
                        return true;
                      })
                    );
  }

  cambiarImagen( file: File, id:string){
    this._imagenService.subirArchivo(file, 'usuarios', id)
                       .then( ( resp : any ) => {
                         this.usuario.img = resp.usuario.img;
                         Swal.fire('Imagen Actualizada',this.usuario.nombre,'success');
                         this.guardarStorage(id, this.token, this.usuario);
                       })
                       .catch( ( err : any ) =>{
                         console.log(err);
                       });
  }

  cargarUsuarios( desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );
  }

  buscarUsuario( termino: string){
    let url =  URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;
    return this.http.get( url )
                    .pipe(
                        map( (resp: any) => resp.usuario)
    );
  }

  borrarUsuario( id: string ){
   let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
console.log(url);
   return this.http.delete( url );
  }
}
