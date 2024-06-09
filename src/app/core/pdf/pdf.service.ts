import { PrestamosDay } from './../../feature/dashboard/dashboard.interface';
import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  public generateMemberPdf(elementId: string, pdfName: string, dui: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      // Renderizar el contenido del elemento HTML en un canvas
      html2canvas(element).then(canvas => {
        // Convertir el canvas a una imagen base64
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Añadir la imagen del contenido HTML al PDF
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Generar un código de barras para el DUI
        const barcodeCanvas = document.createElement('canvas');
        JsBarcode(barcodeCanvas, dui, { format: 'CODE128' });

        // Convertir el canvas del código de barras a una imagen base64
        const barcodeData = barcodeCanvas.toDataURL('image/png');

        // Añadir el código de barras al PDF
        pdf.addImage(barcodeData, 'PNG', 10, pdfHeight + 10, pdfWidth - 20, 20);

        // Guardar el PDF con el nombre especificado
        pdf.save(pdfName);
      });
    }
  }



}
