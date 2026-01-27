// Основные базовые оттенки (Seed colors)
const primaryLight = '#6750A4';
const primaryDark = '#D0BCFF';

export const Colors = {
  light: {
    // Primary: Основные элементы (кнопки, активные состояния)
    primary: primaryLight,
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005D',

    // Secondary: Вспомогательные элементы (чипы, фильтры)
    secondary: '#625B71',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8DEF8',
    onSecondaryContainer: '#1D192B',

    // Tertiary: Акценты для баланса (уведомления, редкие действия)
    tertiary: '#7D5260',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FFD8E4',
    onTertiaryContainer: '#31111D',

    // Error: Статусы ошибок
    error: '#B3261E',
    onError: '#FFFFFF',
    errorContainer: '#F9DEDC',
    onErrorContainer: '#410E0B',

    // Surface: Фон и контейнеры
    background: '#FEF7FF',
    onBackground: '#1D1B20',
    surface: '#FEF7FF',
    onSurface: '#1D1B20',
    
    // Варианты Surface для иерархии карточек
    surfaceVariant: '#E7E0EC',
    onSurfaceVariant: '#49454F',
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerLow: '#F7F2FA',
    surfaceContainer: '#F3EDF7',
    surfaceContainerHigh: '#ECE6F0',
    surfaceContainerHighest: '#E6E0E9',

    // Outline: Границы и разделители
    outline: '#79747E',
    outlineVariant: '#CAC4D0',

    // Дополнительные (из твоего старого файла)
    tint: primaryLight,
    icon: '#49454F',
    tabIconDefault: '#49454F',
    tabIconSelected: primaryLight,
  },
  dark: {
    // Primary
    primary: primaryDark,
    onPrimary: '#381E72',
    primaryContainer: '#4F378B',
    onPrimaryContainer: '#EADDFF',

    // Secondary
    secondary: '#CCC2DC',
    onSecondary: '#332D41',
    secondaryContainer: '#4A4458',
    onSecondaryContainer: '#E8DEF8',

    // Tertiary
    tertiary: '#EFB8C8',
    onTertiary: '#492532',
    tertiaryContainer: '#633B48',
    onTertiaryContainer: '#FFD8E4',

    // Error
    error: '#F2B8B5',
    onError: '#601410',
    errorContainer: '#8C1D18',
    onErrorContainer: '#F9DEDC',

    // Surface
    background: '#141218',
    onBackground: '#E6E1E5',
    surface: '#141218',
    onSurface: '#E6E1E5',

    // Варианты Surface
    surfaceVariant: '#49454F',
    onSurfaceVariant: '#CAC4D0',
    surfaceContainerLowest: '#0F0D13',
    surfaceContainerLow: '#1D1B20',
    surfaceContainer: '#211F26',
    surfaceContainerHigh: '#2B2930',
    surfaceContainerHighest: '#36343B',

    // Outline
    outline: '#938F99',
    outlineVariant: '#49454F',

    // Дополнительные
    tint: primaryDark,
    icon: '#938F99',
    tabIconDefault: '#938F99',
    tabIconSelected: primaryDark,
  },
};