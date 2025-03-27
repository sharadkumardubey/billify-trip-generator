import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// 📌 Define TypeScript Interface for Invoice Data
interface InvoiceData {
  invoice_number: string;
  invoice_date: string;
  business_name: string;
  business_address: string;
  gst_number: string;
  proprietor_name: string;
  contact_number: string;
  business_email: string;
  customer_name: string;
  customer_phone: string;
  distance_km: number;
  price_per_km: number;
  base_amount: number;
  gst_percentage: number;
  gst_amount: number;
  total_amount: number;
  from_location: string;
  to_location: string;
}

// 🎨 Modern Styling for the PDF Invoice
const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica", color: "#333", backgroundColor: "#f8f8f8" },
  header: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#222" },
  section: { marginBottom: 10, padding: 10, backgroundColor: "#fff", borderRadius: 5, borderBottom: "2px solid #ddd" },
  label: { fontSize: 10, fontWeight: "bold", color: "#666", textTransform: "uppercase" },
  value: { fontSize: 12, marginBottom: 3 },
  tableRow: { flexDirection: "row", borderBottom: "1px solid #ddd", paddingVertical: 5 },
  cell: { flex: 1, fontSize: 12, textAlign: "center" },
  footer: { marginTop: 20, textAlign: "center", fontSize: 10, color: "#777" },
});

// 📝 Invoice PDF Component
const InvoicePDFGenerator: React.FC<{ data: InvoiceData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Invoice Header */}
      <Text style={styles.header}>Invoice</Text>

      {/* Business Information */}
      <View style={styles.section}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{data.business_name}</Text>
        <Text style={styles.value}>{data.business_address}</Text>
        <Text style={styles.value}>GST No: {data.gst_number}</Text>
        <Text style={styles.value}>Proprietor: {data.proprietor_name}</Text>
        <Text style={styles.value}>Contact: {data.contact_number}</Text>
        <Text style={styles.value}>Email: {data.business_email}</Text>
      </View>

      {/* Invoice Details */}
      <View style={styles.section}>
        <Text style={styles.label}>Invoice Number:</Text>
        <Text style={styles.value}>{data.invoice_number}</Text>

        <Text style={styles.label}>Invoice Date:</Text>
        <Text style={styles.value}>{data.invoice_date}</Text>
      </View>

      {/* Customer Details */}
      <View style={styles.section}>
        <Text style={styles.label}>Customer Name:</Text>
        <Text style={styles.value}>{data.customer_name}</Text>

        <Text style={styles.label}>Customer Phone:</Text>
        <Text style={styles.value}>{data.customer_phone}</Text>
      </View>

      {/* Trip Details */}
      <View style={styles.section}>
        <Text style={styles.label}>From:</Text>
        <Text style={styles.value}>{data.from_location}</Text>

        <Text style={styles.label}>To:</Text>
        <Text style={styles.value}>{data.to_location}</Text>

        <Text style={styles.label}>Distance:</Text>
        <Text style={styles.value}>{data.distance_km} km</Text>

        <Text style={styles.label}>Price per Km:</Text>
        <Text style={styles.value}>₹{data.price_per_km}</Text>
      </View>

      {/* Pricing Breakdown */}
      <View style={styles.section}>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>Description</Text>
          <Text style={styles.cell}>Amount (₹)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>Base Fare</Text>
          <Text style={styles.cell}>{data.base_amount.toFixed(2)}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>GST ({data.gst_percentage}%)</Text>
          <Text style={styles.cell}>{data.gst_amount.toFixed(2)}</Text>
        </View>
        <View style={[styles.tableRow, { fontWeight: "bold", backgroundColor: "#eee" }]}>
          <Text style={styles.cell}>Total Amount</Text>
          <Text style={styles.cell}>₹{data.total_amount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Thank you for your business!</Text>
    </Page>
  </Document>
);


export default InvoicePDFGenerator;
