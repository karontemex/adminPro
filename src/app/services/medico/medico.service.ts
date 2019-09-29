import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalRegistros: number = 0;
  constructor( public http: HttpClient, public _usuarioService: UsuarioService ) { }

  buscarMedico( termino: string){
    let url =  URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;
    return this.http.get( url )
                    .pipe(
                        map( (resp: any) => resp.medico)
    );
  }
  cargarMedicos(){
    let url = URL_SERVICIOS + '/medico';
    
    return this.http.get( url ).pipe(
      map ( ( resp: any ) =>{
        this.totalRegistros = resp.total;
        return resp.medicos;
      })
    );

  }
  cargarMedico( id: string ){
    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url ).pipe(
      map ( ( resp: any ) =>{
        return resp.medico;
      })
    );

  }
  guardarMedico( medico: Medico ){
    let url = URL_SERVICIOS + '/medico';
    if( medico._id){
      url += '/' + medico._id;
      url +='?token=' + this._usuarioService.token;
      return this.http.put(url, medico)
               .pipe(
                 map( ( res: any ) =>{
                   console.log(res);
                   Swal.fire('Médico Actualizado',res.medico.nombre,'success');
                   return res.medico;
                 })
               );
    }else{
      url +='?token=' + this._usuarioService.token;

      return this.http.post(url, medico)
               .pipe(
                 map( ( res: any ) =>{
                   Swal.fire('Médico Creado',res.medico.nombre,'success');
                   return res.medico;
                 })
               );
    }
  }

  borrarMedico( id: string ){
    let url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url );
   }
}
