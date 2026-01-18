import { Modal, Button, TextInput, Select, Stack, Group } from '@mantine/core';
import { useCreateUserController } from '../hooks/useCreateUserController';

interface UserCreateModalProps {
  opened: boolean;
  onClose: () => void;
}

export const UserCreateModal = ({ opened, onClose }: UserCreateModalProps) => {
  const { form, handleSubmit, isPending } = useCreateUserController({ onClose });

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title="Create New User" 
      centered
      closeOnClickOutside={!isPending}
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Full Name"
            placeholder="John Doe"
            withAsterisk
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          
          <TextInput
            label="Email"
            placeholder="example@mail.com"
            withAsterisk
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <Group grow>
            <Select
              label="Role"
              data={['Admin', 'User', 'Manager']}
              allowDeselect={false}
              key={form.key('role')}
              {...form.getInputProps('role')}
            />
            <Select
              label="Status"
              data={['active', 'inactive']}
              allowDeselect={false}
              key={form.key('status')}
              {...form.getInputProps('status')}
            />
          </Group>

          <TextInput
             label="Phone"
             placeholder="+1 234..."
             key={form.key('phone')}
             {...form.getInputProps('phone')}
          />

           <TextInput
             label="Country"
             placeholder="USA"
             key={form.key('country')}
             {...form.getInputProps('country')}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Create User
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};