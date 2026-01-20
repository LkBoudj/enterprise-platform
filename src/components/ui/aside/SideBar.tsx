import { Stack, useComputedColorScheme, useMantineTheme } from '@mantine/core';
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
    <Stack className={classes.navbar} >
      <Stack gap="26">
        <MantineLogo type="mark" size={30} onClick={toggle} />
        <Stack gap={0}>
          {MAIN_LINKS.map((link) => (
            <SidebarLink key={link.label} {...link} collapsed={collapsed} />
          ))}
        </Stack>
      </Stack>

      <Stack  gap={0}>
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
