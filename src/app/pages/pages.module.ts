import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';


//import { PagesComponent } from './pages.component';
// Comunes
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

//TMP
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoComponent } from '../components/grafico/grafico.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//Pipe
import { PipesModule } from '../pipes/pipes.module';

import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
    declarations: [
//        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        IncrementadorComponent,
        Graficas1Component,
        GraficoComponent,
        AccountSettingComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        MedicosComponent,
        HospitalesComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ChartsModule,
        PipesModule,
        PAGES_ROUTES
    ],
    exports: [
        //PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    providers: []
})


export class PagesModule {}