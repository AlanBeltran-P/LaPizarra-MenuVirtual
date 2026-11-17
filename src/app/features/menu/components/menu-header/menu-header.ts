import { Component, input, signal } from '@angular/core';
import { LocalInfo } from '../../../../core/models/menu.model';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.html',
  styleUrl: './menu-header.css',
})
export class MenuHeader {
  readonly local = input.required<LocalInfo>();
  protected readonly logoFailed = signal(false);
}
