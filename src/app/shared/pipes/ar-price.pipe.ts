import { Pipe, PipeTransform } from '@angular/core';

const formatter = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });

@Pipe({ name: 'arPrice' })
export class ArPricePipe implements PipeTransform {
  transform(amount: number): string {
    return `$${formatter.format(amount)}`;
  }
}
