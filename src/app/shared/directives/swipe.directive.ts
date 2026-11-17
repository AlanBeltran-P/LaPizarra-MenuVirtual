import { Directive, output } from '@angular/core';

const MIN_DISTANCE = 60;

/** Distancia al borde donde el sistema usa el gesto de "atrás". */
const EDGE_MARGIN = 24;

/** Emite swipeLeft / swipeRight cuando se desliza el dedo en horizontal. */
@Directive({
  selector: '[appSwipe]',
  host: {
    '(touchstart)': 'onTouchStart($event)',
    '(touchend)': 'onTouchEnd($event)',
  },
})
export class SwipeDirective {
  readonly swipeLeft = output<void>();
  readonly swipeRight = output<void>();
  private start: { x: number; y: number } | null = null;

  protected onTouchStart(event: TouchEvent): void {
    const touch = event.touches[0];
    const nearEdge = touch.clientX < EDGE_MARGIN || touch.clientX > window.innerWidth - EDGE_MARGIN;
    this.start = nearEdge ? null : { x: touch.clientX, y: touch.clientY };
  }

  protected onTouchEnd(event: TouchEvent): void {
    if (!this.start) {
      return;
    }
    const touch = event.changedTouches[0];
    const dx = touch.clientX - this.start.x;
    const dy = touch.clientY - this.start.y;
    this.start = null;

    const isHorizontal = Math.abs(dx) >= MIN_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.5;
    if (!isHorizontal) {
      return;
    }
    if (dx < 0) {
      this.swipeLeft.emit();
    } else {
      this.swipeRight.emit();
    }
  }
}
