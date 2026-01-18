import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { userService } from '../services/userService';
import { CreateUserDto, CreateUserSchema } from '../validation/user.schema';
import { useCreateUser } from './useUserQuery';
import { useEffect } from 'react';

interface UseCreateUserControllerProps {
  onClose: () => void;
}
export const useCreateUserController = ({ onClose }: UseCreateUserControllerProps) => {
  const queryClient = useQueryClient();

  const form = useForm<CreateUserDto>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      role: 'User',
      status: 'active',
      phone: '',
      country: '',
    },
    validate: zod4Resolver(CreateUserSchema),
  });

  const { isPending, mutate } = useCreateUser();
  
  useEffect(()=>{
    console.log('Form Errors: ', form.errors);
  },[form.errors])
  const handleSubmit = form.onSubmit((values) => {
    mutate(values, {
      onSuccess: () => {
        notifications.show({
          title: 'Success',
          message: 'User created successfully',
          color: 'green',
        });
        queryClient.invalidateQueries({ queryKey: ['users'] });
        onClose();
        form.reset();
      },
      onError: () => {
        notifications.show({
          title: 'Error',
          message: 'Failed to create user',
          color: 'red',
        });
      },
    });
  });

  return {
    form,
    handleSubmit,
    isPending,
  };
};
