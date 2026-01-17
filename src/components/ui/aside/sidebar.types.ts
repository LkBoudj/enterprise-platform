import type { Icon as TablerIcon } from '@tabler/icons-react';

export interface SideBarProps {
  collapsed?: boolean;
  toggle?: () => void;
}

export interface NavLinkProps {
  icon: TablerIcon;
  label: string;
  to: string;
  badge?: number;
  collapsed?: boolean;
}

export interface NavGroupProps {
  title: string;
  children: React.ReactNode;
  icon?: TablerIcon;
  collapsed?: boolean;
}