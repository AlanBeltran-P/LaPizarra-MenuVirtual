import { Component, computed, input } from '@angular/core';
import { formatIsoDate } from '../../../../shared/utils/date';

@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.html',
  styleUrl: './menu-footer.css',
})
export class MenuFooter {
  readonly instagram = input.required<string>();
  readonly updatedAt = input.required<string>();

  protected readonly instagramUrl = computed(() => `https://www.instagram.com/${this.instagram()}/`);
  protected readonly updatedLabel = computed(() => formatIsoDate(this.updatedAt()));
}
