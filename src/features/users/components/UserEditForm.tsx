import { Button, Group, Select, Stack, TextInput } from '@mantine/core';
import { useEditUserController } from '../hooks/useEditUserController';
import { UserType } from '../validation/user.schema';

interface UserEditFormProps {
  onClose: () => void;
  item: UserType | null; // قد يكون null إذا لم نختر أحداً بعد
}

export const UserEditForm = ({ onClose, item }: UserEditFormProps) => {
  if (!item) {
    return null;
  }

  return <Content onClose={onClose} user={item} />;
};

// فصلنا المحتوى في مكون داخلي لضمان تشغيل الـ Hook فقط عندما تتوفر البيانات
const Content = ({ onClose, user }: { onClose: () => void; user: UserType }) => {
  const { form, handleSubmit, isPending } = useEditUserController({ user, onClose });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Full Name"
          withAsterisk
          key={form.key('name')}
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Email"
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

        <TextInput label="Phone" key={form.key('phone')} {...form.getInputProps('phone')} />

        <TextInput label="Country" key={form.key('country')} {...form.getInputProps('country')} />

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            Save Changes
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
