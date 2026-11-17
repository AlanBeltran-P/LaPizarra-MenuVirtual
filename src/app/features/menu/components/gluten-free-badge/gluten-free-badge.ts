import { Component } from '@angular/core';

@Component({
  selector: 'app-gluten-free-badge',
  template: '<span class="badge">Sin TACC</span>',
  styles: `
    :host {
      display: inline-flex;
      align-self: flex-start;
    }

    .badge {
      padding: 3px 10px;
      border-radius: 999px;
      background: #2e7d32;
      color: #fff;
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      box-shadow: var(--shadow-sm);
    }
  `,
})
export class GlutenFreeBadge {}
