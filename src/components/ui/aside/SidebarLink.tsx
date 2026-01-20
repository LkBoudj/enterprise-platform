import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Badge, Box, Center, Group, Text, Tooltip, UnstyledButton } from '@mantine/core';
import { NavItemProps, NavLinkProps } from './sidebar.types';
import classes from './SideBar.module.css';

export function SidebarLink({ icon: Icon, label, to, badge, collapsed }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Tooltip label={label} position="right" withArrow transitionProps={{ duration: 0 }} key={label}>
      <UnstyledButton
        className={classes.navLink}
        data-active={isActive}
        component={RouterNavLink}
        to={to}
      >
        <Group gap="sm" wrap="nowrap">
          <Center>
            <Icon size={21} stroke={1.5} />
          </Center>
          {!collapsed && (
            <Group flex={1}>
              <Box flex={1}>
                <Text size="sm" inherit truncate>
                  {label}
                </Text>
              </Box>
              {badge && badge > 0 && (
                <Badge className={classes.badge} size="xs" variant="light">
                  {badge}
                </Badge>
              )}
            </Group>
          )}
        </Group>
      </UnstyledButton>
    </Tooltip>
  );
}

export function SideItem({ icon: Icon, label, onClick, collapsed }: NavItemProps) {
  return (
    <Tooltip label={label} position="right" withArrow transitionProps={{ duration: 0 }} key={label}>
      <UnstyledButton className={classes.navLink} onClick={onClick}>
        <Group gap="sm" wrap="nowrap">
          <Center>
            <Icon size={21} stroke={1.5} />
          </Center>
          {!collapsed && (
            <Text size="sm" inherit truncate>
              {label}
            </Text>
          )}
        </Group>
      </UnstyledButton>
    </Tooltip>
  );
}
