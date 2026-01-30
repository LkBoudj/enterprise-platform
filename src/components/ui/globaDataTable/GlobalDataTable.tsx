import { useMemo } from 'react';
import { DataTable, type DataTableColumn, type DataTableSortStatus } from 'mantine-datatable';
import { Box } from '@mantine/core';
import classes from './GlobalDataTable.module.css';
import { IRowContextExpansionProps } from '@/types';

export type OrderType = 'asc' | 'desc';

export interface GlobalTableProps<T> {
  records: T[];
  columns: DataTableColumn<T>[];
  fetching?: boolean;
  page?: string | number;
  limit?: string | number;
  total?: string | number;
  setPage?: (page: number) => void;
  setLimit?: (limit: number) => void;
  recordsPerPageOptions?: number[];
  sortBy?: keyof T | string;
  order?: OrderType;
  onSortingChange?: (sortBy: string, order: OrderType) => void;
  selectedRecords?: T[];
  onSelectedRecordsChange?: (records: T[]) => void;
  height?: number;
  rowExceptionContent?: (params: IRowContextExpansionProps<T>) => React.ReactNode;
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
  rowExceptionContent,
}: GlobalTableProps<T>) {
  const sortStatus: DataTableSortStatus<T> = useMemo(
    () => ({
      columnAccessor: externalSortBy as any,
      direction: externalOrder,
    }),
    [externalSortBy, externalOrder]
  );

  return (
    <Box className={classes.tableWrapper}>
      <DataTable
        /* التنسيقات العصرية */
        withTableBorder={false}
        withColumnBorders={false} // إزالة الخطوط لزيادة النظافة البصرية
        className={classes.root}
        verticalSpacing="md" // زيادة الـ Padding الرأسي للأسطر
        horizontalSpacing="lg" // زيادة الـ Padding الأفقي
        records={records}
        columns={columns}
        fetching={fetching}
        // الترقيم (Pagination)
        page={Number(page)}
        onPageChange={setPage || (() => { })}
        onRecordsPerPageChange={setLimit || (() => { })}
        recordsPerPageOptions={recordsPerPageOptions}
        totalRecords={Number(total)}
        recordsPerPage={Number(limit)}
        // الثيم المخصص
        borderRadius="lg"
        minHeight={150}
        sortStatus={sortStatus}
        onSortStatusChange={(newSortStatus) => {
          onSortingChange?.(newSortStatus.columnAccessor as string, newSortStatus.direction);
        }}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={onSelectedRecordsChange}
        rowClassName={classes.row}
        rowExpansion={rowExceptionContent ? {content: rowExceptionContent} : undefined}
      />
    </Box>
  );
}
