import { createTheme, MantineColorsTuple, rem, rgba } from '@mantine/core';

// ألوان الجسم (Body) للوضع الداكن - لون #242424 المطلوب مع تدرجاته
const darkColors: MantineColorsTuple = [
  '#C1C1C1', // 0
  '#A6A6A6', // 1
  '#909090', // 2
  '#686868', // 3
  '#4D4D4D', // 4
  '#3D3D3D', // 5: Borders for components
  '#2E2E2E', // 6: Card Background
  '#242424', // 7: Main Body Background (المطلوب)
  '#1A1A1A', // 8: Sidebar/Header background
  '#121212', // 9: Deeper background for inputs
];

// البرتقالي الشبابي الكهربائي (Vibrant Electric Orange)
const primaryColors: MantineColorsTuple = [
  '#FFF3E5', '#FFE4CC', '#FFC699', '#FFA661', '#FF8B33',
  '#FF7914', // 5
  '#FF6A00', // 6: الأساسي (Electric)
  '#E65F00', '#CC5500', '#B34A00',
];

export const theme = createTheme({
  primaryColor: 'orange',
  primaryShade: { light: 6, dark: 5 },
  
  // دمج درجات الرمادي الداكنة الجديدة
  colors: {
    orange: primaryColors,
    dark: darkColors,
  },

  // إعدادات الوضع الداكن الاحترافية
  components: {
    AppShell: {
      styles: (theme) => ({
        main: {
          backgroundColor: '#242424',
          color: '#E2E2E2',
        },
        header: {
          backgroundColor: '#1A1A1A',
          borderBottom: '1px solid #333333',
        },
        navbar: {
          backgroundColor: '#1A1A1A',
          borderRight: '1px solid #333333',
        },
      }),
    },

    Paper: {
      defaultProps: { withBorder: true, radius: 'lg' },
      styles: (theme) => ({
        root: {
          // في الوضع الداكن، البطاقة تكون أفتح قليلاً من الخلفية لتعطي عمقاً
          backgroundColor: '#2E2E2E', 
          borderColor: '#3D3D3D',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'var(--mantine-color-orange-5)',
            transform: 'translateY(-2px)',
          },
        },
      }),
    },

    Card: {
      styles: {
        root: {
          backgroundColor: '#2E2E2E',
          borderColor: '#3D3D3D',
        },
      },
    },

    Input: {
      styles: (theme) => ({
        input: {
          backgroundColor: '#1A1A1A',
          borderColor: '#3D3D3D',
          color: '#FFFFFF',
          '&:focus': {
            borderColor: 'var(--mantine-color-orange-5)',
          },
        },
      }),
    },

    Button: {
      styles: {
        root: {
          fontWeight: 600,
          '&:active': { transform: 'scale(0.96)' },
        },
      },
    },
  },

  other: {
    // إخفاء الـ Focus Ring التقليدي واستبداله بلمسة برتقالية
    focusRing: 'auto',
  },
});