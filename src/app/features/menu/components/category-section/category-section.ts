import { Component, ElementRef, afterRenderEffect, computed, input, output, viewChild } from '@angular/core';
import { Category, MenuItem } from '../../../../core/models/menu.model';
import { ArPricePipe } from '../../../../shared/pipes/ar-price.pipe';
import { prefersReducedMotion } from '../../../../shared/utils/motion';
import { ProductCard } from '../product-card/product-card';

const EASE_OUT = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

@Component({
  selector: 'app-category-section',
  imports: [ProductCard, ArPricePipe],
  templateUrl: './category-section.html',
  styleUrl: './category-section.css',
})
export class CategorySection {
  readonly category = input.required<Category>();
  readonly productSelected = output<MenuItem>();
  private readonly title = viewChild.required<ElementRef<HTMLElement>>('title');

  protected readonly countLabel = computed(() => {
    const count = this.category().items.length;
    return count === 1 ? '1 producto' : `${count} productos`;
  });

  private readonly categoryId = computed(() => this.category().id);

  constructor() {
    afterRenderEffect(() => {
      this.categoryId();
      this.animateTitle();
    });
  }

  /** El título entra desde la izquierda y la línea roja crece. */
  private animateTitle(): void {
    if (prefersReducedMotion()) {
      return;
    }
    const title = this.title().nativeElement;
    title.animate(
      [{ opacity: 0, transform: 'translateX(-16px)' }, { opacity: 1, transform: 'none' }],
      { duration: 400, easing: EASE_OUT },
    );
    title.animate(
      [{ width: '0px' }, { width: '48px' }],
      { duration: 500, delay: 150, easing: EASE_OUT, fill: 'backwards', pseudoElement: '::after' },
    );
  }
}
