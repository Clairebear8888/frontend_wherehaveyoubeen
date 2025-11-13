export interface Country {
  id: number;
  name: string;
  countryCode: string;
  favoriteCity: string | null;
  favoriteFood: string | null;
  visitedDate: string | null;
  flagEmoji: string | null;
  createdAt: string;
  updatedAt: string;
  memories?: Memory[];
}

export interface Memory {
  id: number;
  title: string;
  description: string;
  location: string | null;
  countryId: number;
  country?: Country;
  createdAt: string;
  updatedAt: string;
}
