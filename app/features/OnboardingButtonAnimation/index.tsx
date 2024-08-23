import { StyleSheet, SafeAreaView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';
import ButtonView from './buttonView';
import { useEffect, useState } from 'react';
import { Indicator } from './indicator';

export default function OnboardingButtonAnimation() {
  const [showBackButton, setShowBackButton] = useState(false);
  const stepCount = 2;
  const [currentStepCount, setCurrentStepCount] = useState(0);

  useEffect(() => {
    currentStepCount > 0 ? setShowBackButton(true) : setShowBackButton(false);
    console.log(currentStepCount);

  }, [currentStepCount])

  const handleRightButtonPressed = () => {
    if (currentStepCount < stepCount) {
      setCurrentStepCount(currentStepCount + 1)
    }
  }
  const handleLeftButtonPressed = () => {
    if (currentStepCount != 0) {
      setCurrentStepCount(currentStepCount - 1)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Onboarding Animation" }} />
      <ThemedView style={styles.wrapper}>
        <Indicator paginationCount={stepCount} currentSelected={currentStepCount} />

        <ButtonView
          showLeftButton={showBackButton}
          rightButtonPressed={handleRightButtonPressed}
          leftButtonPressed={handleLeftButtonPressed}
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
    justifyContent: 'flex-end',
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
