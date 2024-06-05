import { SharedService } from './../../../../shared/shared.service';
import { Component, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialesService } from '../../materiales.service';
import { Autor, Categoria, EstadoMaterial, Idioma, Material, MaterialPage } from '../../materiales.interface';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Pagination } from '../../../../shared/shared.interface';
import { VerMaterialModalComponent } from '../../components/ver-material-modal/ver-material-modal.component';
import { Modal } from 'bootstrap';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-materiales',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, PaginationComponent, VerMaterialModalComponent, AlertComponent,RouterModule],
  templateUrl: './materiales.component.html',
  styleUrl: './materiales.component.css'
})
export class MaterialesComponent {

  @ViewChild('materialDetailModal') materialDetailModal: any;
  selectedMaterial?: Material;

  materialPage!: MaterialPage;
  estadoMaterial: EstadoMaterial[] = [];
  autores: Autor[] = [];
  categorias: Categoria[] = [];
  idiomas: Idioma[] = [];

  pagina: Pagination = {
    totalElements: 0,
    totalPages: 0,
    page: 0
  }

  page: number = 0;
  size: number = 5;
  idIdioma?: number;
  idAutor?: number;
  idCategoria?: number;
  idEstadoMaterial?: number;

  public materialService = inject(MaterialesService);
  public sharedService = inject(SharedService);

  id = new FormControl('');
  FilterData = new FormGroup({
    idioma: new FormControl(''),
    categoria: new FormControl(''),
    estado: new FormControl(''),
    autor: new FormControl('')
  });

  constructor() {
    this.loadFilterData();
    this.materialService.getMateriales(this.page, this.size, this.idIdioma, this.idAutor, this.idCategoria, this.idEstadoMaterial)
      .subscribe(
        data => {
          this.materialPage = data;
          this.pagina = {
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            page: data.number
          }
        }
      );


  }

  searchMaterial() {
    this.materialService.getMaterialById(Number(this.id.value)).subscribe({
      next: material => {
        this.selectedMaterial = material;
        const modalElement = document.getElementById('materialDetailModal');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
      },
      error: error => {
        this.sharedService.showAlert('danger', 'No se encontró el material con el ID proporcionado');
      }
    });

  }


  nextPage(page: number) {
    this.materialService.getMateriales(page, this.size, this.idIdioma, this.idAutor, this.idCategoria, this.idEstadoMaterial)
      .subscribe(
        data => {
          this.materialPage = data;
          this.pagina = {
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            page: data.number
          }
        }
      );
  }

  onFilterSubmit() {

    this.idIdioma = Number(this.FilterData.get('idioma')?.value);
    this.idAutor = Number(this.FilterData.get('autor')?.value);
    this.idCategoria = Number(this.FilterData.get('categoria')?.value);
    this.idEstadoMaterial = Number(this.FilterData.get('estado')?.value);

    this.page = 0; // Reinicia la página al aplicar filtros
    this.materialService.getMateriales(this.page, this.size, this.idIdioma, this.idAutor, this.idCategoria, this.idEstadoMaterial)
      .subscribe(
        data => {
          console.log(data);
          this.materialPage = data;
          this.pagina = {
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            page: data.number
          }
        }
      );
  }

  loadFilterData() {
    this.materialService.getEstadoMaterial().subscribe({
      next: estadoMaterial => {
        this.estadoMaterial = estadoMaterial;
      }
    });

    // Cargar otros datos para los selectores
    this.materialService.getAutores().subscribe({
      next: autores => {
        this.autores = autores;
      }
    });

    this.materialService.getCategorias().subscribe({
      next: categorias => {
        this.categorias = categorias;
      }
    });

    this.materialService.getIdiomas().subscribe({
      next: idiomas => {
        this.idiomas = idiomas;
      }
    });
  }

  openModal(material: Material) {
    this.selectedMaterial = material;
    const modalElement = document.getElementById('materialDetailModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

}
