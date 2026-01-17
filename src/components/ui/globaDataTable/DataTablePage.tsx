import { Stack } from "@mantine/core";
import HeaderPage from "../HeaderPage";
import { GlobalTableProps, GlobalDataTable } from "./GlobalDataTable";
import { GlobalFilterBarProps } from "./GlobalFilterBar";

export interface DataTablePageProps<TRecord>
  extends GlobalTableProps<TRecord>, Omit<GlobalFilterBarProps, 'children' | 'rightComponent'> {
  title: string;
  headerRight?: React.ReactNode;
  setLimit?: (limit: number) => void;
  renderFilterBar?: ({ setSearch, setPage, ...p }: GlobalFilterBarProps) => React.ReactNode;
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
    ...restProps
  } = props;
  return (
    <Stack>
      <HeaderPage title={title} rightComponent={headerRight} />
      {renderFilterBar?.({
        setPage,
        setSearch,
        q,
        visibleColumns,
        allColumns,
        setVisibleColumns,
        resetFilter,
      })}
      <GlobalDataTable<TRecord> setPage={setPage} setLimit={setLimit} {...restProps} />
    </Stack>
  );
}