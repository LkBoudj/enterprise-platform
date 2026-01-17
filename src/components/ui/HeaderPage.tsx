import { Group, Title } from "@mantine/core";

interface HeaderPageProps {
  title: string;
  rightComponent?: React.ReactNode;
}
const HeaderPage:React.FC<HeaderPageProps> = ({ title, rightComponent }) => {
  return (
    <Group justify="space-between" align="center">
      <Title order={3} fw={600}>
        {title}
      </Title>

      {rightComponent}
    </Group>
  );
};

export default HeaderPage;  