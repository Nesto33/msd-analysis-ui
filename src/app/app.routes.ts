import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SettingsComponent } from './pages/settings/settings';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'parametres', component: SettingsComponent },
  { path: '**', redirectTo: '' },
];
