export interface CollectionTypeSummary {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  count: number;
}

export interface CollectionWithTypes {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  // Item types used in the collection, most-used first.
  types: CollectionTypeSummary[];
}

export interface CollectionStats {
  total: number;
  favorites: number;
}
