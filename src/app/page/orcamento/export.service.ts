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

  async exportToPDF(data: any[], fileName: string, companyInfo: any, observation: string): Promise<void> {
    const doc = new jsPDF();
    const columns = Object.keys(data[0]).map(key => ({ title: key, dataKey: key }));
    const rows = data.map(item => {
      const formattedItem = { ...item };
      for (const key in formattedItem) {
        if (this.isMonetaryField(key) && typeof formattedItem[key] === 'number') {
          formattedItem[key] = this.formatCurrency(formattedItem[key]);
        }
      }
      return Object.values(formattedItem);
    });

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

    // Add observation at the end of the page
    const finalY = (doc as any).lastAutoTable.finalY;
    doc.text('Obersavação:', 20, finalY + 20);
    doc.text(observation, 20, finalY + 30);

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
    // Add your specific fields that should be formatted as currency
    const monetaryFields = ['preco', 'valorTotal', 'total', 'outroCampoMonetario'];
    return monetaryFields.includes(fieldName);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
