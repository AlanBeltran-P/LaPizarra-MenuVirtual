import { Component, computed, input, signal } from '@angular/core';
import { MenuItem } from '../../../../core/models/menu.model';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.html',
  styleUrl: './product-image.css',
})
export class ProductImage {
  readonly item = input.required<MenuItem>();
  private readonly failedSrc = signal<string | null>(null);

  protected readonly showImage = computed(() => {
    const image = this.item().image;
    return !!image && image !== this.failedSrc();
  });

  /** Primera letra del nombre (ignora símbolos como "#"). */
  protected readonly placeholder = computed(
    () => this.item().name.match(/\p{L}/u)?.[0].toUpperCase() ?? '',
  );

  protected onError(): void {
    this.failedSrc.set(this.item().image ?? null);
  }
}
