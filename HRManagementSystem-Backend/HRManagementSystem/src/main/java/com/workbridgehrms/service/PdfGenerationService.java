package com.workbridgehrms.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.workbridgehrms.model.PayrollRecord;
import org.springframework.stereotype.Service;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class PdfGenerationService {

    public ByteArrayInputStream generatePayslipPdf(PayrollRecord record) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("Payslip").setBold().setFontSize(20).setTextAlignment(TextAlignment.CENTER));
        document.add(new Paragraph("Pay Period: " + record.getPayPeriod()).setTextAlignment(TextAlignment.CENTER));
        document.add(new Paragraph("\n"));
        document.add(new Paragraph("Employee Name: " + record.getEmployeeName()));
        document.add(new Paragraph("Employee ID: " + record.getEmployeeId()));
        document.add(new Paragraph("Pay Date: " + record.getPayDate()));
        document.add(new Paragraph("\n"));

        Table table = new Table(UnitValue.createPercentArray(new float[]{50, 50})).useAllAvailableWidth();
        table.addHeaderCell(new Paragraph("Earnings").setBold());
        table.addHeaderCell(new Paragraph("Deductions").setBold());
        table.addCell(new Paragraph(String.format("Gross Pay: %.2f", record.getGrossPay())));
        table.addCell(new Paragraph(String.format("Total Deductions: %.2f", record.getDeductions())));
        document.add(table);
        document.add(new Paragraph("\n"));
        document.add(new Paragraph(String.format("Net Pay: %.2f", record.getNetPay())).setBold().setFontSize(16));
        
        document.close();
        return new ByteArrayInputStream(out.toByteArray());
    }
}