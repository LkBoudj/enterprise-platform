import { IconLayoutSidebarLeftExpandFilled, IconLayoutSidebarRightExpandFilled } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Group,
  Stack,
  Text,
  Tooltip,
  useComputedColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { MAIN_LINKS, MOCK_USER, SECONDARY_LINKS } from './sidebar.data';
// Imports from our separated files
import { SideBarProps } from './sidebar.types';
import { SidebarLink } from './SidebarLink';
import { SidebarUser } from './SidebarUser';
import { ThemeToggle } from './ThemeToggle';
import classes from './SideBar.module.css';

export function SideBar({ collapsed, toggle }: SideBarProps) {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme('light');

  return (
    <Stack data-collapsed={collapsed} className={classes.navbar}>
      <Stack gap="26">
        <Group justify="space-between" align="center" py="lg" px="sm">
          {!collapsed && (
            <Group align="center" wrap="nowrap" onClick={toggle} style={{ cursor: 'pointer' }}>
              <MantineLogo type="mark" size={30} />
              <Text
                style={{
                  whiteSpace: 'nowrap',
                }}
                hidden={collapsed}
                size="xl"
                fw="bold"
              >
                Fire Safe
              </Text>
            </Group>
          )}
          <Tooltip
            label={collapsed ? 'Expand' : 'Collapse'}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
          >
            <ActionIcon onClick={toggle} variant="light">
              {!collapsed ? (
                <IconLayoutSidebarRightExpandFilled size={21} stroke={1.5} />
              ) : (
                <IconLayoutSidebarLeftExpandFilled size={21} stroke={1.5} />
              )}
            </ActionIcon>
          </Tooltip>
        </Group>
        <Stack gap={0}>
          {MAIN_LINKS.map((link) => (
            <SidebarLink key={link.label} {...link} collapsed={collapsed} />
          ))}
        </Stack>
      </Stack>

      <Stack gap={0}>
        {SECONDARY_LINKS.map((link) => (
          <SidebarLink key={link.label} {...link} collapsed={collapsed} />
        ))}

        <ThemeToggle collapsed={collapsed} />
        <SidebarUser
          user={MOCK_USER}
          collapsed={collapsed}
          theme={theme}
          colorScheme={colorScheme}
        />
      </Stack>
    </Stack>
  );
}
