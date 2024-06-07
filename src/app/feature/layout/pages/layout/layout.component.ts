import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import Dropdown from 'bootstrap/js/dist/dropdown';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {
  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.initializeDropdown();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.initializeDropdown();
    });
  }

  initializeDropdown() {
    const dropdownElement = document.getElementById('dropdownUser1');
    if (dropdownElement) {
      const dropdown = new Dropdown(dropdownElement);
    }
  }

}



