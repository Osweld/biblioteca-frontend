import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Miembro } from '../../miembros.interface';

@Component({
  selector: 'app-ver-miembro-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-miembro-modal.component.html',
  styleUrl: './ver-miembro-modal.component.css'
})
export class VerMiembroModalComponent {
@Input() miembro?: Miembro;
}
