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
import ColumnSelector, { ColumnOption } from './ColumnSelector';
import { useGlobalFilterLogic } from '@/hooks/use-globalFilterLogic';
import { SearchType } from '@/types/crud.types';


export interface GlobalFilterBarProps extends React.PropsWithChildren {
  q?: string;
  visibleColumns: string[];
  setVisibleColumns?: (cols: string[]) => void;
  allColumns: ColumnOption[];
  rightComponent?: React.ReactNode;
  searchPlaceholder?: string;
  setSearch?: (q: SearchType) => void;
  setPage?: (page: number) => void;
  resetFilter?: () => void;
  isFiltered?: boolean;
}

export function GlobalFilterBar({
  q,
  setSearch,
  resetFilter,
  visibleColumns,
  setVisibleColumns,
  allColumns = [],
  rightComponent,
  children,
  searchPlaceholder = 'Search...',
  isFiltered = false,
}: GlobalFilterBarProps) {
  
  // Logic Abstraction
  const { 
    searchValue, 
    setSearchValue, 
    handleClear, 
    hasActiveFilters 
  } = useGlobalFilterLogic({
    q,
    setSearch,
    resetFilter,
    isFiltered,
  });

  return (
    <Paper withBorder p="sm" radius="md" shadow="sm" mb="md">
      <Group justify="space-between" align="center" gap="sm">
        
        {/* Search Input */}
        <TextInput
          placeholder={searchPlaceholder}
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          rightSection={
            searchValue ? (
              <CloseButton
                aria-label="Clear search"
                onClick={() => setSearchValue('')}
                size="sm"
              />
            ) : null
          }
          radius="md"
          size="sm"
          style={{ flexGrow: 1, maxWidth: 300 }}
        />

        {/* Custom Filters Injection */}
        {children}

        {/* Right Section: Actions & Settings */}
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

          <Tooltip 
            label={hasActiveFilters ? "Clear all filters" : "No active filters"} 
            withArrow 
            position="top"
          >
            <ActionIcon
              onClick={handleClear}
              variant={hasActiveFilters ? "light" : "transparent"} 
              color={hasActiveFilters ? "red" : "gray"}
              size="lg"
              disabled={!hasActiveFilters}
              // UX: Pulse animation to draw attention when filters are active
              className={hasActiveFilters ? "animate-pulse" : "opacity-50"} 
            >
              <IconFilterOff size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Paper>
  );
}