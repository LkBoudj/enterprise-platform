import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useDataTableState } from '@/hooks/use-dataTableState';
import { IBaseFilter, INITIAL_FILTERS } from '@/types'; // Imported from shared types

import { useUserColumns } from '../components/userColumns';
import { UserType } from '../validation/user.schema';
import { useGetUsers } from './useUserQuery'; // Ensure this hook exists
import { useDeleteUserController } from './useDeleteUserController';

// 1. Define specific filters for Users (if you add role/status filters later)
interface IUserFilter extends IBaseFilter {
  // role?: string;
  // status?: string;
}

const INITIAL_USER_FILTERS: IUserFilter = {
  ...INITIAL_FILTERS,
  orderBy: 'name',
};

export const defaultVisibleColumns = [
  'name',
  'email',
  'role',
  'phone',
  'status',
  'country',
  'lastActive',
  'actions',
];

export const useUserPageController = () => {
  const navigate = useNavigate();

  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] =
    useDisclosure(false);

  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [userToEdit, setUserToEdit] = useState<UserType | null>(null);

  const handleEditClick = (user: UserType) => {
    setUserToEdit(user); // حفظ المستخدم
    openEditModal(); // فتح المودال
  };
  const { internalSelected, visibleColumns, filters, actions } = useDataTableState<
    UserType,
    IUserFilter,
    string
  >({
    initialFilters: INITIAL_USER_FILTERS,
    defaultVisibleColumns,
  });

  const { data, isLoading, isFetching, error } = useGetUsers(filters);
  
  const {confirmDelete} = useDeleteUserController();
  const { columns, allColumns } = useUserColumns({
    visibleColumns,
    onView: (user) => navigate(`/users/${user.id}`),
    onEdit: handleEditClick, // Example action
    // onEdit: (user) => navigate(`/users/${user.id}/edit`), // Example action
    onDelete: confirmDelete, // Example action
  });

  return {
    // Data Props
    records: data?.data || [], // Handle API response structure
    total: data?.meta?.total || 0, // Adjust based on API response
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
    actions, // Contains setPage, setSearch, setLimit, etc.
    createModal: {
      opened: createModalOpened,
      open: openCreateModal,
      close: closeCreateModal,
    },
    editModal: {
      opened: editModalOpened,
      close: closeEditModal,
      user: userToEdit,
      onEdit: handleEditClick, // نمرر هذه الدالة للجدول
    },
  };
};
