// src/components/ui/globaDataTable/types.ts

export type OrderType = 'asc' | 'desc';

export interface IBaseFilter {
  page: number;
  limit: number;
  q?: string;
  sortBy?: string;
  order?: OrderType;
  [key: string]: any; // Index signature for custom filters
}

export const INITIAL_FILTERS: IBaseFilter = {
  page: 1,
  limit: 10,
  q: '',
  sortBy: "desc",
  order: undefined,
};

export interface ApiResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

export interface IRowContextExpansionProps<T> {

    record: T;
    index: number;
    collapse: () => void;

}