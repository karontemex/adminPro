import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  constructor() {
  }
  
  @ViewChild('txtPorcentaje',{static: true}) txtPorcentaje: ElementRef;
  @Input() leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  

  ngOnInit() {
  }
  
  
  onChanges(newValue: number) {

    if (newValue >= 100) {
      this.porcentaje = 100;
    }else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

    this.txtPorcentaje.nativeElement.value = Number(this.porcentaje);
    this.cambioValor.emit(this.porcentaje);
 
  }

 cambiarValor( valor ) {
    if( this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }

    if(this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }
    this.porcentaje += valor;
    this.cambioValor.emit(this.porcentaje);
    this.txtPorcentaje.nativeElement.focus();
  }
}
