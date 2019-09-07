import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styles: []
})
export class GraficoComponent implements OnInit {
  @Input() leyenda: string = 'Grafica';
  @Input() labels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() datos: MultiDataSet = [[350, 450, 100]];
  @Input() tipo: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
