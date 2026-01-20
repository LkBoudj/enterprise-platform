import { Group, Paper, Text, ThemeIcon, Box } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import classes from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string | number;
  diff: number;
  icon: React.ElementType;
  description?: string;
}

export function StatCard({ title, value, diff, icon: Icon, description = 'compared to last hour' }: StatCardProps) {
  const DiffIcon = diff > 0 ? IconArrowUpRight : IconArrowDownRight;

  return (
    <Paper p="xl" radius="lg" withBorder className={classes.statCard}>
      <Group justify="space-between">
        <Box>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase" className={classes.title}>
            {title}
          </Text>
          <Text fw={800} size="xl" className={classes.value}>
            {value}
          </Text>
        </Box>
        <ThemeIcon
          color="orange.6"
          variant="light"
          size={48}
          radius="md"
          className={classes.iconWrapper}
        >
          <Icon size="1.8rem" stroke={1.5} variant="filled" />
        </ThemeIcon>
      </Group>

      <Group gap="xs" mt="sm">
        <Text c={diff > 0 ? 'success.5' : 'error.5'} size="sm" fw={700} className={classes.diffGroup}>
          <span>{diff > 0 ? `+${diff}` : diff}%</span>
          <DiffIcon size="1rem" stroke={2.5} />
        </Text>
        <Text size="xs" c="dimmed" fw={500}>
          {description}
        </Text>
      </Group>
    </Paper>
  );
}