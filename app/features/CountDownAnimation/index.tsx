import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, TextInput, Vibration, View } from "react-native";

const { width, height } = Dimensions.get('window');

const timerList = [...Array(13).keys()].map(i => i === 0 ? 1 : i * 5);
const ITEM_SIZE = width * 0.32
// const ITEM_SPACING = (width - ITEM_SIZE) / 2

export default function CountDownAnimation() {
    const scrollX = React.useRef(new Animated.Value(0)).current
    const inputRef = React.useRef();
    const [seconds, setSeconds] = useState<number>(1);
    const timerAnimation = React.useRef(new Animated.Value(height)).current
    const buttonAnimation = React.useRef(new Animated.Value(0)).current
    const textInputAnimation = React.useRef(new Animated.Value(timerList[0])).current


    useEffect(() => {
        const listener = textInputAnimation.addListener(({ value }) => {
            inputRef?.current?.setNativeProps({
                text: Math.ceil(value).toString(),
            });
        })


        return () => {
            textInputAnimation.removeListener(listener);
            textInputAnimation.removeAllListeners()
        }

    })


    const animation = React.useCallback(() => {
        textInputAnimation.setValue(seconds);
        Animated.sequence([
            Animated.timing(buttonAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(timerAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),


            Animated.parallel([
                Animated.timing(textInputAnimation, {
                    toValue: 0,
                    duration: seconds * 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(timerAnimation, {
                    toValue: height,
                    duration: seconds * 1000,
                    useNativeDriver: true,
                })
            ]),

            Animated.delay(400)

        ]).start(() => {
            Vibration.cancel();
            Vibration.vibrate();
            textInputAnimation.setValue(seconds)
            Animated.timing(buttonAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start()
        })
    }, [seconds])


    const opacity = buttonAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    })
    const translateY = buttonAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200]
    })

    const textOpacity = buttonAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })



    return <View style={styles.container}>
        <Stack.Screen options={{ headerTitle: "", headerShown: false }} />
        <Animated.View
            style={[StyleSheet.absoluteFill, {
                height,
                width,
                backgroundColor: '#F55D3E',
                transform: [{
                    translateY: timerAnimation
                }]
            }]}
        />

        <Animated.View style={[
            styles.circle,
            {
                width: 50,
                height: 50,
                bottom: 200,
                opacity,
                transform: [{
                    translateY
                }]
            }

        ]}
            onTouchEnd={animation} />



        <Animated.View style={{
            position: 'absolute',
            justifyContent: 'center',
            alignSelf: "center",
            opacity: textOpacity
        }}>
            <TextInput ref={inputRef} style={[styles.text]} defaultValue={seconds.toString()} />
        </Animated.View>

        <Animated.FlatList
            style={{ flexGrow: 0, opacity }}
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
            onScroll={Animated.event(
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
                    outputRange: [0.7, 1, 0.7]
                })

                return <View style={styles.timerListView}>
                    <Animated.Text
                        style={
                            [styles.text,
                            { opacity },
                            { transform: [{ scale }] }]}>
                        {item}</Animated.Text>
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
        borderRadius: 50
    },
    text: {
        fontSize: ITEM_SIZE * 0.7,
        fontWeight: '900',
        color: 'white',
        textAlign: 'center'
    }
})