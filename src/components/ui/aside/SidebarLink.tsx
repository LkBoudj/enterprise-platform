import { Box, Group, Text, Tooltip, UnstyledButton, Badge, rem, alpha, useMantineTheme, useComputedColorScheme, Center } from '@mantine/core';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { NavLinkProps } from './sidebar.types';


export function SidebarLink({ icon: Icon, label, to, badge, collapsed }: NavLinkProps) {
  const theme = useMantineTheme();
  const location = useLocation();
  const isActive = location.pathname === to;
  const colorScheme = useComputedColorScheme('light');

  const activeBg = colorScheme === 'dark' 
    ? alpha(theme.colors[theme.primaryColor][9], 0.3) 
    : alpha(theme.colors[theme.primaryColor][0], 1);
  const activeColor = colorScheme === 'dark' 
    ? theme.colors[theme.primaryColor][2] 
    : theme.colors[theme.primaryColor][7];
  const inactiveColor = colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];
  const hoverBg = colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0];

  return (
    <Tooltip label={label} position="right" withArrow transitionProps={{ duration: 0 }} disabled={!collapsed}>
      <UnstyledButton
        component={RouterNavLink}
        to={to}
        style={{
          display: 'block',
          width: '100%',
          padding: collapsed ? `${rem(8)} 0` : `${rem(8)} ${rem(12)}`,
          borderRadius: theme.radius.md,
          color: isActive ? activeColor : inactiveColor,
          backgroundColor: isActive ? activeBg : 'transparent',
          fontWeight: isActive ? 600 : 500,
          fontSize: theme.fontSizes.sm,
          transition: 'all 0.2s ease',
          marginBottom: rem(4),
          textAlign: collapsed ? 'center' : 'left',
        }}
        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = hoverBg; }}
        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        {collapsed ? (
          <Center><Icon size={20} stroke={1.5} /></Center>
        ) : (
          <Group gap="sm" wrap="nowrap">
            <Icon size={18} stroke={1.5} />
            <Box style={{ flex: 1 }}>
              <Text size="sm" inherit truncate>{label}</Text>
            </Box>
            {badge && badge > 0 && (
              <Badge size="xs" variant="light" color={isActive ? theme.primaryColor : 'gray'}>
                {badge}
              </Badge>
            )}
          </Group>
        )}
      </UnstyledButton>
    </Tooltip>
  );
}