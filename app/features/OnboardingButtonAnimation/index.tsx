import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';
import Features from '@/app';
import ButtonView from './buttonView';
import { useState } from 'react';

export default function OnboardingButtonAnimation() {
  const [showBackButton, setShowBackButton] = useState(true);


  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  type ItemProps = { title: string };

  const Item = ({ title }: ItemProps) => (
    <ThemedView style={styles.item}>
      <ThemedText style={styles.title}>{title}</ThemedText>
    </ThemedView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Onboarding Animation" }} />
      <ThemedView style={styles.wrapper}>
        <View style={styles.dotIndicatorWrapper}>
          <View style={styles.dotIndicator} />
          <View style={[styles.dotIndicator, styles.dotIndicatorActive]} />
          <View style={styles.dotIndicator} />
        </View>

        <ButtonView
          showLeftButton={showBackButton}
          rightButtonPressed={() => setShowBackButton(true)}
          leftButtonPressed={() => setShowBackButton(false)}
        />

      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  dotIndicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100

  },
  dotIndicator: {
    height: 15,
    width: 15,
    backgroundColor: 'gray',
    borderRadius: 10
  },
  dotIndicatorActive: {
    borderColor: 'red',
    borderWidth: 2
  }
});
