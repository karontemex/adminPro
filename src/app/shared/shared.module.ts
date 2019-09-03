import { NgModule } from '@angular/core';

import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcumbsComponent,
        NotpagefoundComponent
    ],
    imports:[],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcumbsComponent,
        NotpagefoundComponent
    ],    
    providers: [],
})
export class SharedModule { }
