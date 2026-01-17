import { ReactNode } from 'react';
import { ActionIcon, Menu, useMantineTheme } from '@mantine/core';
import { IconDots, IconEdit, IconEye, IconTrash } from '@tabler/icons-react';

export interface GlobalActionMenuProps {
  /** Label for the View action (default: "View Details") */
  viewLabel?: string;
  /** Function to call when View is clicked. If undefined, the item is hidden. */
  onView?: () => void;

  /** Label for the Edit action (default: "Edit") */
  editLabel?: string;
  /** Function to call when Edit is clicked. If undefined, the item is hidden. */
  onEdit?: () => void;

  /** Label for the Delete action (default: "Delete") */
  deleteLabel?: string;
  /** Function to call when Delete is clicked. If undefined, the item is hidden. */
  onDelete?: () => void;

  /** Custom menu items to inject before the Delete button */
  children?: ReactNode;
}

export const GlobalActionMenu = ({
  onView,
  viewLabel = 'View Details',
  onEdit,
  editLabel = 'Edit',
  onDelete,
  deleteLabel = 'Delete',
  children,
}: GlobalActionMenuProps) => {
  const theme = useMantineTheme();
  
  // Check if we have any "main" content (View, Edit, or Custom) to decide if we need a divider before Delete
  const hasMainContent = !!onView || !!onEdit || !!children;

  return (
    <Menu shadow="md" width={200} position="bottom-end" withinPortal>
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray" size="sm">
          <IconDots size={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {/* 1. Base Actions (View/Edit) */}
        {onView && (
          <Menu.Item onClick={onView} leftSection={<IconEye size={16} />}>
            {viewLabel}
          </Menu.Item>
        )}
        
        {onEdit && (
          <Menu.Item  leftSection={<IconEdit size={16} />} onClick={onEdit}>
            {editLabel}
          </Menu.Item>
        )}

        {/* 2. Custom Actions (Injected via children) */}
        {children}

        {/* 3. Delete Section (Always last, with a divider if needed) */}
        {onDelete && (
          <>
            {hasMainContent && <Menu.Divider />}
            <Menu.Item 
              color="red" 
              leftSection={<IconTrash size={16} />}
              onClick={onDelete}
            >
              {deleteLabel}
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};