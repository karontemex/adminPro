import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { URL_SERVICIOS } from 'src/app/config/config';
import { Hospital } from '../../models/hospital.model';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { UsuarioService } from 'src/app/services/service.index';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  hospital: Hospital;
  token:string;

  constructor(public http: HttpClient, public router: Router, 
              public _imagenService: SubirArchivoService,
              public _usuarioService: UsuarioService) {
  
  }

  cargarHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url );
  }

  
//OK
  cargarHospitales( desde: number = 0) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url );
  }

  buscarHospital( termino: string){
    let url =  URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;
    return this.http.get( url )
                    .pipe(
                        map( (resp: any) => resp.hospital)
    );
  }
 //OK
  crearhospital( nombre: string ){
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post( url, {'nombre': nombre})
                    .pipe(
                      map( (resp: any) => {
                          Swal.fire('Hospital creado',resp.hospital.nombre,'success');
                          return resp.hospital;
                      }) 
                    );
  }
//OK
  actualizarHospital( hospital: Hospital ){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token='+ this._usuarioService.token;
    
    return this.http.put( url, {'nombre': hospital.nombre, 'id_usuario': this._usuarioService.usuario._id } )
                    .pipe(
                      map( (resp: any) => {
                        Swal.fire('Usuario Actualizado', resp.hospital.nombre, 'success');
                        return true;
                      })
                    );
  }
//OK
  borrarHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
    console.log(url);
    return this.http.delete( url );
   }

   cambiarImagen( file: File, id:string){
    this._imagenService.subirArchivo(file, 'hospitales', id)
                       .then( ( resp : any ) => {
                         
                         Swal.fire('Imagen Actualizada','','success');
                         
                       })
                       .catch( ( err : any ) =>{
                         console.log(err);
                       });
  }

}
