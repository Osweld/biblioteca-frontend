import { SharedService } from './../../shared.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit{
  type: string = 'success';
  text: string = '';
  showAlert: boolean = false;

  public sharedService = inject(SharedService);

  ngOnInit(): void {
    this.sharedService.alertState.subscribe(alert => {
      if (alert) {
        this.type = alert.type;
        this.text = alert.text;
        this.showAlert = true;
      } else {
        this.showAlert = false;
      }
    });
  }
}
