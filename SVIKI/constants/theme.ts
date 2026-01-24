import { Platform } from 'react-native';

const tintColorLight = '#6750A4';
const tintColorDark = '#D0BCFF';

export const Colors = {
  light: {
    text: '#1C1B1F',
    background: '#F7F2FA', 
    tint: tintColorLight,
    icon: '#79747E', 
    tabIconDefault: '#79747E',
    tabIconSelected: tintColorLight,
    primary: '#6750A4',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005D',
    surfaceContainer: '#F3EDF7',
    outline: '#79747E',
    secondaryContainer: '#E8DEF8',
    onSecondaryContainer: '#1D192B',
  },
  dark: {
    text: '#E6E1E5',
    background: '#1C1B1F',
    tint: tintColorDark,
    icon: '#938F99',
    tabIconDefault: '#938F99',
    tabIconSelected: tintColorDark,
    primary: '#D0BCFF',
    onPrimary: '#381E72',
    primaryContainer: '#4F378B',
    onPrimaryContainer: '#EADDFF',
    surfaceContainer: '#2B2930',
    outline: '#938F99',
    secondaryContainer: '#4A4458',
    onSecondaryContainer: '#E8DEF8',
  },
};

export const Fonts = Platform.select({
  ios: { sans: 'system-ui', rounded: 'ui-rounded', mono: 'ui-monospace' },
  default: { sans: 'normal', rounded: 'normal', mono: 'monospace' },
});