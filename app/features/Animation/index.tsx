import { StyleSheet, SafeAreaView, Button, Dimensions, View } from 'react-native';
import Animated, { Easing, FlipInEasyX, FlipOutEasyY, Keyframe, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';
import React from 'react';
import SomeComponent from './SomeClass';

export default function Explore() {
    const width = useSharedValue(100);
    const translateY = useSharedValue<number>(0)
    const r = useSharedValue<number>(20);
    const someWidth = useSharedValue<number>(50);
    const showOrHide = useSharedValue<boolean>(false);

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const AnimatedSquare = Animated.createAnimatedComponent(SomeComponent);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(translateY.value * 2) }],
    }));

    const animatedProps = useAnimatedProps(() => ({
        r: withTiming(r.value),
    }));


    const animatedPropsForSomeComponent = useAnimatedProps(() => ({
        // width: withTiming(someWidth.value),
        counter: someWidth.value
    }));

    const keyframe = new Keyframe({
        0: {
            transform: [{ rotate: '0deg' }],
        },
        45: {
            transform: [{ rotate: '100deg' }],
            easing: Easing.exp,
        },
        100: {
            transform: [{ rotate: '45deg' }],
        },
    });



    const handleButtonPress = (name: string) => {
        if (name == "Increase Button Width") {
            width.value = withSpring(width.value + 50)

            if (width.value > Dimensions.get('window').width)
                width.value = withSpring(100)
        }

        if (name == "Move") {
            translateY.value += 50;

            if (translateY.value > 150) {
                translateY.value = 0
            }
        }

        if (name == "Circle") {
            r.value += 10;
            if (r.value > 48) r.value = withSpring(20)
        }

        if (name == "Square") {
            someWidth.value += 10;
        }
        if (name == "Show/Hide") {
            showOrHide.value = !showOrHide.value;
        }

        console.log(`translateY ${translateY.value} r ${r.value}, someWidth ${someWidth.value}`);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View
                style={[{
                    width,
                    height: 100,
                    backgroundColor: 'violet',
                }, animatedStyles]}
            />
            <Button title='Increase Button Width' onPress={() => handleButtonPress("Increase Button Width")} />
            <Button title={'Move Down'} onPress={() => handleButtonPress("Move")} />
            <Svg style={{ width: 100, height: 100 }}>
                <AnimatedCircle
                    cx="50%"
                    cy="50%"
                    fill="#b58df1"
                    animatedProps={animatedProps}
                />
            </Svg>
            <Button title={'Circle'} onPress={() => handleButtonPress("Circle")} />

            <AnimatedSquare counter={someWidth.value} animatedProps={animatedPropsForSomeComponent} />
            <Button title={'Square'} onPress={() => handleButtonPress("Square")} />
            <Animated.View style={{ width: 100, height: 100, backgroundColor: 'red' }}
                entering={FlipInEasyX.duration(5000).easing(Easing.ease)} exiting={FlipOutEasyY} />
            <Button title={'Show/Hide'} onPress={() => handleButtonPress("Show/Hide")} />

        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 2,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
    },
});
