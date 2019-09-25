import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})

export class ModalUploadComponent implements OnInit {
  
  
  imagenSubir: File;
  imagenTemp: string;
  constructor(public _archivoService: SubirArchivoService, public _modalService: ModalUploadService) {  }

  ngOnInit() {
  }

  cerrarModal(){
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalService.ocultarModal();
  }
  seleccionImagen( archivo: File ){
    console.log( event );
    if( !archivo ){
      this.imagenSubir = null;
      this.imagenTemp = null;
      return;
    }
    if( archivo.type.indexOf('image') < 0){
      Swal.fire('El archivo es inválido','Solo se aceptan imagenes','error');
      this.imagenTemp = null;
      return;
    }
    
    this.imagenSubir = archivo ;

    let reader = new FileReader();
    let urlImgTmp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result as string;
  }

  subirImagen(){
    console.log('entro');
    this._archivoService.subirArchivo(this.imagenSubir,this._modalService.tipo,this._modalService.id)
                        .then( resp => {
                          
                          this._modalService.notificacion.emit( resp );
                          this.cerrarModal();
                        })
                        .catch( err => {
                          this.cerrarModal();
                          Swal.fire('El archivo no se subio','','error');
                          console.log('error',err);
                        });
  }
}
