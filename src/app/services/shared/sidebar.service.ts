import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu:[
  //       { titulo: 'Dashboard', url: '/dashboard'},
  //       { titulo: 'Progrees Bar', url: '/progress'},
  //       { titulo: 'Graficas', url: '/graficas1'},
  //       { titulo: 'Promesas', url: '/promesas'},
  //       { titulo: 'RXJS', url: '/rxjs'}
  //     ]
  //   },{
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu:[
  //       { titulo: 'Usuarios', url: '/usuarios'},
  //       { titulo: 'Medicos', url: '/medicos'},
  //       { titulo: 'Hospitales', url: '/hospitales'}
  //     ]
  //   }
  // ];
  menu:any;
  constructor(public _usuarioService: UsuarioService) { 

  }
  
  
  cargaMenu(){
    this.menu = this._usuarioService.menu
  }
}
