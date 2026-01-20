import { create } from 'zustand';

interface SidebarState {
  desktopOpened: boolean;
  mobileOpened: boolean;
  toggleDesktop: () => void;
  toggleMobile: () => void;
  handleToggle: (isMobile: boolean) => void;
}
export const useSidebarStore = create<SidebarState>((set) => {
  return {
    desktopOpened: true,
    mobileOpened: false,
    toggleDesktop: () => set((state: any) => ({ desktopOpened: !state.desktopOpened })),
    toggleMobile: () => set((state: any) => ({ mobileOpened: !state.mobileOpened })),
    handleToggle: (isMobile: boolean) =>
      isMobile
        ? set((state: any) => ({ mobileOpened: !state.mobileOpened }))
        : set((state: any) => ({ desktopOpened: !state.desktopOpened })),
  };
});
