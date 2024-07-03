import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExportService } from '../export.service';

interface OrcamentoPedido {
  quantidade: number;
  preco: number;
  produto: string;
}

interface Resultado {
  quantidadeTotal: number;
  precoTotal: number;
  produto: string;
}

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrcamentoComponent {
  model: OrcamentoPedido = {
    quantidade: 0,
    preco: 0,
    produto: ''
  };

  result: Resultado | null = null;

  constructor(private exportService: ExportService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { quantidade, preco, produto } = this.model;
      this.result = {
        quantidadeTotal: quantidade,
        precoTotal: quantidade * preco,
        produto: produto
      };
    }
  }

  exportResultToExcel() {
    if (this.result) {
      const data = [this.result];
      this.exportService.exportToExcel(data, 'Orcamento');
    }
  }
}
