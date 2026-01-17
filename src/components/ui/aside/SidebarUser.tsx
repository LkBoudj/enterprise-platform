import { UnstyledButton, Group, Avatar, Box, Text, Menu, ActionIcon } from '@mantine/core';
import { IconSettings, IconLogout } from '@tabler/icons-react';

interface SidebarUserProps {
  user: typeof import('./sidebar.data').MOCK_USER; // Or import a real User type
  collapsed?: boolean;
  theme: any;
  colorScheme: string;
}

export function SidebarUser({ user, collapsed, theme, colorScheme }: SidebarUserProps) {
  const inputBg = colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0];

  const UserMenu = (
    <Menu shadow="md" width={260} position="right-end" withArrow>
      <Menu.Target>
        {collapsed ? (
           <ActionIcon variant="light" size="lg" radius="xl" color={theme.primaryColor}>
              {user.initials}
           </ActionIcon>
        ) : (
          <UnstyledButton
            style={{
              flex: 1, padding: 8, borderRadius: theme.radius.md, transition: 'background-color 0.2s', marginRight: 8,
            }}
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
        )}
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{user.name}</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconLogout size={14} />}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  return UserMenu;
}