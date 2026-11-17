import { Component, computed, input, output } from '@angular/core';
import { Category, MenuItem } from '../../../../core/models/menu.model';
import { ArPricePipe } from '../../../../shared/pipes/ar-price.pipe';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-category-section',
  imports: [ProductCard, ArPricePipe],
  templateUrl: './category-section.html',
  styleUrl: './category-section.css',
})
export class CategorySection {
  readonly category = input.required<Category>();
  readonly productSelected = output<MenuItem>();

  protected readonly countLabel = computed(() => {
    const count = this.category().items.length;
    return count === 1 ? '1 producto' : `${count} productos`;
  });
}
