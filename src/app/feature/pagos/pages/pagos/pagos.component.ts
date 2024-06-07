import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { PagoPage } from '../../pagos.interface';
import { PagosService } from '../../pagos.service';
import { Pagination } from '../../../../shared/shared.interface';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule,PaginationComponent],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent {
  pagoPage!: PagoPage;

  public pagoService = inject(PagosService);

  pagina: Pagination = {
    totalElements: 0,
    totalPages: 0,
    page: 0
  }

  page: number = 0;
  size: number = 20;


  constructor(){
    this.pagoService.getPagos(this.page, this.size).subscribe({
      next: (data: PagoPage) => {
        this.pagoPage = data;
        this.pagina = {
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          page: data.number
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  nextPage(page: number) {
    this.page = page;
    this.pagoService.getPagos(this.page, this.size).subscribe({
      next: (data: PagoPage) => {
        this.pagoPage = data;
        this.pagina = {
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          page: data.number
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


}
