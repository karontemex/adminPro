import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcumbsComponent,
        NotpagefoundComponent,
        ModalUploadComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        PipesModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcumbsComponent,
        NotpagefoundComponent,
        ModalUploadComponent,
    ],    
    providers: [],
})
export class SharedModule { }
