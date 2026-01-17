import { useEffect, useState } from 'react';
import { IconFilterOff, IconSearch } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  CloseButton,
  Divider,
  Group,
  Paper,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import ColumnSelector, { ColumnOption } from './ColumnSelector';
import { OrderType } from './GlobalDataTable'; // Ensure path is correct

export interface IBaseFilter {
  page: number;
  limit: number;
  q?: string;
  sortBy?: string;
  order?: OrderType;
  [key: string]: any;
}

export const INITIAL_FILTERS: IBaseFilter = {

  page: 1,

  limit: 10,

  q: '',

  sortBy: undefined,

  order: undefined,

};

export interface GlobalFilterBarProps extends React.PropsWithChildren {
  q?:string
  visibleColumns: string[];
  setVisibleColumns?: (cols: string[]) => void;
  allColumns: ColumnOption[];
  rightComponent?: React.ReactNode;
  searchPlaceholder?: string;
  setSearch?: (q: string | null | undefined) => void,
  setPage?: (page: number) => void
  resetFilter?: () => void; // Fixed typo: reest -> reset
}

export function GlobalFilterBar({
  q,
  setSearch,
  setPage,
  resetFilter,
  visibleColumns,
  setVisibleColumns,
  allColumns = [],
  rightComponent,
  children,
  searchPlaceholder = 'Search...',
}: GlobalFilterBarProps) {

  // 1. LOCAL STATE: Handles the input value immediately (User sees typing instantly)
  const [searchValue, setSearchValue] = useState(q || '');
  
  // 2. DEBOUNCE: Waits 300ms after typing stops before telling the Parent to filter
  const [debouncedSearch] = useDebouncedValue(searchValue, 300);

  // 3. EFFECT: When debounced value changes, update Parent Filters
  useEffect(() => {
    // Prevent infinite loops or unnecessary updates
    if (debouncedSearch !== q) {
      setSearch?.(debouncedSearch)
      setPage?.(1)
    }
  }, [debouncedSearch]);

  // 4. EFFECT: External Reset Support
  // If the parent wipes the filters (e.g. via resetFilter button), 
  // we must update our local input state to match.
  useEffect(() => {
    setSearchValue(q || '');
  }, [q]);

  const clearFilter = ()=>{
    setSearchValue('')
    resetFilter?.()
  }
  return (
    <Paper withBorder p="sm" radius="md" shadow="sm" mb="md">
      <Group justify="space-between" align="center" gap="sm">
        
        {/* LEFT SIDE: Search Bar */}
        <TextInput
          placeholder={searchPlaceholder}
          leftSection={<IconSearch size={16} stroke={1.5} />}
          // Bind to LOCAL state, not parent state
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)}
          rightSection={
            searchValue ? (
              <CloseButton
                aria-label="Clear search"
                onClick={() => setSearchValue('')} // Clear local state directly
                size="sm"
              />
            ) : null
          }
          radius="md"
          size="sm"
          style={{ flexGrow: 1, maxWidth: 300 }}
        />

        {/* MIDDLE: Custom Filters (Selects, DatePickers, etc.) */}
        {children}

        {/* RIGHT SIDE: Actions & Columns */}
        <Group gap="xs">
          {rightComponent && (
            <>
              <Divider orientation="vertical" style={{ height: 20 }} />
              <Box>{rightComponent}</Box>
            </>
          )}

          <ColumnSelector
            columns={allColumns}
            value={visibleColumns}
            onChange={setVisibleColumns || (() => {})}
            minSelected={1}
          />

          <Tooltip label="Reset all filters" withArrow position="top">
            <ActionIcon 
              onClick={clearFilter} 
              variant="subtle" 
              color="gray"
              size="lg"
            >
              <IconFilterOff size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Paper>
  );
}