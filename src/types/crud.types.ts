import { OrderType } from '.';
export type SearchType = string | null | undefined;
export interface ICrudController<T> {
  // البيانات
  records: T[];
  total: number;
  isLoading: boolean;
  
  // الحالة
  page: number;
  limit: number;
  filters: any;
  
  // الأفعال (Actions)
  actions: {
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setSearch: (query: SearchType) => void;
    setOrder: (sortBy: string, order: OrderType) => void;
    setVisibleColumns: (cols: string[]) => void;
    setInternalSelected: (records: T[]) => void;
  };

  // حالة العرض
  visibleColumns: string[];
  internalSelected: T[];
  columns: any[]; // أعمدة الجدول
  allColumns: any; 

  // المودالات (التحكم في الفتح والإغلاق)
  createModal: {
    opened: boolean;
    open: () => void;
    close: () => void;
  };
  editModal: {
    opened: boolean;
    close: () => void;
    user: T | null; // سنسميها item في النسخة العامة
  };
}