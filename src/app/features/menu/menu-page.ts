import { Component, ElementRef, computed, inject, input, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category, MenuItem } from '../../core/models/menu.model';
import { MenuService } from '../../core/services/menu.service';
import { searchProducts } from '../../core/utils/menu-search';
import { SwipeDirective } from '../../shared/directives/swipe.directive';
import { CategoryNav } from './components/category-nav/category-nav';
import { CategorySection } from './components/category-section/category-section';
import { LocalNotes } from './components/local-notes/local-notes';
import { MenuFooter } from './components/menu-footer/menu-footer';
import { MenuHeader } from './components/menu-header/menu-header';
import { ProductModal } from './components/product-modal/product-modal';
import { PromoBanner } from './components/promo-banner/promo-banner';
import { SearchBox } from './components/search-box/search-box';

@Component({
  selector: 'app-menu-page',
  imports: [
    MenuHeader, PromoBanner, SearchBox, CategoryNav, CategorySection,
    LocalNotes, MenuFooter, ProductModal, SwipeDirective,
  ],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.css',
  host: { '(window:popstate)': 'onHistoryBack()' },
})
export class MenuPage {
  /** Llega desde la URL: ?categoria=vinos */
  readonly categoria = input<string>();

  protected readonly menu = inject(MenuService).menu;
  private readonly router = inject(Router);
  protected readonly selectedProduct = signal<MenuItem | null>(null);
  protected readonly searchQuery = signal('');
  private readonly catalog = viewChild<ElementRef<HTMLElement>>('catalog');

  private readonly categories = computed(() =>
    this.menu.hasValue() ? this.menu.value().categories : [],
  );

  /** Categoría de la URL; si no hay o no existe, la primera. */
  protected readonly activeCategory = computed(
    () => this.categories().find((category) => category.id === this.categoria()) ?? this.categories()[0],
  );

  /** Resultados de búsqueda armados como una categoría, para reusar la grilla. */
  protected readonly searchResults = computed<Category | null>(() => {
    const query = this.searchQuery().trim();
    if (!query) {
      return null;
    }
    return {
      id: 'busqueda',
      name: `Resultados para “${query}”`,
      items: searchProducts(this.categories(), query),
    };
  });

  protected readonly visibleCategory = computed(() => this.searchResults() ?? this.activeCategory());

  /** Mientras se busca, ninguna categoría queda marcada. */
  protected readonly activeNavId = computed(() =>
    this.searchResults() ? '' : (this.activeCategory()?.id ?? ''),
  );

  protected selectCategory(id: string): void {
    this.searchQuery.set('');
    this.router.navigate([], { queryParams: { categoria: id }, replaceUrl: true });
    this.scrollToCatalogTop();
  }

  protected showNextCategory(): void {
    this.moveCategory(1);
  }

  protected showPreviousCategory(): void {
    this.moveCategory(-1);
  }

  /** Abre el modal y agrega una entrada al historial para que "atrás" lo cierre. */
  protected openProduct(item: MenuItem): void {
    this.selectedProduct.set(item);
    history.pushState({ ...history.state, productModal: true }, '');
  }

  /** Se cerró desde el modal (✕, Esc o fondo): saca la entrada del historial. */
  protected onModalClosed(): void {
    this.selectedProduct.set(null);
    if (history.state?.productModal) {
      history.back();
    }
  }

  /** Botón "atrás" del celular o del navegador. */
  protected onHistoryBack(): void {
    this.selectedProduct.set(null);
  }

  /** +1 = siguiente categoría, -1 = anterior. */
  private moveCategory(step: number): void {
    const current = this.activeCategory();
    if (this.searchResults() || !current) {
      return;
    }
    const categories = this.categories();
    const next = categories[categories.indexOf(current) + step];
    if (next) {
      this.selectCategory(next.id);
    }
  }

  /** Si el usuario había bajado, vuelve al inicio del catálogo. */
  private scrollToCatalogTop(): void {
    const catalog = this.catalog()?.nativeElement;
    if (catalog && catalog.getBoundingClientRect().top < 0) {
      catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
