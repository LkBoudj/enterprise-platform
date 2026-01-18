import { useQueryClient } from '@tanstack/react-query';
import { Text } from '@mantine/core';
import { modals } from '@mantine/modals'; // استدعاء المدير
import { notifications } from '@mantine/notifications';
import { UserType } from '../validation/user.schema';
import { useDeleteUser } from './useUserQuery';

export const useDeleteUserController = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useDeleteUser(); // نستخدم Async للتحكم في الوعد

  const confirmDelete = (user: UserType) => {
    modals.openConfirmModal({
      title: 'Delete User Confirmation',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{user.name}</strong> (Code: {user.code})?<br />
          This action is destructive and cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete User', cancel: 'Cancel' },
      confirmProps: { color: 'red' },

      onConfirm: async () => {
        try {
          // ننتظر الحذف
          await mutateAsync(user.code); // Use user.code for deletion

          queryClient.invalidateQueries({ queryKey: ['users'] });
          // نجاح
          notifications.show({
            title: 'Deleted',
            message: `User "${user.name}" (Code: ${user.code}) deleted successfully`,
            color: 'green',
          });
        } catch (error) {
          // فشل
          notifications.show({
            title: 'Error',
            message: `Failed to delete user "${user.name}" (Code: ${user.code})`,
            color: 'red',
          });
        }
      },
    });
  };

  return {
    confirmDelete,
  };
};
