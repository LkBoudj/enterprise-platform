import { useMemo } from 'react';
import { IconCashBanknote, IconPhone, IconMail } from '@tabler/icons-react';
import { DataTableColumn } from 'mantine-datatable';
import { Avatar, Badge, Group, Menu, Text } from '@mantine/core';
import { ColumnOption } from '@/components/ui/globaDataTable/ColumnSelector';
import { GlobalActionMenu } from '@/components/ui/globaDataTable/GlobalActionMenu';
import { UserType } from '../validation/user.schema'; // Import Enum for type safety

// 1. Static Configuration (Outside Component for Performance)
const STATUS_COLORS: Record<string, string> = {
  active: 'green',
  inactive: 'gray',
  suspended: 'red',
};

const userColumnOptions: ColumnOption[] = [
  { value: 'name', label: 'User Info' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'role', label: 'Role' },
  { value: 'status', label: 'Status' },
  { value: 'country', label: 'Country' },
  { value: 'lastActive', label: 'Last Active' },
];

interface UseUserColumnsProps {
  visibleColumns: string[];
  onView?: (user: UserType) => void;
  onEdit?: (user: UserType) => void;
  onDelete?: (user: UserType) => void;
}

// 2. Refactor to a Custom Hook
export const useUserColumns = ({ visibleColumns, onView, onEdit, onDelete }: UseUserColumnsProps) => {
  
  const columns: DataTableColumn<UserType>[] = useMemo(() => {
    return [
      {
        accessor: 'name',
        title: 'User',
        hidden: !visibleColumns.includes('name'),
        sortable: true,
        // Improved: Only show Avatar and Name here. Keep it clean.
        render: ({ name, photo }) => (
          <Group gap="sm" wrap="nowrap">
            <Avatar src={photo} alt={name} radius="xl" size="sm" color="blue">
              {name.charAt(0).toUpperCase()}
            </Avatar>
            <Text size="sm" fw={500} truncate>{name}</Text>
          </Group>
        ),
      },
      // 3. Separate Columns for true visibility control
      {
        accessor: 'email',
        title: 'Email',
        hidden: !visibleColumns.includes('email'),
        sortable: true,
        render: ({ email }) => (
          <Group gap={6} wrap="nowrap" c="dimmed">
            <IconMail size={14} />
            <Text size="sm">{email}</Text>
          </Group>
        ),
      },
      {
        accessor: 'phone',
        title: 'Phone',
        hidden: !visibleColumns.includes('phone'),
        render: ({ phone }) => (
          <Group gap={6} wrap="nowrap" c="dimmed">
            <IconPhone size={14} />
            <Text size="sm">{phone}</Text>
          </Group>
        ),
      },
      {
        accessor: 'role',
        title: 'Role',
        hidden: !visibleColumns.includes('role'),
        sortable: true,
        width: 100,
      },
      {
        accessor: 'status',
        title: 'Status',
        hidden: !visibleColumns.includes('status'),
        sortable: true,
        width: 100,
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
        accessor: 'country',
        title: 'Country',
        hidden: !visibleColumns.includes('country'),
        sortable: true,
      },
      {
        accessor: 'lastActive',
        title: 'Last Active',
        hidden: !visibleColumns.includes('lastActive'),
        sortable: true,
        width: 150,
        render: ({ lastActive }) => {
            if (!lastActive) return <Text c="dimmed">-</Text>;
            // Using Intl for high performance formatting
            return new Intl.DateTimeFormat('en-GB', { 
                day: '2-digit', month: 'short', year: 'numeric' 
            }).format(new Date(lastActive));
        },
      },
      {
        accessor: 'actions',
        title: '',
        width: 60, // Fixed small width
        textAlign: 'right',
        pinned: 'right', // Mantine datatable specific
        render: (user) => (
          <GlobalActionMenu
            onView={() => onView?.(user)}
            onEdit={() => onEdit?.(user)}
            onDelete={() => onDelete?.(user)}
          >
            {/* Custom Extra Actions specific to Users */}
            <Menu.Item leftSection={<IconCashBanknote size={16} />} color="orange">
              Add Deduction
            </Menu.Item>
            <Menu.Divider />
          </GlobalActionMenu>
        ),
      },
    ];
  }, [visibleColumns, onView, onEdit, onDelete]);

  return { columns, allColumns: userColumnOptions };
};