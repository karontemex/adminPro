import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

import Swal from 'sweetalert2';
import { HospitalService } from '../../services/hospital/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})

export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _hospitalService: HospitalService,
              public _modalService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalService.notificacion.subscribe(
      resp => {
        console.log(resp);
        this.cargarHospitales();
      });
  }
//OK
  cargarHospitales(){
    this.cargando = true;
    this._hospitalService.cargarHospitales( this.desde )
                        .subscribe( (resp : any) => {
                          console.log(resp);
                          this.totalRegistros = resp.total;
                          this.hospitales = resp.hospitales;
                          this.cargando = false;
                        });
  }

  buscarHospital( termino: string) {
    console.log(termino);
    if( termino.length <= 2){
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospital(termino)
                        .subscribe( (hospitales: Hospital[]) =>{
                          console.log(hospitales);
                          this.hospitales = hospitales;
                          this.cargando = false;
                        });
  }
//OK
  guardarHospital( hospital: Hospital ){

    this._hospitalService.actualizarHospital( hospital).subscribe();
  }
//OK
  borrarHospital( hospital: Hospital ){ 
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
      
      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: "Esta a punto de borrar a " + hospital.nombre,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si ',
        cancelButtonText: 'Cancelar ',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this._hospitalService.borrarHospital(hospital._id)
                              .subscribe( resp => {
                                  swalWithBootstrapButtons.fire(
                                    'Borrado!',
                                    'Se elinimo al usuario ' + hospital.nombre + '.',
                                    'success'
                                  );
                                  console.log(resp);
                                  this.cargarHospitales();
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
    this.cargarHospitales();
  }
 //ok
  modalHospital(){
    Swal.fire({
      title: 'Nombre del hospital a crear',
      input: 'text',
      inputPlaceholder: 'nombre'
    }).then( (res: any ) => {
        if (res) {
          this._hospitalService.crearhospital( res.value ).subscribe( res => this.cargarHospitales());
        }
    });
  }

  mostralModal( id: string ){
    this._modalService.mostrarModal('hospitales', id);
  }
}
