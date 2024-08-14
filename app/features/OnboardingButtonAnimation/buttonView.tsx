import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView"
import { StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

type Props = {
    showLeftButton: boolean;
    rightButtonPressed: () => void;
    leftButtonPressed: () => void;
}


export default function ButtonView({ showLeftButton, rightButtonPressed, leftButtonPressed }: Props) {
    const leftButtonWidth = showLeftButton ? "50%" : 0
    const rightButtonWidth = showLeftButton ? "50%" : "100%"


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
        width: '100%',
        height: 60,
        paddingHorizontal: 20,
        // gap: 10
    },
    button: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        height: 60,


    },
    primaryButton: {
        backgroundColor: "#172A3A",
    },
    secondaryButton: {
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: '#E2EBF3',
    },
    buttonText: {
        color: 'white'
    }
});