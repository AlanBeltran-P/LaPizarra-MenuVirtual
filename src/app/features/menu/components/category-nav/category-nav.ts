import { Component, ElementRef, afterRenderEffect, input, output, viewChild } from '@angular/core';
import { Category } from '../../../../core/models/menu.model';

@Component({
  selector: 'app-category-nav',
  templateUrl: './category-nav.html',
  styleUrl: './category-nav.css',
})
export class CategoryNav {
  readonly categories = input.required<Category[]>();
  readonly activeId = input('');
  readonly categorySelected = output<string>();
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly indicator = viewChild.required<ElementRef<HTMLElement>>('indicator');

  constructor() {
    afterRenderEffect(() => this.highlightChip(this.activeId()));
  }

  private highlightChip(id: string): void {
    const chip = this.track().nativeElement.querySelector<HTMLElement>(`[data-id="${id}"]`);
    if (!chip) {
      this.hideIndicator();
      return;
    }
    this.moveIndicatorTo(chip);
    this.centerInTrack(chip);
  }

  private hideIndicator(): void {
    this.indicator().nativeElement.style.width = '0px';
  }

  /** Mueve la píldora roja debajo de la categoría activa. */
  private moveIndicatorTo(chip: HTMLElement): void {
    const style = this.indicator().nativeElement.style;
    style.transform = `translate(${chip.offsetLeft}px, ${chip.offsetTop}px)`;
    style.width = `${chip.offsetWidth}px`;
    style.height = `${chip.offsetHeight}px`;
  }

  /** Desplaza la barra para que la categoría activa quede centrada. */
  private centerInTrack(chip: HTMLElement): void {
    const track = this.track().nativeElement;
    const left = chip.offsetLeft - (track.clientWidth - chip.offsetWidth) / 2;
    track.scrollTo({ left, behavior: 'smooth' });
  }
}
