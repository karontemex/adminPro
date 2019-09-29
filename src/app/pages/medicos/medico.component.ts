import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { MedicoService } from 'src/app/services/service.index';
import { Router,ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  medico: Medico = new Medico('','','','','');

  constructor(public _hospitalService: HospitalService, public _medicoService: MedicoService, public router: Router, public ar : ActivatedRoute,
    public _modalService: ModalUploadService) { 
    ar.params.subscribe( params =>{
      let id = params['id'];
      if(id != 'nuevo'){
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe( (resp: any) =>  this.hospitales = resp.hospitales );
    this._modalService.notificacion.subscribe( resp => {
      console.log(resp);
      this.medico.img = resp.usuario.img;
    });
  }

  cargarMedico( id: string ){
    this._medicoService.cargarMedico(id).subscribe( resp => {
      this.medico = resp;
      this.medico.hospital = resp.hospital._id;
      this.cambioHospital(this.medico.hospital);
    
    });
  }
  guardarMedico( f: NgForm ){
    
    if(f.invalid){return;}

    this._medicoService.guardarMedico( this.medico )
                       .subscribe( ( resp: any ) => {
                        this.medico = resp;
                         this.router.navigate(['/medico', this.medico._id]);
                       } );

  }

  cambioHospital( id: string ){
    this._hospitalService.cargarHospital(id)
    .subscribe( (resp:any) => this.hospital = resp.hospital);

  }

  mostralModal( ){
    this._modalService.mostrarModal('medicos', this.medico._id);
  }
}
