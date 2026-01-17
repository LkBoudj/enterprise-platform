// components/PageViewHeader.tsx
import React from 'react';
import { IconArrowLeft, IconDotsVertical } from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  Group,
  Loader,
  Menu,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export type PageHeaderAction =
  | {
      type: 'button';
      label: string;
      onClick?: () => void;
      leftSection?: React.ReactNode;
      variant?: 'filled' | 'light' | 'subtle' | 'outline' | 'default';
      color?: string;
      disabled?: boolean;
    }
  | {
      type: 'menu';
      label: string;
      onClick?: () => void;
      leftSection?: React.ReactNode;
      color?: string;
      disabled?: boolean;
    }
  | { type: 'divider' };

type Props = {
  title: string;
  description?: string;
  isFetching?: boolean;

  // Back
  showBack?: boolean;
  onBack?: () => void;

  // Actions
  actions?: PageHeaderAction[]; // right buttons
  menuActions?: PageHeaderAction[]; // dropdown items

  menuWidth?: number;
};

const PageViewHeader: React.FC<Props> = ({
  title,
  description,
  isFetching,
  showBack = true,
  onBack,
  actions,
  menuActions,
  menuWidth = 220,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) return onBack();
    navigate(-1);
  };

  const hasMenu =
    Boolean(menuActions?.length) &&
    menuActions!.some((a) => a.type === 'menu' || a.type === 'divider');

  return (
    <Group justify="space-between" align="center">
      <Group gap="sm">
        {showBack && (
          <Button variant="subtle" leftSection={<IconArrowLeft size={18} />} onClick={handleBack}>
            Back
          </Button>
        )}

        <Stack gap={0}>
          <Title order={3}>{title}</Title>
          {description && (
            <Text size="sm" c="dimmed">
              {description}
            </Text>
          )}
        </Stack>

        {isFetching && <Loader size="sm" />}
      </Group>

      <Group gap="sm">
        {actions?.map((a, idx) => {
          if (a.type !== 'button') return null;
          return (
            <Button
              key={idx}
              variant={a.variant ?? 'light'}
              color={a.color}
              leftSection={a.leftSection}
              onClick={a.onClick}
              disabled={a.disabled}
            >
              {a.label}
            </Button>
          );
        })}

        {hasMenu && (
          <Menu position="bottom-end" shadow="md" width={menuWidth}>
            <Menu.Target>
              <ActionIcon variant="light" radius="md" size="lg" aria-label="More actions">
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {menuActions?.map((a, idx) => {
                if (a.type === 'divider') return <Menu.Divider key={idx} />;
                if (a.type !== 'menu') return null;

                return (
                  <Menu.Item
                    key={idx}
                    leftSection={a.leftSection}
                    color={a.color}
                    onClick={a.onClick}
                    disabled={a.disabled}
                  >
                    {a.label}
                  </Menu.Item>
                );
              })}
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Group>
  );
};

export default PageViewHeader;
