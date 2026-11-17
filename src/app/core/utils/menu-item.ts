import { MenuItem } from '../models/menu.model';

const GLUTEN_FREE_TAG = 'sin-tacc';

export function isGlutenFree(item: MenuItem): boolean {
  return item.tags?.includes(GLUTEN_FREE_TAG) ?? false;
}
