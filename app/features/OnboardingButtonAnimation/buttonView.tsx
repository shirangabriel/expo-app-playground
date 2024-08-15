import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView"
import { StyleSheet, useWindowDimensions } from "react-native"
import Animated, { useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";

type Props = {
    showLeftButton: boolean;
    rightButtonPressed: () => void;
    leftButtonPressed: () => void;
}


export default function ButtonView({ showLeftButton, rightButtonPressed, leftButtonPressed }: Props) {
    const { width: windowWidth } = useWindowDimensions();
    const horizontalPadding = 16;
    const smallButtonWidth = (windowWidth / 3) - (horizontalPadding)

    const leftButtonWidth = showLeftButton ? smallButtonWidth : 0
    const rightButtonWidth = showLeftButton ? smallButtonWidth * 2 : (smallButtonWidth * 3)


    const leftAnimatedStyle = useAnimatedStyle(() => ({
        width: withTiming(leftButtonWidth),
        opacity: withTiming(showLeftButton ? 1 : 0),
        marginRight: withTiming(showLeftButton ? 10 : 0)
    }))
    const rightAnimatedStyle = useAnimatedStyle(() => ({
        width: withTiming(rightButtonWidth)
    }))


    return <ThemedView style={styles.buttonWrapper}>
        <Animated.View
            onTouchEnd={leftButtonPressed}
            style={[styles.button, styles.secondaryButton, leftAnimatedStyle]}>
            <ThemedText type='defaultSemiBold'>Back</ThemedText>
        </Animated.View>
        <Animated.View
            onTouchEnd={rightButtonPressed}
            style={[styles.button, styles.primaryButton, rightAnimatedStyle]}>
            <ThemedText style={styles.buttonText} type='defaultSemiBold'>Continue</ThemedText>
        </Animated.View>
    </ThemedView>
}


const styles = StyleSheet.create({
    buttonWrapper: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        marginBottom: 50
    },
    button: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        height: 50,
    },
    primaryButton: {
        backgroundColor: "#3375F6",
    },
    secondaryButton: {
        borderColor: 'gray',
        backgroundColor: '#F5F5F5',
    },
    buttonText: {
        color: 'white'
    }
});