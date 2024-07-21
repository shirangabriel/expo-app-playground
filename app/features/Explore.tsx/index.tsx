import { StyleSheet, SafeAreaView, Button, Dimensions } from 'react-native';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';

export default function Explore() {
    const width = useSharedValue(100);
    const translateY = useSharedValue<number>(0)
    const r = useSharedValue<number>(20);

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(translateY.value * 2) }],
    }));

    const animatedProps = useAnimatedProps(() => ({
        r: withTiming(r.value),
    }));

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
            if (r.value > 90) r.value = withSpring(20)
        }

        console.log(`translateY ${translateY.value} r ${r.value}`);
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
            <Button title={'Circle'} onPress={() => handleButtonPress("Circle")} />
            <Svg style={{ width: 200, height: 200 }}>
                <AnimatedCircle
                    cx="50%"
                    cy="50%"
                    fill="#b58df1"
                    animatedProps={animatedProps}
                />
            </Svg>


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
