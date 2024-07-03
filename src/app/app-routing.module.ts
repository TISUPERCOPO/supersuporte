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
  {
    path: 'suportes', loadChildren: () =>
    import('./page/suporte/suporte.module').then(m =>  m.SuporteModule)
  },
  {
    path: 'orcamentos', loadChildren: () =>
    import('./page/orcamento/orcamento.module').then(m =>  m.OrcamentoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
