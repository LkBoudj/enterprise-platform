import React from 'react';
import {
  IconArrowLeft,
  IconCalendarTime,
  IconDotsVertical,
  IconEdit,
  IconId,
  IconMail,
  IconMapPin,
  IconPhone,
  IconShieldCheck,
  IconTrash,
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Loader,
  Menu,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useGetUser } from '../hooks/useUserQuery';
import { UserType } from '../validation/user.schema';

interface ViewPageLayoutProps extends React.PropsWithChildren {
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
  isFetching?: boolean;
  refetch?: () => void;
}

const ViewPageLayout: React.FC<ViewPageLayoutProps> = ({
  children,
  refetch,
  isLoading,
  isError,
  isFetching,
  error,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Stack gap="md">
        <Group justify="space-between">
          <Group gap="sm">
            <Button
              variant="subtle"
              leftSection={<IconArrowLeft size={18} />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Stack gap={0}>
              <Title order={3}>User Profile</Title>
              <Text size="sm" c="dimmed">
                Loading user details...
              </Text>
            </Stack>
          </Group>
        </Group>

        <Card withBorder radius="lg" padding="lg">
          <Grid>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Group wrap="nowrap">
                <Skeleton height={88} circle />
                <Stack gap={6} style={{ flex: 1 }}>
                  <Skeleton height={18} width="60%" />
                  <Skeleton height={12} width="40%" />
                  <Skeleton height={12} width="70%" />
                </Stack>
              </Group>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 7 }}>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Skeleton height={86} radius="md" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Skeleton height={86} radius="md" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Skeleton height={86} radius="md" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Skeleton height={86} radius="md" />
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Card>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Card withBorder radius="lg" padding="lg">
        <Stack gap="sm">
          <Group justify="space-between">
            <Group gap="sm">
              <Button
                variant="subtle"
                leftSection={<IconArrowLeft size={18} />}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Title order={3}>User Profile</Title>
            </Group>

            <Button variant="light" onClick={refetch}>
              Retry
            </Button>
          </Group>

          <Divider />

          <Text c="red" fw={600}>
            Failed to load user.
          </Text>
          <Text size="sm" c="dimmed">
            {(error as Error)?.message ?? 'Unknown error'}
          </Text>
        </Stack>
      </Card>
    );
  }

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <Group gap="sm">
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={18} />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          <Stack gap={0}>
            <Title order={3}>User Profile</Title>
            <Text size="sm" c="dimmed">
              Manage account details, status, and permissions
            </Text>
          </Stack>

          {isFetching && <Loader size="sm" />}
        </Group>

        <Group gap="sm">
          <Button variant="light" leftSection={<IconEdit size={18} />}>
            Edit
          </Button>

          <Menu position="bottom-end" shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="light" radius="md" size="lg" aria-label="More actions">
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconEdit size={16} />}>Edit</Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" leftSection={<IconTrash size={16} />}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>

      {children}
    </Stack>
  );
};

const statusColor: Record<UserType['status'], string> = {
  active: 'green',
  inactive: 'gray',
  suspended: 'red',
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <Paper withBorder radius="md" p="md">
    <Group justify="space-between" align="flex-start" wrap="nowrap">
      <Group align="flex-start" gap="sm" wrap="nowrap">
        <ActionIcon variant="light" radius="md" size="lg">
          {icon}
        </ActionIcon>

        <Stack gap={2}>
          <Text size="xs" c="dimmed" tt="uppercase" fw={700} style={{ letterSpacing: 0.6 }}>
            {label}
          </Text>
          <Text fw={600} style={{ lineHeight: 1.2 }}>
            {value}
          </Text>
        </Stack>
      </Group>
    </Group>
  </Paper>
);

const UserViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error, refetch, isFetching } = useGetUser(id);

  return (
    <ViewPageLayout
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
      isFetching={isFetching}
    >
      {data && (
        <Card withBorder radius="lg" padding="lg">
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Group wrap="nowrap" align="center">
                <Avatar src={data.photo} size={88} radius={999} />
                <Stack gap={6} style={{ minWidth: 0 }}>
                  <Group gap="xs" wrap="wrap">
                    <Text fw={800} size="xl" style={{ lineHeight: 1.1 }}>
                      {data.name}
                    </Text>

                    <Badge color={statusColor[data.status]} variant="light" radius="sm">
                      {data.status}
                    </Badge>

                    <Badge
                      color="violet"
                      variant="light"
                      radius="sm"
                      leftSection={<IconShieldCheck size={14} />}
                    >
                      {data.role}
                    </Badge>
                  </Group>

                  <Group gap="xs" wrap="wrap">
                    <Text size="sm" c="dimmed">
                      User ID:
                    </Text>
                    <Anchor size="sm" underline="hover">
                      {data.id}
                    </Anchor>
                  </Group>

                  <Group gap="xs" wrap="wrap">
                    <IconCalendarTime size={16} />
                    <Text size="sm" c="dimmed">
                      Last active:
                    </Text>
                    <Text size="sm" fw={600}>
                      {data.lastActive ? new Date(data.lastActive).toLocaleString() : '-'}
                    </Text>
                  </Group>
                </Stack>
              </Group>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 7 }}>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <InfoRow icon={<IconMail size={18} />} label="Email" value={data.email} />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <InfoRow icon={<IconPhone size={18} />} label="Phone" value={data.phone} />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <InfoRow icon={<IconMapPin size={18} />} label="Country" value={data.country} />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <InfoRow icon={<IconId size={18} />} label="User ID" value={data.id} />
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Card>
      )}
    </ViewPageLayout>
  );
};

export default UserViewPage;
