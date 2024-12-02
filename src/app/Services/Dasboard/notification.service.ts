import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([
    {
      id: 1,
      title: 'New Project Assigned',
      message: 'You have been assigned to Project X',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      title: 'Meeting Reminder',
      message: 'Team meeting in 30 minutes',
      time: '30 min ago',
      read: false
    },
    {
      id: 3,
      title: 'Task Update',
      message: 'Task "Update Documentation" is due today',
      time: '1 hour ago',
      read: false
    }
  ]);

  notifications$ = this.notifications.asObservable();

  markAsRead(id: number) {
    const updated = this.notifications.value.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    this.notifications.next(updated);
  }

  getUnreadCount() {
    return this.notifications.value.filter(n => !n.read).length;
  }
}



export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}
