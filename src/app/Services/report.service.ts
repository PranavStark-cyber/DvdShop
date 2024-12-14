import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerReport, DvdReport, RentalSummary, ReportSummary } from '../component/modals/customer';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'https://localhost:7067/api/reports'; // Base API URL

  constructor(private http: HttpClient) {}

   // Fetch reports summary
   getReportsSummary(startDate: string, endDate: string): Observable<ReportSummary> {
    return this.http.get<ReportSummary>(`${this.apiUrl}/summary?startDate=${startDate}&endDate=${endDate}`);
  }
}
