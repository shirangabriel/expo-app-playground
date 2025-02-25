import { generateNeumorphismColors } from "@/util/NeumorphismShadows"
import { StyleSheet, View, Platform, ViewStyle } from "react-native"


type Props = {
    mainColor: string
    children: React.ReactNode
    width: number
    height: number
    radius: number
    isActive: boolean
}

const MorphLayout = ({ mainColor, children, width, height, radius, isActive }: Props) => {
    const { darkShadow, lightShadow } = generateNeumorphismColors(mainColor)

    const styles = StyleSheet.create({
        wrapper: Platform.select({
            android: {
                padding: 3,
                backgroundColor: mainColor,
                borderRadius: radius + 3, // Slightly larger than the inner elements
            },
            ios: {}
        }) as ViewStyle,
        top: {
            ...(Platform.OS === 'ios' ? {
                shadowOffset: { width: -6, height: -6 },
                shadowOpacity: 1,
                shadowColor: lightShadow,
                shadowRadius: 4,
            } : {
                width: width,
                height: height,
                backgroundColor: mainColor,
                borderRadius: radius,
                elevation: isActive ? 0 : 6,
                shadowColor: "#000",
                overflow: 'hidden',
            })
        } as ViewStyle,
        topRevert: {
            ...(Platform.OS === 'ios' ? {
                shadowColor: darkShadow,
                shadowOpacity: 0.3,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: radius,
            } : {
                elevation: 0,
                backgroundColor: mainColor,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)',
            })
        } as ViewStyle,
        bottom: {
            ...(Platform.OS === 'ios' ? {
                shadowOffset: { width: 6, height: 6 },
                shadowOpacity: 1,
                shadowRadius: 6,
                shadowColor: darkShadow,
            } : {})
        } as ViewStyle,
        bottomRevert: {
            ...(Platform.OS === 'ios' ? {
                shadowColor: lightShadow,
                shadowOpacity: 0.3,
            } : {})
        } as ViewStyle,
        center: {
            width: width,
            height: height,
            backgroundColor: mainColor,
            borderRadius: radius,
            justifyContent: 'center',
            alignItems: 'center',
            ...(Platform.OS === 'android' && {
                elevation: isActive ? 0 : 4,
                borderWidth: 0.5,
                borderColor: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
            })
        } as ViewStyle,
        androidInnerShadow: Platform.select({
            android: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: radius,
                elevation: isActive ? 0 : 1,
                backgroundColor: 'rgba(255,255,255,0.05)',
                opacity: 0.99, // Helps with shadow rendering
            },
            ios: {}
        }) as ViewStyle,
        androidOuterShadow: Platform.select({
            android: {
                position: 'absolute',
                top: 1,
                left: 1,
                right: 1,
                bottom: 1,
                borderRadius: radius,
                elevation: isActive ? 0 : 2,
                backgroundColor: mainColor,
                opacity: 0.95, // Makes shadow softer
            },
            ios: {}
        }) as ViewStyle,
    })

    if (Platform.OS === 'android') {
        return (
            <View style={styles.wrapper}>
                <View style={[styles.top, isActive && styles.topRevert]}>
                    <View style={styles.androidOuterShadow} />
                    <View style={styles.androidInnerShadow} />
                    <View style={[styles.center]}>
                        {children}
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.top, isActive && styles.topRevert]}>
            <View style={[styles.bottom, isActive && styles.bottomRevert]}>
                <View style={[styles.center]}>
                    {children}
                </View>
            </View>
        </View>
    )
}


export default MorphLayout