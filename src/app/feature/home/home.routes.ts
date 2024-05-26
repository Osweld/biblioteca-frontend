import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { MaterialesComponent } from "./pages/materiales/materiales.component";


export const HOME_ROUTES: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', title: 'Inicio', component: HomeComponent },
  { path: 'materiales', title: 'Materiales', component: MaterialesComponent }
];
