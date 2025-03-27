import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

// Register Helvetica font (it's built into PDF)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica', fontWeight: 400 },
    { src: 'Helvetica-Bold', fontWeight: 700 }
  ]
});

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

interface RenderProps {
  blob?: Blob;
  url?: string;
  loading: boolean;
  error?: Error;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
    backgroundColor: "#f8f8f8"
  } as Style,
  header: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 20,
    color: "#222"
  } as Style,
  businessInfo: {
    textAlign: "left",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    borderBottomStyle: "solid"
  } as Style,
  section: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5
  } as Style,
  label: {
    fontSize: 10,
    fontWeight: 700,
    color: "#666"
  } as Style,
  value: {
    fontSize: 12,
    marginBottom: 3
  } as Style,
  tableHeader: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 5,
    fontSize: 10,
    fontWeight: 700
  } as Style,
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderBottomStyle: "solid",
    paddingTop: 5,
    paddingBottom: 5
  } as Style,
  cell: {
    flex: 1,
    fontSize: 12,
    textAlign: "center"
  } as Style,
  boldText: {
    fontWeight: 700,
    fontSize: 16
  } as Style
});

const InvoicePDF: React.FC<{ data: InvoiceData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Invoice</Text>

      <View style={styles.section}>
        <Text style={styles.boldText}>{data.business_name}</Text>
        <Text style={styles.value}>{data.business_address}</Text>
        <Text style={styles.value}>GST No: {data.gst_number}</Text>
        <Text style={styles.value}>Proprietor: {data.proprietor_name}</Text>
        <Text style={styles.value}>Contact: {data.contact_number}</Text>
        <Text style={styles.value}>Email: {data.business_email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Invoice Number</Text>
        <Text style={styles.value}>{data.invoice_number}</Text>

        <Text style={styles.label}>Invoice Date</Text>
        <Text style={styles.value}>{data.invoice_date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Customer Name</Text>
        <Text style={styles.value}>{data.customer_name}</Text>

        <Text style={styles.label}>Customer Phone</Text>
        <Text style={styles.value}>{data.customer_phone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>From</Text>
        <Text style={styles.value}>{data.from_location}</Text>

        <Text style={styles.label}>To</Text>
        <Text style={styles.value}>{data.to_location}</Text>

        <Text style={styles.label}>Distance</Text>
        <Text style={styles.value}>{data.distance_km} km</Text>

        <Text style={styles.label}>Price per Km</Text>
        <Text style={styles.value}>₹{data.price_per_km}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Description</Text>
          <Text style={styles.tableHeader}>Amount (₹)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>Base Amount</Text>
          <Text style={styles.cell}>{data.base_amount.toFixed(2)}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>GST ({data.gst_percentage}%)</Text>
          <Text style={styles.cell}>{data.gst_amount.toFixed(2)}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.cell, styles.boldText]}>Total Amount</Text>
          <Text style={[styles.cell, styles.boldText]}>₹{data.total_amount.toFixed(2)}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export const InvoicePDFDownload: React.FC<{ data: InvoiceData }> = ({ data }) => (
  <PDFDownloadLink document={<InvoicePDF data={data} />} fileName={`invoice-${data.invoice_number}.pdf`}>
    {({ blob, url, loading, error }: RenderProps) => 
      loading ? 'Generating PDF...' : 'Download Invoice'
    }
  </PDFDownloadLink>
);

export { InvoicePDF, type InvoiceData };
