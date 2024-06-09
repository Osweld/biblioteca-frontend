import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    {
      title: 'Amplia Colección de Libros',
      description: 'Nuestra biblioteca cuenta con una vasta colección de libros en diversas áreas del conocimiento.'
    },
    {
      title: 'Acceso a Recursos Digitales',
      description: 'Disponemos de una gran variedad de recursos digitales accesibles desde cualquier lugar.'
    },
    {
      title: 'Ambiente de Estudio Cómodo',
      description: 'Ofrecemos espacios de estudio tranquilos y cómodos para todos nuestros usuarios.'
    }
  ];
}
