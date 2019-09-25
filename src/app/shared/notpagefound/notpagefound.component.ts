import { Component, OnInit } from '@angular/core';

declare function init_plugins();
@Component({
  selector: 'app-notpagefound',
  templateUrl: './notpagefound.component.html',
  styles: []
})
export class NotpagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins()
  }

}
