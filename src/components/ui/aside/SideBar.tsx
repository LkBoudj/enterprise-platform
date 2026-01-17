import { useState } from 'react';
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconSearch,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Tooltip,
  useComputedColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { MAIN_LINKS, MOCK_USER, SECONDARY_LINKS } from './sidebar.data';
// Imports from our separated files
import { SideBarProps } from './sidebar.types';
import { SidebarGroup } from './SidebarGroup';
import { SidebarLink } from './SidebarLink';
import { SidebarUser } from './SidebarUser';
import { ThemeToggle } from './ThemeToggle';

export function SideBar({ collapsed, toggle }: SideBarProps) {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme('light');

  const bg = colorScheme === 'dark' ? theme.colors.dark[9] : theme.white;
  const borderColor = colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2];

  return (
    <Stack
      h="100%"
      w="100%"
      p="md"
      justify="space-between"
      style={{
       
        borderRight: `1px solid ${borderColor}`,
        transition: 'width 0.3s ease',
      }}
    >
      {/* --- TOP SECTION --- */}
      <Stack gap="lg">
        {/* 1. Header & Collapse */}
        <Group
          justify={collapsed ? 'center' : 'space-between'}
          align="center"
          px={collapsed ? 0 : 'xs'}
        >
          <Group gap="xs" style={{ display: collapsed ? 'none' : 'flex' }}>
            <Box
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: `linear-gradient(45deg, ${theme.colors[theme.primaryColor][6]}, ${theme.colors[theme.primaryColor][4]})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
              }}
            >
              DB
            </Box>
            <Text fw={700} size="lg" style={{ letterSpacing: -0.5 }}>
              DashBoard
            </Text>
          </Group>

          <ActionIcon variant="subtle" color="gray" onClick={toggle} size="sm">
              <IconLayoutSidebarLeftCollapse size={20} />
            </ActionIcon>
        </Group>

        {/* 3. Navigation Links */}
        <ScrollArea h="calc(100vh - 350px)" type="scroll" scrollbarSize={4} offsetScrollbars>
        
            {MAIN_LINKS.map((link) => (
              <SidebarLink key={link.to} {...link} collapsed={collapsed} />
            ))}

        </ScrollArea>
      </Stack>

      {/* --- BOTTOM SECTION --- */}
      <Stack gap="sm">
        <Divider color={borderColor} />

        <Box>
          {SECONDARY_LINKS.map((link) => (
            <SidebarLink key={link.to} {...link} collapsed={collapsed} />
          ))}
        </Box>

        {collapsed ? (
          <Stack align="center" gap="md">
            <ThemeToggle />
            <SidebarUser
              user={MOCK_USER}
              collapsed={true}
              theme={theme}
              colorScheme={colorScheme}
            />
          </Stack>
        ) : (
          <Group justify="space-between" wrap="nowrap" gap={0}>
            <SidebarUser
              user={MOCK_USER}
              collapsed={false}
              theme={theme}
              colorScheme={colorScheme}
            />
            <ThemeToggle />
          </Group>
        )}
        
      </Stack>
    </Stack>
  );
}
