import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumb = new BehaviorSubject<string>('Dashboard');
  breadcrumb$ = this.breadcrumb.asObservable();

  setBreadcrumb(value: string) {
    this.breadcrumb.next(value);
  }
}
