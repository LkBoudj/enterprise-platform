import { ActionIcon, Button, Group, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mt="xl">
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
    </Group>
  );
}


export function ModeToggler() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Group gap="xs" justify="center" mt="xl">
      <Tooltip label="Light" withArrow>
        <ActionIcon
          variant={colorScheme === 'light' ? 'filled' : 'subtle'}
          size="lg"
          radius="xl"
          onClick={() => setColorScheme('light')}
          aria-label="Set light mode"
        >
          <IconSun size={18} stroke={1.7} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Dark" withArrow>
        <ActionIcon
          variant={colorScheme === 'dark' ? 'filled' : 'subtle'}
          size="lg"
          radius="xl"
          onClick={() => setColorScheme('dark')}
          aria-label="Set dark mode"
        >
          <IconMoon size={18} stroke={1.7} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Auto" withArrow>
        <ActionIcon
          variant={colorScheme === 'auto' ? 'filled' : 'subtle'}
          size="lg"
          radius="xl"
          onClick={() => setColorScheme('auto')}
          aria-label="Set system mode"
        >
          <IconDeviceDesktop size={18} stroke={1.7} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
