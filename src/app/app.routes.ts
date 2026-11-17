import { Routes } from '@angular/router';
import { MenuPage } from './features/menu/menu-page';

export const routes: Routes = [
  { path: '', component: MenuPage, title: 'Pizzarra | Menú' },
  {
    path: 'qr',
    loadComponent: () => import('./features/qr/qr-page').then((m) => m.QrPage),
    title: 'Pizzarra | QR',
  },
  { path: '**', redirectTo: '' },
];
