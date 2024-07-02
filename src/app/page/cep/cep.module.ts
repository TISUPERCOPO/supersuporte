import { NgModule } from "@angular/core";
import { BuscarCepComponent } from "./buscar-cep/buscar-cep.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { CepRouting } from "./cep.routing";


@NgModule({
    declarations: [
        BuscarCepComponent
    ],
    imports: [
        PrimeNgModule,
        CepRouting
    ]
})

export class CepModule { }