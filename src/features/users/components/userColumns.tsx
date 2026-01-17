import { useMemo } from 'react';
import { IconCashBanknote } from '@tabler/icons-react';
import { DataTableColumn } from 'mantine-datatable';
import { Avatar, Badge, Group, Menu, Stack, Text } from '@mantine/core';
import { ColumnOption } from '@/components/ui/globaDataTable/ColumnSelector';
import { GlobalActionMenu } from '@/components/ui/globaDataTable/GlobalActionMenu';
import { UserType } from '../validation/read.user.validation';

interface UserColumnsProps {
  visibleColumns: string[];
  onView?: (user: UserType) => void;
  onEdit?: (user: UserType) => void;
  onDelete?: (user: UserType) => void;
}
export const userColumns = ({ visibleColumns, onView, onEdit, onDelete }: UserColumnsProps) => {
  const columns: DataTableColumn<UserType>[] = useMemo(() => {
    return [
      {
        accessor: 'name',
        title: 'User',
        hidden: !visibleColumns.includes('name'),
        sortable: true,
        render: (user: UserType) => (
          <Group>
            <Avatar src={user.photo} alt={user.name} radius="xl" />
            <Stack gap={1}>
              <Text>{user.name}</Text>
              <Text size="xs">{user.email}</Text>
              <Text size="xs">{user.phone}</Text>
            </Stack>
          </Group>
        ),
      },
      {
        accessor: 'role',
        hidden: !visibleColumns.includes('role'),
        sortable: true,
      },
      {
        accessor: 'status',
        hidden: !visibleColumns.includes('status'),
        sortable: true,
        render: (user: UserType) => (
          <Badge color={{ active: 'green', inactive: 'gray', suspended: 'red' }[user.status]}>
            {user.status}
          </Badge>
        ),
      },
      {
        accessor: 'country',
        hidden: !visibleColumns.includes('country'),
        sortable: true,
      },
      {
        accessor: 'lastActive',
        hidden: !visibleColumns.includes('lastActive'),
        sortable: true,
        render: (user: UserType) => user.lastActive as any,
      },
      {
        accessor: 'actions',
        title: 'Actions',
        width: 120,
        textAlign: 'center',
        pinned: 'right',
        render: (user: UserType) => (
          <GlobalActionMenu
            onView={() => onView?.(user)}
            onEdit={() => onEdit?.(user)}
            onDelete={() => onDelete?.(user)}
          >
            <Menu.Item leftSection={<IconCashBanknote size={16} />} color="orange">
              Add Debt / Deduction
            </Menu.Item>
            <Menu.Divider />
          </GlobalActionMenu>
        ),
      },
    ];
  }, [visibleColumns, onView, onEdit, onDelete]);

  const allColumns: ColumnOption[] = [
    { value: 'name', label: 'User' },
    { value: 'email', label: 'Email' },
    { value: 'role', label: 'Role' },
    { value: 'phone', label: 'Phone' },
    { value: 'status', label: 'Status' },
    { value: 'country', label: 'Country' },
    { value: 'lastActive', label: 'Last Active' },
  ];

  return { columns, allColumns };
};
