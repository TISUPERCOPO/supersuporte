import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExportService } from '../export.service';

interface Produto {
  produto: string;
  quantidade: number;
  preco: number;
  total: number;
}

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrcamentoComponent {
  model: Produto = {
    produto: '',
    quantidade: 0,
    preco: 0,
    total: 0
  };

  produtos: Produto[] = [];

  companyInfo = {
    name: 'Minha Empresa',
    address: 'Rua Exemplo, 123',
    phone: '(11) 1234-5678',
    email: 'contato@minhaempresa.com',
    logo: 'assets/img/logo.png' // Caminho para o logotipo
  };

  constructor(private exportService: ExportService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { produto, quantidade, preco } = this.model;
      const total = quantidade * preco;
      this.produtos.push({ produto, quantidade, preco, total });
      form.resetForm();  // Limpar o formulário após adicionar o produto
    }
  }

  deleteProduto(index: number) {
    this.produtos.splice(index, 1);
  }

  exportResultToExcel() {
    if (this.produtos.length > 0) {
      this.exportService.exportToExcel(this.produtos, 'Orcamento');
    }
  }

  async exportResultToPDF() {
    if (this.produtos.length > 0) {
      await this.exportService.exportToPDF(this.produtos, 'Orcamento', this.companyInfo);
    }
  }
}
