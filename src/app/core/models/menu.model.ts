export interface Price {
  label?: string;
  amount: number;
  unit?: string;
}

export interface Extra {
  name: string;
  amount: number;
  unit?: string;
}

export interface MenuItem {
  id: string;
  number?: number;
  name: string;
  description?: string;
  image?: string;
  prices: Price[];
  variants?: string[];
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  note?: string;
  priceLabels?: string[];
  items: MenuItem[];
  extras?: Extra[];
  extrasTitle?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
}

export interface LocalInfo {
  name: string;
  logo: string;
  city: string;
  instagram: string;
}

export interface Menu {
  local: LocalInfo;
  updatedAt: string;
  notes: string[];
  promotions: Promotion[];
  categories: Category[];
}
