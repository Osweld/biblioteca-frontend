import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../shared.interface';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  constructor() { }
  //<app-paginacion [pagina]="pagina" (selectPage)="nextPage($event)"></app-paginacion>
    @Input() pagina?:Pagination
    @Output() selectPage = new EventEmitter<number>();

    ngOnInit(): void {
    }

    changePage(page:number){
      this.selectPage.emit(page)
    }
}
