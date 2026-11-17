import { Component, input } from '@angular/core';
import { Promotion } from '../../../../core/models/menu.model';

@Component({
  selector: 'app-promo-banner',
  templateUrl: './promo-banner.html',
  styleUrl: './promo-banner.css',
})
export class PromoBanner {
  readonly promotions = input.required<Promotion[]>();
}
