// useDataTableState.ts
import { useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
;
import { OrderType } from '@/components/ui/globaDataTable/GlobalDataTable';
import { parseFilters, serializeFilters } from '@/utils/url-params';
import { IBaseFilter } from '@/types';
import { SearchType } from '@/types/crud.types';

export type UseDataTableStateOptions<TFilters extends IBaseFilter, TColumnKey> = {
  initialFilters: TFilters;
  defaultVisibleColumns: TColumnKey[];
};

export function useDataTableState<TSelected, TFilters extends IBaseFilter, TColumnKey>(
  opts: UseDataTableStateOptions<TFilters, TColumnKey>
) {
  const { initialFilters, defaultVisibleColumns } = opts;
 

  const [searchParams, setSearchParams] = useSearchParams();
  
  
  const filters = useMemo(() => {
    return parseFilters<TFilters>(searchParams, initialFilters);
  }, [searchParams, initialFilters]);

  const [internalSelected, setInternalSelected] = useState<TSelected[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<TColumnKey[]>(defaultVisibleColumns);

  const updateFilters = useCallback((patch: Partial<TFilters>) => {
   
    setSearchParams((prevParams) => {
      const current = parseFilters(prevParams, initialFilters);
      const updated = { ...current, ...patch };
      
      if (patch.page === undefined && (patch.q !== undefined || patch.sortBy !== undefined)) {
        updated.page = 1;
      }
      
      return serializeFilters(updated);
    }, { replace: true });
  }, [initialFilters, setSearchParams]);

  const actions = useMemo(() => {
    return {
      updateFilters,
      setSearch: (q: SearchType) => updateFilters({ q } as Partial<TFilters>),
      setPage: (page: number) => updateFilters({ page } as Partial<TFilters>),
      setLimit: (limit: number) => updateFilters({ limit, page: 1 } as Partial<TFilters>),
      setOrder: (sortBy: string, order: OrderType) => updateFilters({ sortBy, order } as Partial<TFilters>),
      
      resetFilters: () => setSearchParams(serializeFilters(initialFilters)),
      
      setInternalSelected,
      setVisibleColumns,
      clearSelection: () => setInternalSelected([]),
      resetColumns: () => setVisibleColumns(defaultVisibleColumns),
      
      toggleColumn: (key: TColumnKey) => {
        setVisibleColumns((prev) =>
          prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
        );
      },
    };
  }, [updateFilters, initialFilters, setSearchParams, defaultVisibleColumns]);

  return {
    internalSelected,
    visibleColumns,
    filters,
    actions,
  };
}