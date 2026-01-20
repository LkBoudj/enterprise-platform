import {
  IconActivity,
  IconAlertTriangle,
  IconArrowDownRight,
  IconArrowUpRight,
  IconCamera,
} from '@tabler/icons-react';
import { SimpleGrid } from '@mantine/core';
import { StatCard } from '@/components';

interface StatProps {
  title: string;
  value: string;
  diff: number;
  icon: React.ElementType;
}

const data = [
  { title: 'Active Cameras', value: '134', diff: 12, icon: IconCamera },
  { title: 'System Alerts', value: '12', diff: -5, icon: IconAlertTriangle },
  { title: 'Network Load', value: '42%', diff: 7, icon: IconActivity },
];

export function UserStatsGroup() {
  const stats = data.map((stat) => {
    const Icon = stat.icon;
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return <StatCard key={stat.title} title={stat.title} value={stat.value} diff={stat.diff} icon={Icon} />;
  });

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
      {stats}
    </SimpleGrid>
  );
}
