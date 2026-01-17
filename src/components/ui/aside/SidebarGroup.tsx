import { useState } from 'react';
import { Box, UnstyledButton, Group, Text, Collapse, useMantineTheme, useComputedColorScheme } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { NavGroupProps } from './sidebar.types';

export function SidebarGroup({ title, children, icon: Icon, collapsed }: NavGroupProps) {
  const [opened, setOpened] = useState(true);
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme('light');

  if (collapsed) {
    return (
      <Box mb="sm" style={{ borderTop: `1px solid ${colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`, paddingTop: 10 }}>
        {children}
      </Box>
    );
  }

  return (
    <Box mb="sm">
      <UnstyledButton
        onClick={() => setOpened(!opened)}
        style={{
          width: '100%',
          padding: `${theme.spacing.xs} ${theme.spacing.xs}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
        }}
      >
        <Group gap="xs">
          {Icon && <Icon size={14} />}
          <Text size="xs" fw={700} tt="uppercase" style={{ letterSpacing: 0.5 }}>{title}</Text>
        </Group>
        <IconChevronRight
          size={14}
          style={{ transform: opened ? 'rotate(90deg)' : 'none', transition: 'transform 200ms ease' }}
        />
      </UnstyledButton>
      <Collapse in={opened}><Box pl={0}>{children}</Box></Collapse>
    </Box>
  );
}