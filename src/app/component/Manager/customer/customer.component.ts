import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Customer } from '../../modals/customer';
import { CustomerService } from '../../../Services/Customer/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {


  customers: any[] = [];
  displayedColumns: string[] = ['nic', 'firstName', 'phoneNumber', 'joinDate'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private customerService: CustomerService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    // After the view initializes, set the paginator and sort properties
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadCustomers(): void {
    this.customerService.GetAllCustomer().subscribe(
      (data) => {
        this.customers = data; // Assuming `data` is an array of customers
        this.dataSource.data = this.customers; // Bind data to table
        console.log(this.customers);
        
      },
      (error) => {
        this.toastr.error('Failed to load Customers.', 'Error');
      }
    );
  }

}
