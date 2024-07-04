import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExportService } from '../export.service';

interface Produto {
  produto: string;
  quantidade: number;
  preco: number;
  total: number;
  percentualDesconto: number; // Novo campo
  valorDesconto: number;      // Novo campo
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
    total: 0,
    percentualDesconto: 0, // Inicializado
    valorDesconto: 0       // Inicializado
  };

  produtos: Produto[] = [];
  observacao: string = '';
  aplicarDesconto: boolean = false;
  desconto: number = 0;
  totalBruto: number = 0;
  valorTotalDesconto: number = 0;
  totalComDesconto: number = 0;

  companyInfo = {
    name: 'Super Copo',
    address: 'Rua Jácomo Valério, 998',
    phone: '(43) 3151-1876',
    //email: 'contato@minhaempresa.com',
    logo: 'assets/img/logo.png'
  };

  constructor(private exportService: ExportService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { produto, quantidade, preco } = this.model;
      const valorDesconto = this.aplicarDesconto ? (preco * (this.desconto / 100)) * quantidade : 0;
      const total = (preco * quantidade) - valorDesconto;
      this.produtos.push({ produto, quantidade, preco, total, percentualDesconto: this.desconto, valorDesconto });
      this.calculateTotals();
      form.resetForm();  // Limpar o formulário após adicionar o produto
    }
  }

  deleteProduto(index: number) {
    this.produtos.splice(index, 1);
    this.calculateTotals();
  }

  calculateTotals() {
    this.totalBruto = this.produtos.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    this.valorTotalDesconto = this.produtos.reduce((sum, item) => sum + item.valorDesconto, 0);
    this.totalComDesconto = this.totalBruto - this.valorTotalDesconto;
  }

  exportResultToExcel() {
    if (this.produtos.length > 0) {
      this.exportService.exportToExcel(this.produtos, 'Orcamento');
    }
  }

  async exportResultToPDF() {
    if (this.produtos.length > 0) {
      await this.exportService.exportToPDF(this.produtos, 'Orcamento', this.companyInfo, this.observacao, this.desconto, this.totalComDesconto, this.valorTotalDesconto, this.totalBruto);
    }
  }

  toggleDesconto() {
    this.aplicarDesconto = !this.aplicarDesconto;
    if (!this.aplicarDesconto) {
      this.desconto = 0; // Resetar o desconto se desativado
    }
    this.calculateTotals();
  }
}
