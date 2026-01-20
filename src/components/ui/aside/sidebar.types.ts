import type { Icon as TablerIcon } from '@tabler/icons-react';

export interface SideBarProps {
  collapsed?: boolean;
  toggle?: () => void;
}

export interface BaseNavItemProps {
  icon: TablerIcon;
  label: string;
  badge?: number;
  collapsed?: boolean;
}

export interface NavItemProps extends BaseNavItemProps {
  onClick?: () => void;
}
export interface NavLinkProps extends BaseNavItemProps {
  to: string;
}

export interface NavGroupProps {
  title: string;
  children: React.ReactNode;
  icon?: TablerIcon;
  collapsed?: boolean;
}
