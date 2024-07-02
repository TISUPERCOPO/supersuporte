import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuscarCepComponent } from "./buscar-cep/buscar-cep.component";

const routes: Routes = [
    {
        path: '',
        component: BuscarCepComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class CepRouting {}