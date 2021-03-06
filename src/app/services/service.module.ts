import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService, SidebarService, SharedService, UsuarioService, 
         SubirArchivoService, MedicoService, LoginGuardGuard, AdminGuard,VerificaTokenGuard } from "./service.index";
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    MedicoService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard,
    SubirArchivoService,
    ModalUploadService
  ]
})
export class ServiceModule { }
