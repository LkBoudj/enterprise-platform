import { useMemo, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { IBaseFilter } from '@/components/ui/globaDataTable/GlobalFilterBar';
import { OrderType } from '@/components';

export type UseDataTableStateOptions<TFilters extends IBaseFilter, TColumnKey> = {
  initialFilters: TFilters;
  defaultVisibleColumns: TColumnKey[];
  debounceMs?: number;
};

export function useDataTableState<TSelected, TFilters extends IBaseFilter, TColumnKey>(
  opts: UseDataTableStateOptions<TFilters, TColumnKey>
) {
  const { initialFilters, defaultVisibleColumns, debounceMs = 400 } = opts;

  // selection (rows)
  const [internalSelected, setInternalSelected] = useState<TSelected[]>([]);

  // visible columns
  const [visibleColumns, setVisibleColumns] = useState<TColumnKey[]>(defaultVisibleColumns);

  // filters
  const [filters, setFilters] = useState<TFilters>(initialFilters);
  const [debouncedFilters] = useDebouncedValue(filters, debounceMs);

  const actions = useMemo(() => {
    return {
      updateFilters: (patch: Partial<TFilters>) => setFilters((prev) => ({ ...prev, ...patch })),
      
      setOrder: (sortBy: string, order: OrderType) => setFilters((prev)=>({...prev,sortBy,order})),
      setSearch: (q: string | null | undefined) =>
        setFilters((prev) => ({ ...prev, q }) as TFilters),
      setPage: (page: number) => setFilters((prev) => ({ ...prev, page }) as TFilters),

      setLimit: (limit: number) => setFilters((prev) => ({ ...prev, limit, page: 1 }) as TFilters),

      setInternalSelected,
      setVisibleColumns,
      setFilters,

      clearSelection: () => setInternalSelected([]),

      resetFilters: () => setFilters(initialFilters),

      resetColumns: () => setVisibleColumns(defaultVisibleColumns),

      resetAll: () => {
        setInternalSelected([]);
        setVisibleColumns(defaultVisibleColumns);
        setFilters(initialFilters);
      },

      toggleColumn: (key: TColumnKey) => {
        setVisibleColumns((prev) =>
          prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
        );
      },
    };
  }, [initialFilters, defaultVisibleColumns]);

  return {
    internalSelected,
    visibleColumns,
    filters,
    debouncedFilters,
    actions,
  };
}

export type UseDataTableStateType = typeof useDataTableState;
