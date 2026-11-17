import { Component, ElementRef, afterRenderEffect, computed, input, output, viewChild } from '@angular/core';
import { MenuItem } from '../../../../core/models/menu.model';
import { isGlutenFree } from '../../../../core/utils/menu-item';
import { ArPricePipe } from '../../../../shared/pipes/ar-price.pipe';
import { GlutenFreeBadge } from '../gluten-free-badge/gluten-free-badge';
import { ProductImage } from '../product-image/product-image';

@Component({
  selector: 'app-product-modal',
  imports: [ArPricePipe, ProductImage, GlutenFreeBadge],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css',
})
export class ProductModal {
  readonly item = input<MenuItem | null>(null);
  readonly closed = output<void>();
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly glutenFree = computed(() => {
    const item = this.item();
    return !!item && isGlutenFree(item);
  });

  constructor() {
    afterRenderEffect(() => this.syncDialog(this.item()));
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  /** Cierra si se toca el fondo oscuro (fuera del contenido). */
  protected closeOnBackdrop(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) {
      this.close();
    }
  }

  private syncDialog(item: MenuItem | null): void {
    const dialog = this.dialog().nativeElement;
    if (item && !dialog.open) {
      dialog.showModal();
    }
    if (!item && dialog.open) {
      dialog.close();
    }
  }
}
