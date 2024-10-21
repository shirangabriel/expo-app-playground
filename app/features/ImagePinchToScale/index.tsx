import Screen from "@/app/components/Screen"
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const ImagePinchToScale = () => {
    const IMAGE_URI = "https://images.unsplash.com/photo-1726065809961-bbfd67737399?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    let { height: stageHeight, width: stageWidth } = useWindowDimensions();

    const scale = useSharedValue(1);
    const focalPointX = useSharedValue(1);
    const focalPointY = useSharedValue(1);

    const gesture = Gesture.Pinch()
        .onUpdate((event) => {
            scale.value = event.scale;
            focalPointX.value = event.focalX;
            focalPointY.value = event.focalY;

        })
        .onTouchesUp(() => {
            scale.value = withTiming(1);
        })



    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalPointX.value },
                { translateY: focalPointY.value },
                { translateX: -stageWidth / 2 },
                { translateY: -stageHeight / 2 },
                { scale: scale.value },
                { translateX: -focalPointX.value },
                { translateY: -focalPointY.value },
                { translateX: stageWidth / 2 },
                { translateY: stageHeight / 2 },
            ]
        }
    })


    const animatedFocalPointStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: focalPointX.value }, { translateY: focalPointY.value }]
        }
    })


    return (
        <Screen headerShown={false}>
            <GestureDetector gesture={gesture}>
                <Animated.View>
                    <Animated.Image
                        source={{ uri: IMAGE_URI }}
                        style={[{ width: stageWidth, height: stageHeight }, animatedStyle]}
                    />
                    <Animated.View style={[styles.focalPoint, animatedFocalPointStyle]} />
                </Animated.View>
            </GestureDetector>
        </Screen>
    )
}


const styles = StyleSheet.create({
    focalPoint: {
        // backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 5,
        position: 'absolute',
    }
})

export default ImagePinchToScale