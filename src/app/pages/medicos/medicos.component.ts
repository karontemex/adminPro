import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public medicoService: MedicoService, public _modalService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe( resp => {
      this.medicos = resp;
      this.cargando = false;
      console.log(resp);
     });
  }

  buscarMedico( termino: string) {

    if( termino.length <= 2){
      this.cargarMedicos();
      return;
    }
    this.cargando = true;
    this.medicoService.buscarMedico(termino)
                        .subscribe( (medicos: Medico[]) =>{
                          
                          this.medicos = medicos;
                          this.cargando = false;
                        });
  }

  borrarMedico( medico: Medico ){ 
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "Esta a punto de borrar a " + medico.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si ',
      cancelButtonText: 'Cancelar ',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id)
                            .subscribe( resp => {
                                swalWithBootstrapButtons.fire(
                                  'Borrado!',
                                  'Se elinimo al usuario ' + medico.nombre + '.',
                                  'success'
                                );
                                console.log(resp);
                                this.cargarMedicos();
                            });
      } else if ( result.dismiss === Swal.DismissReason.cancel ) {
        return;
      }
    });
  }

  //ok
  cambiarDesde( valor: number){
    let desde = this.desde + valor;
    
    if(desde >= this.totalRegistros){
      return;
    }

    if( desde < 0){
      return;
    }
    this.desde = desde;
    this.cargarMedicos();
  }
 //ok

  mostralModal( id: string ){
    this._modalService.mostrarModal('medicos', id);
  }
}
