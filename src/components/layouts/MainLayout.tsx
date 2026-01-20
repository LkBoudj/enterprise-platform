import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { SideBar } from '@/components/ui/aside'; // Ensure path is correct

export default function MainLayout() {
  const [mobileOpened] = useDisclosure(false);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      padding="md"
      // header={{ height: 60 }} // Added height for the mobile burger
      navbar={{
        width: desktopOpened ? 250 : 60, // Dynamic Width
        breakpoint: 'none',
        collapsed: {
          mobile: !mobileOpened,
          desktop: false, // We don't hide it completely, we just shrink it
        },
      }}
    >
    

      <AppShell.Navbar>
        {/* Pass state and toggle function to Sidebar */}
        <SideBar collapsed={!desktopOpened} toggle={toggleDesktop} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}