import { createTheme, MantineColorsTuple, rem } from '@mantine/core';

// Modern color palette
const primaryColors: MantineColorsTuple = [
  '#e6f7ff',
  '#d0ebff',
  '#9bd4ff',
  '#61bcff',
  '#34a8ff',
  '#169bff', // Primary 500
  '#008cff',
  '#0077d9',
  '#0066b8',
  '#005499'
];

const successColors: MantineColorsTuple = [
  '#e6f9f0',
  '#c8f0dd',
  '#90e1b9',
  '#51d292',
  '#20c573',
  '#00b85c', // Success 500
  '#00a552',
  '#008f46',
  '#00763a',
  '#005d2e'
];

const warningColors: MantineColorsTuple = [
  '#fff8e6',
  '#ffefcc',
  '#ffdd99',
  '#ffca66',
  '#ffba3f',
  '#ffae20', // Warning 500
  '#ff9c00',
  '#e68900',
  '#cc7700',
  '#b36600'
];

const errorColors: MantineColorsTuple = [
  '#ffe6e6',
  '#ffcccc',
  '#ff9999',
  '#ff6666',
  '#ff3f3f',
  '#ff2020', // Error 500
  '#ff0000',
  '#e60000',
  '#cc0000',
  '#b30000'
];

const grayColors: MantineColorsTuple = [
  '#f8fafc',
  '#f1f5f9',
  '#e2e8f0',
  '#cbd5e1',
  '#94a3b8',
  '#64748b',
  '#475569',
  '#334155',
  '#1e293b',
  '#0f172a'
];

export const theme = createTheme({
  primaryColor: 'primary',
  primaryShade: { light: 5, dark: 7 },
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, Consolas, Monaco, monospace',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: rem(48), lineHeight: '1.1' },
      h2: { fontSize: rem(36), lineHeight: '1.2' },
      h3: { fontSize: rem(30), lineHeight: '1.3' },
      h4: { fontSize: rem(24), lineHeight: '1.4' },
      h5: { fontSize: rem(20), lineHeight: '1.5' },
      h6: { fontSize: rem(16), lineHeight: '1.5' },
    },
  },
  
  colors: {
    primary: primaryColors,
    success: successColors,
    warning: warningColors,
    error: errorColors,
    gray: grayColors,
  },
  
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.08)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
  
  radius: {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },
  
  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },
  
  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: rem(480),
          sm: rem(640),
          md: rem(768),
          lg: rem(1024),
          xl: rem(1280),
        },
      },
    },
    
    Paper: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
        withBorder: true,
      },
      styles: {
        root: {
          borderColor: 'var(--mantine-color-default-border)',
          backgroundColor: 'var(--mantine-color-body)',
        },
      },
    },
    
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'md',
        padding: 'lg',
        withBorder: true,
      },
      styles: {
        root: {
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 'var(--mantine-shadow-xl)',
          },
        },
      },
    },
    
    Button: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
      styles: {
        root: {
          transition: 'all 0.2s ease',
        },
      },
    },
    
    Input: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
      styles: {
        input: {
          borderColor: 'var(--mantine-color-default-border)',
          '&:focus': {
            borderColor: 'var(--mantine-color-primary-5)',
          },
        },
      },
    },
    
    Select: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
    },
    
    Table: {
      styles: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: 0,
          '& thead tr th': {
            borderBottom: '2px solid var(--mantine-color-default-border)',
            backgroundColor: 'var(--mantine-color-body)',
            fontWeight: 600,
            position: 'sticky',
            top: 0,
            zIndex: 1,
          },
          '& tbody tr': {
            transition: 'background-color 0.2s ease',
            '&:hover': {
              backgroundColor: 'var(--mantine-color-gray-0)',
              '@media (prefers-color-scheme: dark)': {
                backgroundColor: 'var(--mantine-color-dark-6)',
              },
            },
          },
        },
      },
    },
    
    NavLink: {
      styles: {
        root: {
          borderRadius: 'var(--mantine-radius-md)',
          '&:hover': {
            backgroundColor: 'var(--mantine-color-primary-0)',
          },
          '&[data-active]': {
            backgroundColor: 'var(--mantine-color-primary-1)',
            color: 'var(--mantine-color-primary-7)',
            fontWeight: 600,
          },
        },
      },
    },
    
    AppShell: {
      styles: {
        main: {
          backgroundColor: 'var(--mantine-color-body)',
        },
        navbar: {
          backgroundColor: 'var(--mantine-color-body)',
          borderRight: '1px solid var(--mantine-color-default-border)',
        },
        header: {
          backgroundColor: 'var(--mantine-color-body)',
          borderBottom: '1px solid var(--mantine-color-default-border)',
        },
        aside: {
          backgroundColor: 'var(--mantine-color-body)',
          borderLeft: '1px solid var(--mantine-color-default-border)',
        },
      },
    },
  },
  
  other: {
    dashboard: {
      sidebarWidth: rem(280),
      headerHeight: rem(64),
      footerHeight: rem(48),
      borderRadius: 'lg',
      transitionSpeed: '0.2s',
      breakpoints: {
        mobile: '768px',
        tablet: '1024px',
        desktop: '1280px',
      },
    },
  },
  
  // Enhanced dark mode colors
  autoContrast: true,
  luminanceThreshold: 0.3,
  
  defaultGradient: {
    from: 'primary.5',
    to: 'primary.7',
    deg: 135,
  },
});