import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
   subs: Subscription;
  constructor() { 

    this.subs = this.regresaObservable().subscribe( numero =>  console.log('Subs: ', numero),
                error =>  console.log('error en el observable',error),
                () => console.log('El observador termino'));
    
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('Me fui de RXJS');
    this.subs.unsubscribe();
  }

  regresaObservable(): Observable<any> {
     return  new Observable( (observer: Subscriber<any>) => {
      let contador = 1;
      let intervalo = setInterval( () => {
        contador++;
        const salida = {
         valor: contador
        };
        observer.next(salida);

        // if (contador == 10 ){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if(contador == 4){
        //   clearInterval(intervalo);
        //   observer.error('Auxlio');
        // }
      }, 1000 );
    }).pipe( 
      map( resp => resp.valor),
      filter( ( valor, index ) => {
       console.log('Filter:', valor, index);
       if( (valor % 2) === 1 ){
         return true;
      }else{
        return false;
       }
      })
    );
  }

}
