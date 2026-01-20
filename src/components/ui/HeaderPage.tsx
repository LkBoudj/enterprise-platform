import { IconLayoutSidebarLeftExpandFilled, IconLayoutSidebarRightExpandFilled } from '@tabler/icons-react';
import { ActionIcon, Group, Title, Tooltip } from '@mantine/core';
import { useSidebarStore } from '@/store/use-sidebarStore';

interface HeaderPageProps {
  title: string;
  rightComponent?: React.ReactNode;
}
const HeaderPage: React.FC<HeaderPageProps> = ({ title, rightComponent }) => {
  const { mobileOpened, toggleMobile } = useSidebarStore();
  return (
    <Group justify="space-between" align="center">
      <Group align='center'>
       <Tooltip
         
          label={mobileOpened ? 'Collapse' : 'Expand'}
          position="right"
          withArrow
          transitionProps={{ duration: 0 }}
        >
          <ActionIcon  hiddenFrom="sm" onClick={toggleMobile} variant="light">
            <IconLayoutSidebarLeftExpandFilled size={21} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Title order={3} fw={600}>
          {title}
        </Title>
      </Group>

      {rightComponent}
    </Group>
  );
};

export default HeaderPage;
