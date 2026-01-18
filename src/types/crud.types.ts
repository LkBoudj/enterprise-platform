import { OrderType } from '.';
export type SearchType = string | null | undefined;
export interface ICrudController<T> {
  // Data
  records: T[];
  total: number;
  isLoading: boolean;
  
  // State
  page: number;
  limit: number;
  filters: any;
  
  // Actions
  actions: {
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setSearch: (query: SearchType) => void;
    setOrder: (sortBy: string, order: OrderType) => void;
    setVisibleColumns: (cols: string[]) => void;
    setInternalSelected: (records: T[]) => void;
    // Add other actions from useDataTableState if needed
    clearSelection: () => void;
    resetFilters: () => void;
    resetColumns: () => void;
    toggleColumn: (key: string) => void;
  };

  // View state
  visibleColumns: string[];
  internalSelected: T[];
  columns: any[]; // Table columns
  allColumns: any; 

  // Modals (open/close control)
  createModal: {
    opened: boolean;
    open: () => void;
    close: () => void;
  };
  editModal: {
    opened: boolean;
    close: () => void;
    item: T | null; // Use generic 'item' instead of 'user'
    onEdit: (item: T) => void;
  };
  error: unknown;
}