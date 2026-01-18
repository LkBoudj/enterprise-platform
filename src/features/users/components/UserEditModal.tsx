import { Modal, Button, TextInput, Select, Stack, Group, LoadingOverlay } from '@mantine/core';
import { useEditUserController } from '../hooks/useEditUserController';
import { UserType } from '../validation/user.schema';


interface UserEditModalProps {
  opened: boolean;
  onClose: () => void;
  user: UserType | null; // قد يكون null إذا لم نختر أحداً بعد
}

export const UserEdit = ({ opened, onClose, user }: UserEditModalProps) => {
  // حماية: لا نرسم المكون إذا لم يكن هناك مستخدم (لتجنب الأخطاء)
  if (!user) return null;

  return <Content opened={opened} onClose={onClose} user={user} />;
};

// فصلنا المحتوى في مكون داخلي لضمان تشغيل الـ Hook فقط عندما تتوفر البيانات
const Content = ({ opened, onClose, user }: { opened: boolean; onClose: () => void; user: UserType }) => {
  const { form, handleSubmit, isPending } = useEditUserController({ user, onClose });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Edit User: ${user.name}`}
      centered
      closeOnClickOutside={!isPending}
    >
      <LoadingOverlay visible={isPending} />
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

          <TextInput
            label="Phone"
            key={form.key('phone')}
            {...form.getInputProps('phone')}
          />

          <TextInput
            label="Country"
            key={form.key('country')}
            {...form.getInputProps('country')}
          />

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
    </Modal>
  );
};