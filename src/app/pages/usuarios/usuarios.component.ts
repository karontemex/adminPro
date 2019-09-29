import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})

export class UsuariosComponent implements OnInit {
  
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioServide: UsuarioService,
    public _modalService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalService.notificacion.subscribe(
      resp => {
        this.cargarUsuarios();
      });
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioServide.cargarUsuarios( this.desde )
                        .subscribe( (resp : any) => {
                          this.totalRegistros = resp.total;
                          this.usuarios = resp.usuarios;
                          this.cargando = false;
                        });
  }

  cambiarDesde( valor: number){
    let desde = this.desde + valor;
    
    if(desde >= this.totalRegistros){
      return;
    }

    if( desde < 0){
      return;
    }
    this.desde = desde;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string) {
   
    if( termino.length <= 2){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioServide.buscarUsuario(termino)
                        .subscribe( (usuarios: Usuario[]) =>{
                          console.log(usuarios);
                          this.usuarios = usuarios;
                          this.cargando = false;
                        });
  }
  borrarUsuario( usuario: Usuario ){
    if(usuario._id === this._usuarioServide.usuario._id){
      Swal.fire('No se puede borrar usuario','No se puede borrar a si mismo','error' );
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "Esta a putno de borrar a " + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si ',
      cancelButtonText: 'Cancelar ',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._usuarioServide.borrarUsuario(usuario._id)
                            .subscribe( resp => {
                                swalWithBootstrapButtons.fire(
                                  'Borrado!',
                                  'Se elinimo al usuario ' + usuario.nombre + '.',
                                  'success'
                                );
                                console.log(resp);
                                this.cargarUsuarios();
                            });
      } else if ( result.dismiss === Swal.DismissReason.cancel ) {
        return;
      }
    });
  }

  guardarUsuario( usuario ){
    this._usuarioServide.actualizarUsuario( usuario )
                        .subscribe();
  }
  mostralModal( id: string ){
    this._modalService.mostrarModal('usuarios', id);
  }
}
