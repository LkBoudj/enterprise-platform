import {
  IconBulbFilled,
  IconMoon,
  IconMoonFilled,
  IconSun,
  IconSunFilled,
} from '@tabler/icons-react';
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { SideItem } from './SidebarLink';

interface ThemeToggleProps {
  collapsed?: boolean;
}
export function ThemeToggle({ collapsed }: ThemeToggleProps) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  return (
    <SideItem
      collapsed={collapsed}
      onClick={() => setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')}
      icon={computedColorScheme === 'dark' ? IconBulbFilled : IconMoonFilled}
      label="Toggle color scheme"
    />
  );
}
