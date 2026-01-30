import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Burger, Group, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { SideBar } from '@/components/ui/aside'; // Ensure path is correct
import { useSidebarStore } from '@/store/use-sidebarStore';

export default function MainLayout() {

  
   const {desktopOpened,  mobileOpened,handleToggle } = useSidebarStore();

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme?.breakpoints?.sm})`);


  return (
    <AppShell
      padding="md"
      navbar={{
        width: { base: 60, md: !desktopOpened ? 250 : 60 }, //, // Dynamic Width
        breakpoint: 'sm',
        collapsed: {
          mobile: !mobileOpened,
          desktop: false, // We don't hide it completely, we just shrink it
        },
      }}
    >


      <AppShell.Navbar w={{ base: 60, md: !desktopOpened ? 250 : 60 }}>
        {/* Pass state and toggle function to Sidebar */}
        <SideBar
          collapsed={desktopOpened}
          toggle={() => handleToggle(isMobile)}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
