import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Customer, CustomerReport, Dvd, DvdReport, Rental, RentalSummary, ReportSummary } from '../../modals/customer';
import { ReportService } from '../../../Services/report.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import bootstrap, { Modal } from 'bootstrap';
import { CustomerService } from '../../../Services/Customer/customer.service';
import { ManagerService } from '../../../Services/Manager/manager.service';
import { RentalService } from '../../../Services/Customer/rental.service';

interface SelectedReport {
  title: string;
  columns: string[];
  data: any[][];
}


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  @ViewChild('reportContent', { static: false }) reportContent!: ElementRef;
  dvds: Dvd[] = [];
  rentals: Rental[] = [];
  customers: Customer[] = [];
  reportGenerated: boolean = false;

  constructor(private customerService: CustomerService,private dvdService: ManagerService,private rentalService: RentalService) { }

  ngOnInit(): void {
    // Initialization if needed
  }

  generateReport(): void {
    // Fetching DVD, Rental, and Customer data
    this.dvdService.GetAllDvds().subscribe((dvdData: Dvd[]) => {
      this.dvds = dvdData;
    });

    this.rentalService.getAllRentals().subscribe((rentalData: Rental[]) => {
      this.rentals = rentalData;
    });

    this.customerService.GetAllCustomer().subscribe((customerData: Customer[]) => {
      this.customers = customerData;
      this.reportGenerated = true;  // Mark the report as generated
    });
  }

  getCustomerNameById(customerId: string): string {
    const customer = this.customers.find(c => c.id === customerId);
    return customer ? customer.firstName : 'Unknown';
  }

  printReport(): void {
    const content = this.reportContent.nativeElement;
    const printWindow = window.open('', '', 'width=800, height=600');
    printWindow!.document.write('<html><head><title>Print Report</title></head><body>');
    printWindow!.document.write(content.innerHTML);
    printWindow!.document.write('</body></html>');
    printWindow!.document.close();
    printWindow!.print();
  }

  downloadReport(): void {
    const content = this.reportContent.nativeElement;
    const blob = new Blob([content.innerHTML], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
