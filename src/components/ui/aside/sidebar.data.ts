import { IconLayoutDashboardFilled, IconShieldFilled, IconSettingsFilled, IconHelpOctagonFilled, IconCloudComputingFilled, IconChartDots3Filled, IconUserFilled } from "@tabler/icons-react";


/**
 * الروابط الأساسية: تم استخدام أيقونات Filled بالكامل لتعزيز التباين البصري.
 */
export const MAIN_LINKS = [
  { 
    icon: IconLayoutDashboardFilled, 
    label: 'Dashboard', 
    to: '/' 
  },
  { 
    icon: IconUserFilled, 
    label: 'Users', 
    to: '/users', 
    badge: 3 
  },
  { 
    icon: IconChartDots3Filled
, 
    label: 'Analytics', 
    to: '/analytics' 
  },
  { 
    icon: IconCloudComputingFilled, 
    label: 'Data Storage', 
    to: '/data' 
  },
  { 
    icon: IconShieldFilled, 
    label: 'Security', 
    to: '/security' 
  },
];

/**
 * الروابط الثانوية: متوافقة مع النمط الممتلئ.
 */
export const SECONDARY_LINKS = [
  { 
    icon: IconSettingsFilled, 
    label: 'Settings', 
    to: '/settings' 
  },
  { 
    icon: IconHelpOctagonFilled, 
    label: 'Help & Support', 
    to: '/support' 
  },
];

/**
 * بيانات المستخدم: إضافة حالة "متصل" لتعزيز التفاعل الشبابي في الواجهة.
 */
export const MOCK_USER = {
  name: 'Alex Johnson',
  email: 'alex.admin@company.com',
  role: 'Administrator',
  initials: 'AJ',
  status: 'online', // تظهر كنقطة Success برتقالية أو خضراء
  avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
};