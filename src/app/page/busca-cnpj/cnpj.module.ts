import { NgModule } from "@angular/core";
import { BuscaCnpjComponent } from "./busca-cnpj.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { CNPJRouting } from "./cnpj.routing";


@NgModule({
    declarations: [
        BuscaCnpjComponent
    ],
    imports: [
        PrimeNgModule,
        CNPJRouting
    ]
})

export class CNPJModule { }