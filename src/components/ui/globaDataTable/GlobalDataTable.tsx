import { useMemo } from 'react';
import { DataTable, type DataTableColumn, type DataTableSortStatus } from 'mantine-datatable';
import { Card, ScrollArea } from '@mantine/core';

export type OrderType = 'asc' | 'desc';

export interface GlobalTableProps<T> {
  records: T[];
  columns: DataTableColumn<T>[];
  fetching?: boolean;
  pinLastColumn?: boolean;
  page?: string | number;
  limit?: string | number;
  total?: string | number;
  setPage?: (page: number) => void;
  setLimit?: (limit: number) => void;
  recordsPerPageOptions?: number[];

  // Controlled sorting props
  sortBy?: keyof T | string; // string to allow accessors not directly on T (e.g., nested or custom)
  order?: OrderType;
  onSortingChange?: (sortBy: string, order: OrderType) => void;

  // Selection
  selectedRecords?: T[];
  onSelectedRecordsChange?: (records: T[]) => void;

  height?: number;
}

export function GlobalDataTable<T>({
  records,
  columns,
  fetching = false,
  page,
  limit,
  total,
  setPage,
  setLimit,
  recordsPerPageOptions = [5, 10, 15, 20],
  sortBy: externalSortBy,
  order: externalOrder = 'asc',
  onSortingChange,
  selectedRecords,
  onSelectedRecordsChange,
}: GlobalTableProps<T>) {
  // Controlled sort status
  const sortStatus: DataTableSortStatus<T> = useMemo(
    () => ({
      columnAccessor: externalSortBy as any, // mantine-datatable accepts string
      direction: externalOrder,
    }),
    [externalSortBy, externalOrder]
  );

  console.log(sortStatus, externalSortBy);
  return (
    <Card withBorder radius="md" p="xs">
      <ScrollArea style={{ width: '100%' }} type="auto">
        <DataTable
          records={records}
          columns={columns}
          fetching={fetching}
          page={Number(page)}
          onPageChange={setPage || (() => {})}
          onRecordsPerPageChange={setLimit || (() => {})}
          recordsPerPageOptions={recordsPerPageOptions}
          totalRecords={Number(total)}
          recordsPerPage={Number(limit)}
          withTableBorder
          borderRadius="sm"
          withColumnBorders
          minHeight={150}
          striped
          highlightOnHover
          style={{ fontSize: 14 }}
          sortStatus={sortStatus}
          onSortStatusChange={(newSortStatus) => {
            onSortingChange?.(newSortStatus.columnAccessor as string, newSortStatus.direction);
          }}
          // Selection
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={onSelectedRecordsChange}
        />
      </ScrollArea>
    </Card>
  );
}
