import { Component, Input } from '@angular/core';
import { Material } from '../../materiales.interface';

@Component({
  selector: 'app-ver-material-modal',
  standalone: true,
  imports: [],
  templateUrl: './ver-material-modal.component.html',
  styleUrl: './ver-material-modal.component.css'
})
export class VerMaterialModalComponent {
  @Input() material?: Material;
}
