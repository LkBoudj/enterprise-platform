import { GenericCrudPage } from '@/components/ui/GenericCrudPage';
import { UserCreateForm } from '../components/UserCreateForm';
import { UserEditForm } from '../components/UserEditForm';
import { useUserPageController } from '../hooks/useUserPageController';

export function UserManagementPage() {
  const controller = useUserPageController();

  return (
    <GenericCrudPage
      title="User Management"
      controller={controller}
      CreateForm={UserCreateForm}
      EditForm={UserEditForm}
    />
  );
}
