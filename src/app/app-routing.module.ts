import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cnpj', loadChildren: () =>
    import('./page/busca-cnpj/cnpj.module').then(m =>  m.CNPJModule)
  },
  {
    path: 'cep', loadChildren: () =>
    import('./page/cep/cep.module').then(m =>  m.CepModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
