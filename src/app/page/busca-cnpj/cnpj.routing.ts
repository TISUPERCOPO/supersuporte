import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuscaCnpjComponent } from "./busca-cnpj.component";


const routes: Routes = [
    {
        path: '',
        component: BuscaCnpjComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class CNPJRouting { }