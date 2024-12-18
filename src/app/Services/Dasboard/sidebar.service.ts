import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isCollapsed = new BehaviorSubject<boolean>(false);
  isCollapsed$ = this.isCollapsed.asObservable();

  toggleSidebar() {
    this.isCollapsed.next(!this.isCollapsed.value);
  }

  collapse(value: boolean) {
    this.isCollapsed.next(value);
  }
}
