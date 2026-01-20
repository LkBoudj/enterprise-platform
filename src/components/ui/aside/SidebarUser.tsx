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
interface SidebarUserProps {
  user: typeof import('./sidebar.data').MOCK_USER; // Or import a real User type
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
          label={`${user.name} - ${user.role}`}
          position="right"
          withArrow
          transitionProps={{ duration: 0 }}
          key={user.name}
        >
          <UnstyledButton className={classes.navLink}>
            {collapsed ? (
              <Center>
                <Avatar size={25} />
              </Center>
            ) : (
              <Group gap="sm" wrap="nowrap">
                <Avatar size={25} />
                <Box style={{ flex: 1 }}>
                  <Text size="sm" fw={600} truncate lh={1.3}>
                    {user.name}
                  </Text>
                  <Text size="xs" c="dimmed" truncate lh={1.2}>
                    {user.role}
                  </Text>
                </Box>
              </Group>
            )}
          </UnstyledButton>
        </Tooltip>
        {/* {collapsed ? (
          //  <ActionIcon variant="light" size="21" radius="xl" >
              
          //  </ActionIcon>
          <Avatar size="30"></Avatar>
        ) : (
          <UnstyledButton
           
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = inputBg)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Group gap="sm">
              <Avatar src={null} alt={user.name} radius="xl" color={theme.primaryColor} variant="light" size={36}>
                {user.initials}
              </Avatar>
              <Box style={{ flex: 1, overflow: 'hidden' }}>
                <Text size="sm" fw={600} truncate lh={1.3}>{user.name}</Text>
                <Text size="xs" c="dimmed" truncate lh={1.2}>{user.role}</Text>
              </Box>
            </Group>
          </UnstyledButton>
        )} */}
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{user.name}</Menu.Label>
        <Menu.Item className={classes.navLink} leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item className={classes.navLink} leftSection={<IconLogout size={14} />}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  return UserMenu;
}
