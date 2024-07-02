import { NgModule } from "@angular/core";
import { PrimeNgModule } from "../primeng.module";
import { LayoutComponent } from "./layout/layout.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { MessageService } from "primeng/api";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [
        LayoutComponent,
        NavbarComponent
    ],
    imports: [
        PrimeNgModule,
        RouterModule

    ],
    providers:[
        MessageService
    ],

    exports: [
        LayoutComponent
    ]
})

export class CoreModule { }