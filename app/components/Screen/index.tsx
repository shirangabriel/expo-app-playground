import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { GoBackButton } from '../Button';

type Props = {
  children: React.ReactNode,
  style?: any,
  title?: string,
  headerShown?: boolean,
  showCustomBackButton?: boolean,
  backButtonColor?: string
}


export default function Screen({ children, style, title, headerShown, showCustomBackButton, backButtonColor }: Props) {
  return (
    <>
      <Stack.Screen options={{ title, headerShown: headerShown && title ? true : false }} />
      <ThemedView style={[styles.container, style]}>
        {children}
      </ThemedView>
      {!headerShown && showCustomBackButton && <GoBackButton color={backButtonColor} />}
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
