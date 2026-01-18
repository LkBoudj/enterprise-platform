import { useState, useEffect, useCallback } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

export interface UseGlobalFilterLogicProps {
  q?: string;
  setSearch?: (q: string | null | undefined) => void;
  resetFilter?: () => void;
  isFiltered?: boolean;
  debounceMs?: number;
}

export const useGlobalFilterLogic = ({
  q,
  setSearch,
  resetFilter,
  isFiltered = false,
  debounceMs = 300,
}: UseGlobalFilterLogicProps) => {
  // 1. Local State: Immediate feedback for typing
  const [searchValue, setSearchValue] = useState(q || '');

  // 2. Debounce: Delay execution to save performance
  const [debouncedSearch] = useDebouncedValue(searchValue, debounceMs);

  // 3. Sync: Local State -> Parent (URL)
  // Only triggers if the value actually changed to prevent infinite loops
  useEffect(() => {
    if (debouncedSearch !== q) {
      setSearch?.(debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // 4. Sync: Parent (URL) -> Local State
  // Handles external changes like Browser Back Button or URL pasting
  useEffect(() => {
    if (q !== undefined && q !== searchValue) {
      setSearchValue(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  // 5. Handlers
  const handleClear = useCallback(() => {
    setSearchValue('');
    setSearch?.('');
    resetFilter?.();
  }, [setSearch, resetFilter]);

  // 6. UX Logic: Determine if the "Clear" button should pulse/be active
  const hasActiveFilters = !!searchValue || isFiltered;

  return {
    searchValue,
    setSearchValue,
    handleClear,
    hasActiveFilters,
  };
};