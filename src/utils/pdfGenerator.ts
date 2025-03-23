
import { jsPDF } from "jspdf";
import "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface InvoiceData {
  businessName: string;
  businessAddress: string;
  gstNumber: string;
  proprietorName: string;
  contactNumber: string;
  email: string;
  fromLocation: string;
  toLocation: string;
  distanceKm: number;
  pricePerKm: number;
  gstPercentage: number;
  customerName: string;
  customerPhone: string;
  date: string;
  invoiceNumber: string;
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
}

export const generatePDF = (invoiceData: InvoiceData): void => {
  // Initialize PDF
  const doc = new jsPDF();
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Set font
  doc.setFont("helvetica");
  
  // Add business logo/title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text(invoiceData.businessName, 20, 20);
  
  // Add business address
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const addressLines = doc.splitTextToSize(invoiceData.businessAddress, 100);
  doc.text(addressLines, 20, 30);
  
  // Add GST number
  doc.setFontSize(10);
  doc.text(`GST No: ${invoiceData.gstNumber}`, 20, 45);
  
  // Add invoice title and details
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("TAX INVOICE", 150, 20, { align: "right" });
  
  doc.setFontSize(10);
  doc.text(`Invoice No: ${invoiceData.invoiceNumber}`, 150, 30, { align: "right" });
  doc.text(`Date: ${formatDate(invoiceData.date)}`, 150, 35, { align: "right" });
  
  // Add line
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 50, 190, 50);
  
  // Add customer details
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Customer Details:", 20, 60);
  
  doc.setFontSize(10);
  doc.text(`Name: ${invoiceData.customerName}`, 20, 70);
  doc.text(`Phone: ${invoiceData.customerPhone}`, 120, 70);
  
  // Add line
  doc.line(20, 75, 190, 75);
  
  // Add travel details
  doc.setFontSize(12);
  doc.text("Travel Details:", 20, 85);
  
  doc.setFontSize(10);
  doc.text(`From: ${invoiceData.fromLocation}`, 20, 95);
  doc.text(`To: ${invoiceData.toLocation}`, 120, 95);
  doc.text(`Distance: ${invoiceData.distanceKm} KM`, 20, 105);
  doc.text(`Rate: ₹ ${invoiceData.pricePerKm.toFixed(2)}/KM`, 120, 105);
  
  // Add calculation table
  doc.autoTable({
    startY: 115,
    head: [["Description", "Amount (₹)"]],
    body: [
      [`Base Fare (${invoiceData.distanceKm} KM × ₹${invoiceData.pricePerKm}/KM)`, invoiceData.baseAmount.toFixed(2)],
      [`GST @ ${invoiceData.gstPercentage}%`, invoiceData.gstAmount.toFixed(2)],
      ["Total Amount", invoiceData.totalAmount.toFixed(2)],
    ],
    headStyles: { fillColor: [66, 135, 245] },
    foot: [["Total Amount", invoiceData.totalAmount.toFixed(2)]],
    footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
    theme: 'grid',
    styles: { halign: 'left' },
    columnStyles: { 1: { halign: 'right' } },
  });
  
  // Add terms and conditions
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(11);
  doc.text("Terms & Conditions:", 20, finalY);
  
  doc.setFontSize(9);
  doc.text("1. Payment is due upon receipt of invoice.", 25, finalY + 10);
  doc.text("2. This is a computer-generated invoice and does not require a signature.", 25, finalY + 15);
  doc.text("3. Please quote invoice number for all correspondences.", 25, finalY + 20);
  
  // Add footer
  doc.setFontSize(10);
  doc.text("Thank you for your business!", 105, finalY + 30, { align: "center" });
  doc.setFontSize(8);
  doc.text(`For any queries, please contact: ${invoiceData.contactNumber}`, 105, finalY + 35, { align: "center" });
  doc.text(invoiceData.email, 105, finalY + 40, { align: "center" });
  
  // Save the PDF
  doc.save(`Invoice_${invoiceData.invoiceNumber}.pdf`);
};
