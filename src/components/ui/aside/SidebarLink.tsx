import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Badge, Box, Center, Group, Text, Tooltip, UnstyledButton } from '@mantine/core';
import { NavItemProps, NavLinkProps } from './sidebar.types';
import classes from './SideBar.module.css';
export function SidebarLink({ icon: Icon, label, to, badge, collapsed }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Tooltip label={label} position="right" withArrow transitionProps={{ duration: 0 }} key={label}>
      <UnstyledButton className={classes.navLink} data-active={isActive} component={RouterNavLink} to={to}>
        {/* <Icon size={20} stroke={1.5} /> */}
        {collapsed ? (
          <Center>
            <Icon size={21} stroke={1.5} />
          </Center>
        ) : (
          <Group gap="sm" wrap="nowrap">
            <Icon size={21} stroke={1.5} />
            <Box style={{ flex: 1 }}>
              <Text size="sm" inherit truncate>
                {label}
              </Text>
            </Box>
            {badge && badge > 0 && (
              <Badge className={classes.badge} size="xs" variant="light" >
                {badge}
              </Badge>
            )}
          </Group>
        )}
      </UnstyledButton>
    </Tooltip>
  );
}

export function SideItem({ icon: Icon, label, onClick, collapsed }: NavItemProps) {
  return (
    <Tooltip label={label} position="right" withArrow transitionProps={{ duration: 0 }} key={label}>
      <UnstyledButton className={classes.navLink} onClick={onClick}>
        {collapsed ? (
          <Center>
            <Icon size={21} stroke={1.5} />
          </Center>
        ) : (
          <Group gap="sm" wrap="nowrap">
            <Icon size={21} stroke={1.5} />
            <Box style={{ flex: 1 }}>
              <Text size="sm" inherit truncate>
                {label}
              </Text>
            </Box>
          </Group>
        )}
      </UnstyledButton>
    </Tooltip>
  );
}
