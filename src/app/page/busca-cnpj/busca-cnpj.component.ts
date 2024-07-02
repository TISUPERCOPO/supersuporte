import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CnpjService } from './cnpj.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-busca-cnpj',
  templateUrl: './busca-cnpj.component.html',
  styleUrls: ['./busca-cnpj.component.css']
})
export class BuscaCnpjComponent implements OnInit{

  buscacnpj: string = '';
  buscar: boolean = false;

  constructor(private cnpjService: CnpjService, private messageService: MessageService,
    private spinner: NgxSpinnerService) {}

  ngOnInit() {

  }

  buscarCNPJs(buscacnpj: any, form: any) {
    if (buscacnpj != null && buscacnpj !== '' && buscacnpj >= 8) {
      this.spinner.show();
      this.cnpjService.consultaCNPJ(buscacnpj).subscribe({
        next: (dados) => {
          this.buscar = true;
          setTimeout(() => {
            this.populaCNPJForm(dados, form);
            this.populaCNPJForms(dados, form);
          }, 100);
          this.spinner.hide();
        },
        error: (e) => {
          this.resetaCNPJForm(form);
          this.buscar = false;
          this.spinner.hide();
          this.messageService.add({
            severity: 'error',
            summary: 'Atenção',
            detail: 'Erro ao buscar cnpj!'
          });
        }
      })
      this.cnpjService.consultaCNPJs(buscacnpj).subscribe({
        next: (dados) => {
          this.buscar = true;
          setTimeout(() => {
            this.populaCNPJForms(dados, form);
          }, 100);
          this.spinner.hide();
        },
        error: (e) => {
          this.resetaCNPJForm(form);
          this.buscar = false;
          this.spinner.hide();
          this.messageService.add({
            severity: 'error',
            summary: 'Atenção',
            detail: 'Erro ao buscar cnpj!'
          });
        }
      })
    }
  }

  buscarCNPJ(buscacnpj: any, form: any) {
    if (buscacnpj != null && buscacnpj !== '' && buscacnpj >= 8) {
      this.spinner.show();
      this.cnpjService.consultaCNPJs(buscacnpj).subscribe({
        next: (dados) => {
          this.buscar = true;
          setTimeout(() => {
            this.populaCNPJForms(dados, form);
          }, 100);
          this.spinner.hide();
        },
        error: (e) => {
          this.resetaCNPJForm(form);
          this.buscar = false;
          this.spinner.hide();
          this.messageService.add({
            severity: 'error',
            summary: 'Atenção',
            detail: 'Erro ao buscar cnpj!'
          });
        }
      })
    }
  }

  populaCNPJForm(dados: any, formulario: any) {
    formulario.form.patchValue({
      logradouro: dados.logradouro,
      municipio: dados.municipio,
      bairro: dados.bairro,
      uf: dados.uf,
      numero: dados.numero,
      cep: dados.cep,
      complemento: dados.complemento,
      razao_social: dados.razao_social,
      nome_fantasia: dados.nome_fantasia,
      porte: dados.porte,
      email: dados.email,
      ddd_fax: dados.ddd_fax,
      cnae_fiscal: dados.cnae_fiscal,
      codigo_porte: dados.codigo_porte,
      capital_social: dados.capital_social,
      ddd_telefone_1: dados.ddd_telefone_1,
      ddd_telefone_2: dados.ddd_telefone_2,
      opcao_pelo_mei: dados.opcao_pelo_mei,
      descricao_porte: dados.descricao_porte,
      natureza_juridica: dados.natureza_juridica,
      opcao_pelo_simples: dados.opcao_pelo_simples,
      situacao_cadastral: dados.situacao_cadastral,
      data_opcao_pelo_mei: dados.data_opcao_pelo_mei,
      data_exclusao_do_mei: dados.data_exclusao_do_mei,
      cnae_fiscal_descricao: dados.cnae_fiscal_descricao,
      codigo_municipio_ibge: dados.codigo_municipio_ibge,
      data_inicio_atividade: dados.data_inicio_atividade,
      data_situacao_especial: dados.data_situacao_especial,
      data_opcao_pelo_simples: dados.data_opcao_pelo_simples,
      data_situacao_cadastral: dados.data_situacao_cadastral,
      codigo_natureza_juridica: dados.codigo_natureza_juridica,
      data_exclusao_do_simples: dados.data_exclusao_do_simples,
      identificador_matriz_filial: dados.identificador_matriz_filial,
      qualificacao_do_responsavel: dados.qualificacao_do_responsavel,
      descricao_situacao_cadastral: dados.descricao_situacao_cadastral,
      descricao_tipo_de_logradouro: dados.descricao_tipo_de_logradouro,
      descricao_motivo_situacao_cadastral: dados.descricao_motivo_situacao_cadastral,
      descricao_identificador_matriz_filial: dados.descricao_identificador_matriz_filial

    })
  }

  resetaCNPJForm(formulario: any) {
    formulario.form.patchValue({
      logradouro: null,
      cidade: null,
      bairro: null,
      estado: null,
      numero: null,
      cep: null,
      complemento: null,
      razao_social: null,
      nome_fantasia: null,
      porte: null
    })
  }

  populaCNPJForms(dados: any, formulario: any) {
    formulario.form.patchValue({
      nome_empresarial: dados.nome_empresarial,
      nome_fantasia: dados.nome_fantasia,
      cep: dados.cep,
      logradouro: dados.logradouro,
      numero: dados.numero,
      complemento: dados.complemento,
      bairro: dados.bairro,
      situacao_cnpj: dados.situacao_cnpj,
      situacao_ie: dados.situacao_ie,
      cnae_principal: dados.cnae_principal,
      inscricao_estadual: dados.inscricao_estadual,
      municipio: dados.municipio,
      uf: dados.uf,
      regime_tributacao: dados.regime_tributacao,
      porte_empresa: dados.porte_empresa,
      data_inicio_atividade: dados.data_inicio_atividade,
      data_fim_atividade: dados.data_fim_atividade,
      data_situacao_cadastral: dados.data_situacao_cadastral,
      status: dados.status


    });
  }


}
