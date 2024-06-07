import { Component, ViewChild, inject } from '@angular/core';
import { Autor, Categoria, EstadoMaterial, Idioma, Material, MaterialPage, SelectsMaterial } from '../../materiales.interface';
import { Pagination } from '../../../../shared/shared.interface';
import { MaterialService } from '../../material.service';
import { SharedService } from '../../../../shared/shared.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { VerMaterialModalComponent } from '../../../home/components/ver-material-modal/ver-material-modal.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { Modal } from 'bootstrap';
import { AgregarEditarMaterialModalComponent } from '../../components/agregar-editar-material-modal/agregar-editar-material-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, PaginationComponent, VerMaterialModalComponent, AlertComponent, RouterModule, AgregarEditarMaterialModalComponent],
  templateUrl: './material.component.html',
  styleUrl: './material.component.css'
})
export default class MaterialComponent {

  @ViewChild('materialDetailModal') materialDetailModal: any;
  selectedMaterial?: Material;

  @ViewChild('agregarEditarMaterialModal') agregarEditarMaterialModal: any;

  materialPage!: MaterialPage;
  estadoMaterial: EstadoMaterial[] = [];
  autores: Autor[] = [];
  categorias: Categoria[] = [];
  idiomas: Idioma[] = [];

  private materialsSub!: Subscription;
  private materialUpdatedSub!: Subscription;

  pagina: Pagination = {
    totalElements: 0,
    totalPages: 0,
    page: 0
  }

  select: SelectsMaterial = {
    autores: this.autores,
    categorias: this.categorias,
    idiomas: this.idiomas,
    estados: this.estadoMaterial
  }

  page: number = 0;
  size: number = 20;
  idIdioma?: number;
  idAutor?: number;
  idCategoria?: number;
  idEstadoMaterial?: number;

  public materialService = inject(MaterialService);
  public sharedService = inject(SharedService);

  id = new FormControl('');
  idEditar = new FormControl('');
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

    this.materialUpdatedSub = this.materialService.getMaterialUpdatedListener()
      .subscribe(() => {
        this.page = 0; // Reinicia la página al aplicar filtros
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
      });


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
        this.id.setValue('');
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

  openModalVer(material: Material) {
    this.selectedMaterial = material;
    const modalElement = document.getElementById('materialDetailModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  openModalAgregar() {
    this.selectedMaterial = undefined;
    this.select = {
      autores: this.autores,
      categorias: this.categorias,
      idiomas: this.idiomas,
      estados: this.estadoMaterial
    }
    const modalElement = document.getElementById('agregarEditarMaterialModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  editarMaterialById() {
    this.materialService.getMaterialById(Number(this.idEditar.value)).subscribe({
      next: material => {
        this.selectedMaterial = material;
        this.select = {
          autores: this.autores,
          categorias: this.categorias,
          idiomas: this.idiomas,
          estados: this.estadoMaterial
        }
        const modalElement = document.getElementById('agregarEditarMaterialModal');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
        this.idEditar.setValue('');
      },
      error: error => {
        this.sharedService.showAlert('danger', 'No se encontró el material con el ID proporcionado');
      }
    });
  }

  openModalEditar(material: Material) {
    this.selectedMaterial = material;
    this.select = {
      autores: this.autores,
      categorias: this.categorias,
      idiomas: this.idiomas,
      estados: this.estadoMaterial
    }
    const modalElement = document.getElementById('agregarEditarMaterialModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }
}
