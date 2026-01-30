import { Container, Title, Text, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container ta="center" pt={100}>
      <Title order={1} size={120} fw={900}>404</Title>
      <Text c="dimmed" size="lg">
        The page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL.
      </Text>
      <Group justify="center" mt="xl">
        <Button variant="outline" size="md" onClick={() => navigate('/')}>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}
