import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'} },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS'} },
            { path: 'account-settings', component: AccountSettingComponent, data: { titulo: 'Settings'} },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
            //mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento Usuarios'} },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento Medicos'} },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento Hospitales'} },
            
            { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);