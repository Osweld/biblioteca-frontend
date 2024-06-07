import { Component, Input, inject } from '@angular/core';
import { Autor } from '../../autores.interface';
import { AutoresService } from '../../autores.service';
import { SharedService } from '../../../../shared/shared.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-eliminar-autor-modal',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-autor-modal.component.html',
  styleUrl: './eliminar-autor-modal.component.css'
})
export class EliminarAutorModalComponent {

  public autorService = inject(AutoresService);
  public sharedService = inject(SharedService);

  @Input() autor?:Autor;


  deleteAutor(){
    if(this.autor){
      this.autorService.deleteAutor(this.autor.id).subscribe({
        next: (data) => {
          this.sharedService.showAlert('success','Autor eliminado correctamente')
          const modalElement = document.getElementById('eliminarAutorModal');
            if (modalElement) {
              const modal = Modal.getInstance(modalElement);
              modal!.hide();
            }
        },
        error: (error) => {

          this.sharedService.showAlert('danger','Error al eliminar el autor, es posible que tenga material educativo asociados')
          const modalElement = document.getElementById('eliminarAutorModal');
          if (modalElement) {
            const modal = Modal.getInstance(modalElement);
            modal!.hide();
          }
        }
      });
    }
  }

}
