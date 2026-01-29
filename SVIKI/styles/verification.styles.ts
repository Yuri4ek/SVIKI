import { StyleSheet } from 'react-native';
import { Colors } from './theme';

export const createVerificationStyles = (theme: typeof Colors.light) => StyleSheet.create({
  flex: { flex: 1, backgroundColor: theme.background },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    marginBottom: 12,
    color: theme.onPrimaryContainer,
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 32,
    color: theme.onSurfaceVariant,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: theme.surfaceContainer,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 4,
    color: theme.onSecondaryContainer,
  },
  mainButton: {
    width: '100%',
    height: 56,
    backgroundColor: theme.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    elevation: 2,
  },
  mainButtonText: {
    color: theme.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    marginTop: 24,
    padding: 10,
  },
  secondaryButtonText: {
    color: theme.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});