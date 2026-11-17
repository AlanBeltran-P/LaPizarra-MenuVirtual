import { Component, computed, input, output } from '@angular/core';
import { MenuItem } from '../../../../core/models/menu.model';
import { isGlutenFree } from '../../../../core/utils/menu-item';
import { ArPricePipe } from '../../../../shared/pipes/ar-price.pipe';
import { GlutenFreeBadge } from '../gluten-free-badge/gluten-free-badge';
import { ProductImage } from '../product-image/product-image';

@Component({
  selector: 'app-product-card',
  imports: [ArPricePipe, ProductImage, GlutenFreeBadge],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  readonly item = input.required<MenuItem>();
  readonly selected = output<void>();
  protected readonly glutenFree = computed(() => isGlutenFree(this.item()));
}
