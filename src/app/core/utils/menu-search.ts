import { Category, MenuItem } from '../models/menu.model';

/** Busca en nombre, descripción y variantes de todos los productos. */
export function searchProducts(categories: Category[], query: string): MenuItem[] {
  const term = normalize(query);
  return categories
    .flatMap((category) => category.items)
    .filter((item) => matches(item, term));
}

function matches(item: MenuItem, term: string): boolean {
  const text = [item.name, item.description ?? '', ...(item.variants ?? [])].join(' ');
  return normalize(text).includes(term);
}

/** Minúsculas y sin tildes: "Rúcula" → "rucula". */
function normalize(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}
