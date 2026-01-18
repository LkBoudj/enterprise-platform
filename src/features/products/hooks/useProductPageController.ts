import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useDataTableState } from '@/hooks/use-dataTableState';
import { IBaseFilter, INITIAL_FILTERS } from '@/types';
import { ICrudController } from '@/types/crud.types';

import { useProductColumns } from '../components/useProductColumns';
import { ProductType } from '../validation/product.schema';
import { useGetProducts, useDeleteProduct } from './useProductQuery';
import { notifications } from '@mantine/notifications';

// 1. Define specific filters for Products
interface IProductFilter extends IBaseFilter {
  // Add product-specific filters here if needed
  // category?: string;
  // status?: ProductType['status'];
}

const INITIAL_PRODUCT_FILTERS: IProductFilter = {
  ...INITIAL_FILTERS,
  orderBy: 'title', // Default sort by title
};

export const defaultVisibleProductColumns = [
  'id',
  'title',
  'price',
  'stock',
  'category',
  'status',
  'actions',
];

export const useProductPageController = (): ICrudController<ProductType> => {
  const navigate = useNavigate();

  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] =
    useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [productToEdit, setProductToEdit] = useState<ProductType | null>(null);

  const handleEditClick = (product: ProductType) => {
    setProductToEdit(product);
    openEditModal();
  };

  const { internalSelected, visibleColumns, filters, actions } = useDataTableState<
    ProductType,
    IProductFilter,
    string
  >({
    initialFilters: INITIAL_PRODUCT_FILTERS,
    defaultVisibleColumns: defaultVisibleProductColumns,
  });

  const { data, isLoading, isFetching, error } = useGetProducts(filters);

  const deleteProductMutation = useDeleteProduct();

  const confirmDelete = (product: ProductType) => {
    notifications.show({
      id: `delete-product-${product.id}`,
      color: 'red',
      title: 'Delete Product',
      message: `Are you sure you want to delete product "${product.title}"?`,
      autoClose: false,
      withCloseButton: true,
      onClose: () => notifications.hide(`delete-product-${product.id}`),
      action: {
        label: 'Delete',
        onClick: () => {
          deleteProductMutation.mutate(product.id, {
            onSuccess: () => {
              notifications.update({
                id: `delete-product-${product.id}`,
                color: 'green',
                title: 'Product Deleted',
                message: `Product "${product.title}" has been deleted successfully.`,
                icon: null,
                autoClose: 3000,
              });
            },
            onError: (err) => {
              notifications.update({
                id: `delete-product-${product.id}`,
                color: 'red',
                title: 'Deletion Failed',
                message: `Failed to delete product "${product.title}": ${err.message}`,
                icon: null,
                autoClose: 5000,
              });
            },
          });
        },
      },
    });
  };

  const { columns, allColumns } = useProductColumns({
    visibleColumns,
    onView: (product) => navigate(`/products/${product.id}`), // Assuming a view route
    onEdit: handleEditClick,
    onDelete: confirmDelete,
  });

  return {
    // Data Props
    records: data?.data || [],
    total: data?.meta?.total || 0,
    page: filters.page,
    limit: filters.limit,
    isLoading: isLoading || isFetching,
    error,

    // UI Props
    columns,
    allColumns,
    visibleColumns,
    internalSelected,

    // State & Actions
    filters,
    actions: {
      ...actions,
      toggleColumn: (key: string) => actions.toggleColumn(key as any), // Cast to any to satisfy type for now
      // Add more specific actions if useDataTableState does not expose them directly
    },
    createModal: {
      opened: createModalOpened,
      open: openCreateModal,
      close: closeCreateModal,
    },
    editModal: {
      opened: editModalOpened,
      close: closeEditModal,
      item: productToEdit,
      onEdit: handleEditClick,
    },
  };
};