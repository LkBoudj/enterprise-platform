import { useMemo } from 'react';
import { DataTableColumn } from 'mantine-datatable';
import { Badge, Group, Text } from '@mantine/core';
import { ColumnOption } from '@/components/ui/globaDataTable/ColumnSelector';
import { GlobalActionMenu } from '@/components/ui/globaDataTable/GlobalActionMenu';
import { ProductType } from '../validation/product.schema';

// Static Configuration for Status Badges
const STATUS_COLORS: Record<ProductType['status'], string> = {
  'In Stock': 'green',
  'Out of Stock': 'red',
};

// Column options for visibility selection
const productColumnOptions: ColumnOption[] = [
  { value: 'code', label: 'Code' }, // Changed from 'id' to 'code'
  { value: 'title', label: 'Title' },
  { value: 'price', label: 'Price' },
  { value: 'stock', label: 'Stock' },
  { value: 'category', label: 'Category' },
  { value: 'status', label: 'Status' },
];

interface UseProductColumnsProps {
  visibleColumns: string[];
  onView?: (product: ProductType) => void;
  onEdit?: (product: ProductType) => void;
  onDelete?: (product: ProductType) => void;
}

// Custom Hook to define product table columns
export const useProductColumns = ({ visibleColumns, onView, onEdit, onDelete }: UseProductColumnsProps) => {
  const columns: DataTableColumn<ProductType>[] = useMemo(() => {
    return [
      {
        accessor: 'code', // Changed from 'id' to 'code'
        title: 'Product Code', // Changed from 'ID' to 'Product Code'
        hidden: !visibleColumns.includes('code'),
        sortable: true,
      },
      {
        accessor: 'title',
        title: 'Product Title',
        hidden: !visibleColumns.includes('title'),
        sortable: true,
        render: ({ title }) => (
          <Text size="sm" fw={500} truncate>{title}</Text>
        ),
      },
      {
        accessor: 'price',
        title: 'Price',
        hidden: !visibleColumns.includes('price'),
        sortable: true,
        width: 100,
        render: ({ price }) => (
          <Text size="sm">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}
          </Text>
        ),
      },
      {
        accessor: 'stock',
        title: 'Stock',
        hidden: !visibleColumns.includes('stock'),
        sortable: true,
        width: 80,
      },
      {
        accessor: 'category',
        title: 'Category',
        hidden: !visibleColumns.includes('category'),
        sortable: true,
      },
      {
        accessor: 'status',
        title: 'Status',
        hidden: !visibleColumns.includes('status'),
        sortable: true,
        width: 120,
        render: ({ status }) => (
          <Badge
            color={STATUS_COLORS[status] || 'gray'}
            variant="light"
            size="sm"
          >
            {status}
          </Badge>
        ),
      },
      {
        accessor: 'actions',
        title: '',
        width: 60,
        textAlign: 'right',
        pinned: 'right',
        render: (product) => (
          <GlobalActionMenu
            onView={() => onView?.(product)}
            onEdit={() => onEdit?.(product)}
            onDelete={() => onDelete?.(product)}
          />
        ),
      },
    ];
  }, [visibleColumns, onView, onEdit, onDelete]);

  return { columns, allColumns: productColumnOptions };
};
