import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconHelp,
  IconSettings,
  IconShield,
  IconUsers,
  IconPackage, // Import IconPackage for Products
} from '@tabler/icons-react';

export const MAIN_LINKS = [
  { icon: IconDashboard, label: 'Dashboard', to: '/' },
  { icon: IconUsers, label: 'Users', to: '/users', badge: 3 },
  { icon: IconPackage, label: 'Products', to: '/products' }, // Added Products link
  { icon: IconChartBar, label: 'Analytics', to: '/analytics' },
  { icon: IconDatabase, label: 'Data', to: '/data' },
  { icon: IconShield, label: 'Security', to: '/security' },
];

export const SECONDARY_LINKS = [
  { icon: IconSettings, label: 'Settings', to: '/settings' },
  { icon: IconHelp, label: 'Help & Support', to: '/support' },
];

export const MOCK_USER = {
  name: 'Alex Johnson',
  email: 'alex.admin@company.com',
  role: 'Admin',
  initials: 'AJ',
};