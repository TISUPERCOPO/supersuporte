import { NgModule } from "@angular/core";
import { SuporteComponent } from "./suporte/suporte.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { SuporteRouting } from "./suporte.routing";


@NgModule({
    declarations: [
        SuporteComponent
    ],
    imports: [
        PrimeNgModule,
        SuporteRouting
    ]
})

export class SuporteModule { }