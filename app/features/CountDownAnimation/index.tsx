import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, TextInput, Vibration, View } from "react-native";
import ListView from "./ListView";
import { GoBackButton } from "@/app/components/Button";

const { width, height } = Dimensions.get('window');

const timerList = [...Array(13).keys()].map(i => i === 0 ? 1 : i * 5);
const ITEM_SIZE = width / 3

export default function CountDownAnimation() {
    const inputRef = React.useRef();
    const [duration, setDuration] = useState<number>(1);
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
        textInputAnimation.setValue(duration);
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
                    duration: duration * 100,
                    useNativeDriver: true,
                }),
                Animated.timing(timerAnimation, {
                    toValue: height,
                    duration: duration * 100,
                    useNativeDriver: true,
                })
            ]),

            Animated.delay(400)

        ]).start(() => {
            Vibration.cancel();
            Vibration.vibrate();
            textInputAnimation.setValue(duration)
            Animated.timing(buttonAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start()
        })
    }, [duration])


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
        <GoBackButton />
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
            <TextInput ref={inputRef} style={[styles.text]} defaultValue={duration.toString()} />
        </Animated.View>

        <ListView
            timerList={timerList}
            itemSize={ITEM_SIZE}
            onScrollEnd={(d) => setDuration(d)}
            listOpacity={opacity}
            textStyle={styles.text} />



    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#242331'
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