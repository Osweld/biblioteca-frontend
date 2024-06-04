import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private alertSubject = new BehaviorSubject<{ type: string, text: string } | null>(null);
  alertState = this.alertSubject.asObservable();

  showAlert(type: string, text: string) {
    this.alertSubject.next({ type, text });
    setTimeout(() => {
      this.clearAlert();
    }, 5000);
  }

  clearAlert() {
    this.alertSubject.next(null);
  }
}
