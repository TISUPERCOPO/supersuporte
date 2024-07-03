import { NgModule } from "@angular/core";
import { PrimeNgModule } from "src/app/primeng.module";
import { OrcamentoComponent } from "./orcamento/orcamento.component";
import { OrcamentoRouting } from "./orcamento.routing";




@NgModule({
    declarations: [
        OrcamentoComponent
    ],
    imports: [
        PrimeNgModule,
        OrcamentoRouting
    ]
})

export class OrcamentoModule {}