import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NotpagefoundComponent } from './shared/notpagefound/notpagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/service.index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '',//Lazy
        component: PagesComponent,
        canActivate:[ LoginGuardGuard ],
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: NotpagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });