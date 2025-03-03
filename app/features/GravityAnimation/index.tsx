import Screen from '@/app/components/Screen';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Animated, Easing, Button } from 'react-native';

const { width, height } = Dimensions.get('window');

const GravityAnimation: React.FC = () => {
  const ballSize = 50;
  const [isDropped, setIsDropped] = useState(false);
  const ballPosition = useRef(new Animated.Value(0)).current;
  const toValue = (height / 2) - ballSize;

  const handlePress = () => {
    if (!isDropped) {
      Animated.sequence([
        // Initial drop
        Animated.timing(ballPosition, {
          toValue: toValue,
          duration: 800,
          easing: Easing.quad,
          useNativeDriver: false,
        }),
        // First bounce
        Animated.spring(ballPosition, {
          toValue: toValue - 30,
          friction: 3,
          tension: 100,
          useNativeDriver: false,
        }),
      ]).start();
      setIsDropped(true);
    }
  };

  const resetBall = () => {
    Animated.spring(ballPosition, {
      toValue: 0,
      friction: 3,
      tension: 10,
      useNativeDriver: false,
    }).start();
    setIsDropped(false);
  };

  return (
    <Screen>
      <Pressable
        style={styles.container}
        onPress={handlePress}
      >
        <Animated.View
          style={[
            styles.ball,
            {
              transform: [{
                translateY: ballPosition
              }]
            }
          ]}
        />
      </Pressable>
      <View style={styles.buttonContainer}>
        <Button
          title="Reset Ball"
          onPress={resetBall}
          disabled={!isDropped}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    right: 0,
    width: '100%',
    justifyContent: 'flex-end',
    padding: 16
  },
});

export default GravityAnimation;
