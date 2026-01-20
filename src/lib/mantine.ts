import { createTheme, MantineColorsTuple, rem, rgba } from '@mantine/core';

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

const primaryColors: MantineColorsTuple = [
  '#FFF3E5', '#FFE4CC', '#FFC699', '#FFA661', '#FF8B33',
  '#FF7914', // 5
  '#FF6A00', // 6: الأساسي (Electric)
  '#E65F00', '#CC5500', '#B34A00',
];

export const theme = createTheme({
  primaryColor: 'orange',
  primaryShade: { light: 6, dark: 5 },
  scale: .85,

});