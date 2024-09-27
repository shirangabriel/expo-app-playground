import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { GoBackButton } from '../Button';

type Props = {
  children: React.ReactNode,
  style?: any,
  title?: string,
  headerShown?: boolean,
  hideBackButton?: boolean,
  backButtonColor?: string
}


export default function Screen({ children, style, title, headerShown, hideBackButton, backButtonColor }: Props) {
  return (
    <>
      <Stack.Screen options={{ title, headerShown }} />
      <ThemedView style={[styles.container, style]}>
        {children}
      </ThemedView>
      {!headerShown && !hideBackButton && <GoBackButton color={backButtonColor} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
