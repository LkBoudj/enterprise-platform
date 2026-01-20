import { PropsWithChildren } from 'react';
import { Stack } from '@mantine/core';
import HeaderPage from '../HeaderPage';
import { GlobalDataTable, GlobalTableProps } from './GlobalDataTable';
import { GlobalFilterBarProps } from './GlobalFilterBar';

// نقوم بتعريف الخصائص التي نريد استثناءها لنتجنب التكرار
type OmittedProps = 'children' | 'rightComponent';

export interface DataTablePageProps<TRecord>
  extends GlobalTableProps<TRecord>, Omit<GlobalFilterBarProps, OmittedProps>, PropsWithChildren {
  title: string;
  headerRight?: React.ReactNode;
  setLimit?: (limit: number) => void;
  // جعلنا التايب أكثر وضوحاً
  renderFilterBar?: (props: GlobalFilterBarProps) => React.ReactNode;
}

export default function DataTablePage<TRecord>(props: DataTablePageProps<TRecord>) {
  const {
    title,
    headerRight,
    renderFilterBar,
    setPage,
    setSearch,
    setLimit,
    visibleColumns, 
    allColumns,
    setVisibleColumns,
    resetFilter,
    q,
    children,
    ...restProps
  } = props;

  return (
    <Stack gap="md">
      <HeaderPage title={title} rightComponent={headerRight} />
      {children}
      {renderFilterBar?.({
        setPage,
        setSearch,
        q,
        visibleColumns,
        allColumns,
        setVisibleColumns,
        resetFilter,
      } as GlobalFilterBarProps)}

      <GlobalDataTable<TRecord> setPage={setPage} setLimit={setLimit} {...restProps} />
    </Stack>
  );
}
