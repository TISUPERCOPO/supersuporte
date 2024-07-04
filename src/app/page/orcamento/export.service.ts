import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToExcel(data: any[], fileName: string): void {
    const formattedData = data.map(row => {
      const formattedRow = { ...row };
      for (const key in formattedRow) {
        if (this.isMonetaryField(key) && typeof formattedRow[key] === 'number') {
          formattedRow[key] = this.formatCurrency(formattedRow[key]);
        }
      }
      return formattedRow;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  async exportToPDF(data: any[], fileName: string, companyInfo: any, observation: string, discountPercentage: number, totalDiscountValue: number, totalComDesconto: number, totalBruto: number): Promise<void> {
    const doc = new jsPDF();
    const columns = [
        { title: 'Produto', dataKey: 'produto' },
        { title: 'Quantidade', dataKey: 'quantidade' },
        { title: 'Porcentagem', dataKey: 'percentualDesconto' },
        { title: 'Valor do Desconto', dataKey: 'valorDesconto' },
        { title: 'Valor do Produto', dataKey: 'valorProduto' },
        { title: 'Total Bruto', dataKey: 'totalBruto' }
    ];

    const rows = data.map(item => [
        item.produto,
        item.quantidade,
        `${item.percentualDesconto}%`,
        this.formatCurrency(item.valorDesconto),
        this.formatCurrency(item.preco),
        this.formatCurrency(item.total)
    ]);

    // Add company info and logo
    doc.setFontSize(18);
    doc.text(companyInfo.name, 20, 20);

    // Load and add image
    const logoBase64 = await this.getBase64ImageFromURL(companyInfo.logo);
    if (logoBase64) {
        doc.addImage(logoBase64, 'PNG', 150, 10, 40, 20);
    }

    doc.setFontSize(12);
    doc.text(`Endereço: ${companyInfo.address}`, 20, 40);
    doc.text(`Telefone: ${companyInfo.phone}`, 20, 50);
    //doc.text(`Email: ${companyInfo.email}`, 20, 60);

    // Add table
    (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: 70
    });

    // Add total discount value
    const finalY = (doc as any).lastAutoTable.finalY;
    doc.text(`Total do Desconto: ${this.formatCurrency(totalDiscountValue)}`, 20, finalY + 20);
    doc.text(`Total Bruto: ${this.formatCurrency(totalBruto)}`, 20, finalY + 30);
    doc.text(`Total com Desconto: ${this.formatCurrency(totalComDesconto)}`, 20, finalY + 40);

    // Add observation at the end of the page
    doc.text('Observations:', 20, finalY + 60);
    doc.text(observation, 20, finalY + 70);

    doc.save(`${fileName}_export_${new Date().getTime()}.pdf`);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }

  private getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = error => reject(error);
    });
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
  }

  private isMonetaryField(fieldName: string): boolean {
    const monetaryFields = ['valorDesconto', 'preco', 'total'];
    return monetaryFields.includes(fieldName);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
