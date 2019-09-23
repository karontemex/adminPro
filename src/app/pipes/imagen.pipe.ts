import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img/';

    if(!imagen){
      return url + 'usuario/noimage.jpg';
    }

    if(imagen.indexOf('https') >= 0 ){
      return imagen;
    }

    switch ( tipo ) {
      case 'usuario':
          url += 'usuarios/' + imagen;
          break;

      case 'medico':
         url += 'medicos/' + imagen;
         break;

      case 'hospital':
         url += 'hospitales/' + imagen;
         break;

      default:
           url += 'usuarios/05454545' ;
           break;
    }
    return url;
  }

}
