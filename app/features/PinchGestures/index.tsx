import { StyleSheet, Image } from 'react-native';
import Screen from '@/app/components/Screen';
import { Gesture, GestureDetector, GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function PinchGestures() {
    const IMAGE_URI = "https://images.unsplash.com/photo-1726065809961-bbfd67737399?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });
    const start = useSharedValue({ x: 0, y: 0 });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x },
                { translateY: offset.value.y },
                { scale: withSpring(isPressed.value ? 1.2 : 1) },
            ],
            backgroundColor: isPressed.value ? 'yellow' : 'blue',
        };
    });

    const gesture = Gesture.Pan()
        .onBegin(() => { isPressed.value = true; })
        .onUpdate((event) => {
            offset.value = {
                x: event.translationX + start.value.x,
                y: event.translationY + start.value.y,
            }
        })
        .onEnd(() => {
            start.value = { x: offset.value.x, y: offset.value.y };
        })
        .onFinalize(() => {
            isPressed.value = false;
        })

    return (
        <Screen title='Pinch Gestures' headerShown={false} backButtonColor='white'>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.ball, animatedStyles]} />
            </GestureDetector>
        </Screen>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        display: 'flex',
        flex: 1,
        width: '10%',
        height: '10%'
    },
    ball: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'blue',
        alignSelf: 'center',
    },
});
