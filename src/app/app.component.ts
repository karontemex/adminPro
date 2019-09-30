import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';
import { ModalUploadService } from './components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';
  constructor(public _ajustes: SettingsService,public _md: ModalUploadService){  }
}
