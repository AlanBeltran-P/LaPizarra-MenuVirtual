import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Menu } from '../models/menu.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  readonly menu = httpResource<Menu>(() => 'data/menu.json');
}
