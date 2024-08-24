import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Animated as ReactAnimated, Dimensions, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

const { width, height } = Dimensions.get('window');

const timerList = [...Array(13).keys()].map(i => i === 0 ? 1 : i * 5);
const ITEM_SIZE = width * 0.32
// const ITEM_SPACING = (width - ITEM_SIZE) / 2

export default function CountDownAnimation() {

    const scrollX = React.useRef(new ReactAnimated.Value(0)).current

    const [filled, setFill] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [seconds, setSeconds] = useState<number>(1);

    const circleSize = 70;

    const circleToFillScreen = useAnimatedStyle(() => ({
        width: filled ? withTiming(width) : circleSize,
        height: filled ? withTiming(height) : circleSize,
        bottom: filled ? withTiming(0) : 100,
        borderRadius: filled ? withTiming(0) : circleSize / 2
    }))

    const unFillAnimation = useAnimatedStyle(() => ({
        height: withTiming(height - ((height / seconds) * (counter)))
    }), [counter])


    useEffect(() => {
        if (counter > 0 && counter < seconds) {
            const id = setTimeout(() => setCounter(counter + 1), 1000);
            setTimeoutId(id);
        } else if (counter >= seconds) {
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

        <ReactAnimated.FlatList
            style={{ flexGrow: 0 }}
            data={timerList}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onMomentumScrollEnd={ev => {
                const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE)
                setSeconds(timerList[index])
            }}
            keyExtractor={item => item.toString()}
            snapToInterval={ITEM_SIZE}
            decelerationRate={'fast'}
            contentContainerStyle={{ paddingHorizontal: ITEM_SIZE }}
            onScroll={ReactAnimated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }

            )}
            renderItem={({ item, index }) => {
                const inputRange = [
                    (index - 1) * ITEM_SIZE,
                    index * ITEM_SIZE,
                    (index + 1) * ITEM_SIZE,
                ]

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.4, 1, 0.4]
                })
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.6, 1.1, 0.6]
                })

                return <View style={styles.timerListView}>
                    <ReactAnimated.Text
                        style={
                            [styles.text,
                            { opacity },
                            { transform: [{ scale }] }]}>
                        {item}</ReactAnimated.Text>
                </View>

            }} />

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
    timerListView: {
        width: ITEM_SIZE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        backgroundColor: '#F55D3E',
        position: 'absolute',
    },
    text: {
        fontSize: ITEM_SIZE * 0.7,
        fontWeight: '900',
        color: 'white',
        textAlign: 'center'
    }
})