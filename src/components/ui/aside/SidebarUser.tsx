import { IconLogout, IconSettings } from '@tabler/icons-react';
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Group,
  Menu,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import classes from './SideBar.module.css';
import { AuthType } from '@/features/auth/validation/auth.schema';
interface SidebarUserProps {
  user: AuthType | null; // Or import a real User type
  collapsed?: boolean;
  theme: any;
  colorScheme: string;
}

export function SidebarUser({ user, collapsed, theme, colorScheme }: SidebarUserProps) {
  const inputBg = colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0];

  const UserMenu = (
    <Menu shadow="md" width={260} trigger='hover' position="right-end" withArrow>
      <Menu.Target>
        <Tooltip
          label={`${user?.lastName} - ${user?.firstName}`}
          position="right"
          withArrow
          transitionProps={{ duration: 0 }}
          key={user?.username}
        >
          <UnstyledButton className={classes.navLink}>
            {collapsed ? (
              <Center>
                <Avatar size={25} src={user?.image} />
              </Center>
            ) : (
              <Group gap="sm" wrap="nowrap">
                <Avatar size={25} src={user?.image} />
                <Box style={{ flex: 1 }}>
                  <Text size="sm" fw={600} truncate lh={1.3}>
                    {user?.username}
                  </Text>
                  <Text size="xs" c="dimmed" truncate lh={1.2}>
                    {user?.email} 
                  </Text>
                </Box>
              </Group>
            )}
          </UnstyledButton>
        </Tooltip>

      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{user?.firstName} {user?.image}</Menu.Label>
        <Menu.Item className={classes.navLink} leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item className={classes.navLink} leftSection={<IconLogout size={14} />}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  return UserMenu;
}
