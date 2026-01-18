import { useQueryClient } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { notifications } from '@mantine/notifications';
import { UpdateUserDto, UpdateUserSchema, UserType } from '../validation/user.schema';
import { useUpdateUser } from './useUserQuery';


interface UseEditUserControllerProps {
  user: UserType; 
  onClose: () => void;
}

export const useEditUserController = ({ user, onClose }: UseEditUserControllerProps) => {
  const queryClient = useQueryClient();

  const form = useForm<UpdateUserDto>({
    mode: 'uncontrolled',
    initialValues: {
      name: user.name,
      email: user.email,
      role: user.role as any,
      status: user.status as any,
      phone: user.phone,
      country: user.country,
    },
    validate: zodResolver(UpdateUserSchema),
  });

  const { isPending, mutate } = useUpdateUser();

  const handleSubmit = form.onSubmit((values) => {
    mutate(
      { id: user.id, data: values }, 
      {
        onSuccess: () => {
          notifications.show({
            title: 'Updated',
            message: 'User updated successfully',
            color: 'blue',
          });
          queryClient.invalidateQueries({ queryKey: ['users'] });
          onClose();
        },
        onError: () => {
          notifications.show({
            title: 'Error',
            message: 'Failed to update user',
            color: 'red',
          });
        },
      }
    );
  });

  return {
    form,
    handleSubmit,
    isPending,
  };
};