
import { GoBackButton } from '@/app/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Link, Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, StatusBar, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Animated, { interpolateColor, useAnimatedProps, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
type Props = {

}
type Theme = 'light' | 'dark'

export default function ChangeTheme() {
    const [theme, setTheme] = useState<Theme>('light');

    const SWITCH_TRACK_COLOR = {
        true: 'rgba(256, 0, 256, 0.2)',
        false: 'rgba(0, 0, 0, 0.1)'
    }

    const CircleBg = {
        light: '#fff',
        dark: '#000000',
    }
    const CircleShadow = {
        light: '#000',
        dark: '#fff',
    }

    const backgroundStyle = useAnimatedStyle(() => ({
        backgroundColor: withTiming(theme === 'dark' ? Colors.dark.background : Colors.light.background)
    }))
    const CircleBackgroundStyle = useAnimatedStyle(() => ({
        backgroundColor: withTiming(theme === 'dark' ? CircleBg.dark : CircleBg.light),
        shadowColor: withTiming(theme === 'dark' ? CircleShadow.dark : CircleShadow.light)
    }))
    const textStyle = useAnimatedStyle(() => ({
        color: withTiming(theme === 'dark' ? Colors.dark.text : Colors.light.text)
    }))



    return <Animated.View style={[styles.container, backgroundStyle]}>
        <StatusBar barStyle={theme === 'dark' ? "light-content" : "dark-content"} />
        <GoBackButton />
        <Stack.Screen
            options={{
                headerTitle: "Change Theme",
                headerShown: false,
            }} />
        <Animated.Text style={[styles.titleStyle, textStyle]}>Theme</Animated.Text>
        <Animated.View style={[styles.circle, CircleBackgroundStyle]}>
            <Switch
                value={theme === 'dark'}
                onValueChange={(toggle) => {
                    setTheme(toggle ? 'dark' : 'light')
                }}
                trackColor={SWITCH_TRACK_COLOR} />

        </Animated.View>

    </Animated.View>
}

const CircleSize = Dimensions.get('window').width * 0.7;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: CircleSize,
        height: CircleSize,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: CircleSize / 2,
        shadowRadius: 10,
        shadowOpacity: 0.1
    },
    titleStyle: {
        fontSize: 60,
        textTransform: 'uppercase',
        fontWeight: '900',
        letterSpacing: 10,
        marginBottom: 20
    }
})
