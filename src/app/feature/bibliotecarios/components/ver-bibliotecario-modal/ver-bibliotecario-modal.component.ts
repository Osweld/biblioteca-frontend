import { Component, Input } from '@angular/core';
import { Usuario } from '../../bibliotecario.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-bibliotecario-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-bibliotecario-modal.component.html',
  styleUrl: './ver-bibliotecario-modal.component.css'
})
export class VerBibliotecarioModalComponent {

  @Input() usuario?: Usuario;

}
