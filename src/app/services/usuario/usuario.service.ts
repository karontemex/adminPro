import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';

import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
   usuario: Usuario;
   token: string;
   menu: any = [];

  constructor(public http: HttpClient, public router: Router, public _imagenService: SubirArchivoService) {
    this.cargarStorage();
  }
  
  estaLogueado(){
    return ( this.token.length > 5 ) ? true : false;
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu) );
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }


  cargarStorage(){
    if( localStorage.getItem('token') ){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    }else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
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
                        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                        return true;
                      }),
                      catchError(error => {
                        Swal.fire('Error login', error.error.mensaje, 'error');
                        throw error;
                      })
                    );
  }

  loginGoogle(token: string){
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token})
                    .pipe(
                      map( (resp: any ) =>{
                        
                        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                        return true;
                      }),
                      catchError(error => {
                        Swal.fire('Error login', error.error.mensaje, 'error');
                        throw error;
                      })
                    );
  }

   logOut(){
     this.usuario = null;
     this.token = '';
     this.menu = [];
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('id');
     localStorage.removeItem('menu');

    this.router.navigate(['/login']);
   }
   
  crearUsuario( usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario)
                    .pipe(
                      map( (resp: any) => {
                          Swal.fire('Usuario creado',usuario.email,'success');
                          return resp.usuario;
                      }),
                      catchError(error => {
                        Swal.fire('Error Crear usuario', error.error.mensaje, 'error');
                        throw error;
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
                          this.guardarStorage( resp.usuarios._id, this.token, resp.usuarios, resp.menu);
                        }
                        Swal.fire('Usuario Actualizado', resp.usuarios.nombre, 'success');
                        return true;
                      }),
                      catchError(error => {
                        Swal.fire('Error Actualizar', error.error.mensaje, 'error');
                        throw error;
                      })
                    );
  }

  cambiarImagen( file: File, id:string){
    this._imagenService.subirArchivo(file, 'usuarios', id)
                       .then( ( resp : any ) => {
                         this.usuario.img = resp.usuario.img;
                         Swal.fire('Imagen Actualizada',this.usuario.nombre,'success');
                         this.guardarStorage(id, this.token, this.usuario, this.menu);
                       })
                       .catch( ( err : any ) =>{
                        Swal.fire('Error Actualizar Foto', err, 'error');
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
   return this.http.delete( url );
  }
}
