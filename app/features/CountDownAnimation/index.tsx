import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function CountDownAnimation() {
    const [filled, setFill] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const { width, height } = Dimensions.get('window');
    const circleSize = 50;
    const steps = 5


    const circleToFillScreen = useAnimatedStyle(() => ({
        width: filled ? withTiming(width) : circleSize,
        height: filled ? withTiming(height) : circleSize,
        bottom: filled ? withTiming(0) : 100,
        borderRadius: filled ? withTiming(0) : circleSize / 2
    }))

    const unFillAnimation = useAnimatedStyle(() => ({
        height: withTiming(height - ((height / steps) * (counter)))
    }), [counter])


    useEffect(() => {
        if (counter > 0 && counter < steps) {
            const id = setTimeout(() => setCounter(counter + 1), 1000);
            setTimeoutId(id);
        } else if (counter >= steps) {
            console.log('Stopped ticking after 5 seconds.');

            setFill(false)

        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [counter])


    useEffect(() => {
        console.log({ filled, counter });

        if (filled && counter === 0) {
            setTimeout(() => {
                startTicking()
            }, 300);
        } else {
            // stop
            stopTicking()
            setCounter(0)
        }
    }, [filled])


    const handleButtonPress = () => {
        setFill(!filled)
    }

    const startTicking = () => {
        if (counter === 0) {
            setCounter(1); // Start the ticking process
        }
    };

    const stopTicking = () => {
        if (timeoutId) {
            clearTimeout(timeoutId); // Cancel the scheduled tick
            console.log('Ticking stopped by stopTicking function.');
        }
    };



    return <View style={styles.container}>
        <Stack.Screen options={{ headerTitle: "", headerShown: false }} />
        <Animated.View style={
            [styles.circle, circleToFillScreen,
            (counter > 0 && unFillAnimation)]}
            onTouchEnd={handleButtonPress} />
        <Text style={styles.text}>{steps - counter}</Text>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#172A3A'
        backgroundColor: '#242331'
    },
    circle: {
        backgroundColor: '#F55D3E',
        position: 'absolute',
    },
    text: {
        fontSize: 76,
        fontWeight: 'bold',
        marginBottom: '50%',
        color: 'white',
    }
})