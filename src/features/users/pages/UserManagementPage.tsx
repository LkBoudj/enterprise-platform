import { IconDownload, IconPlus, IconUpload } from '@tabler/icons-react';
import { Button, Group } from '@mantine/core';
import { GenericCrudPage } from '@/components/ui/GenericCrudPage';
import { UserCreateForm } from '../components/UserCreateForm';
import { UserEditForm } from '../components/UserEditForm';
import { useUserPageController } from '../hooks/useUserPageController';
import UserRowExceptionContent from '../components/UserRowExceptionContent';
import { UserStatsGroup } from '../components/UserStatusGroup';

export function UserManagementPage() {
  const controller = useUserPageController();

  return (
    <GenericCrudPage
      title="User Management"
      headerRight={
        <Group>
          <Button leftSection={<IconUpload size={18} />} variant="light" color="gray" size="sm">
            Import
          </Button>
          <Button size="sm" leftSection={<IconDownload size={18} />} variant="light" color="blue">
            Export
          </Button>

          {/* زر الإضافة السحري */}
          <Button
            onClick={controller.createModal.open}
            size="sm"
            leftSection={<IconPlus size={18} />}
            variant="light"
            color="teal"
          >
            Add New
          </Button>
        </Group>
      }
      // rowExceptionContent={UserRowExceptionContent}
      statsGroup={<UserStatsGroup />}
      controller={controller}
      CreateForm={UserCreateForm}
      EditForm={UserEditForm}
    />
  );
}
