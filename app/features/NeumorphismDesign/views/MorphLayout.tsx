import { generateNeumorphismColors } from "@/util/NeumorphismShadows"
import { StyleSheet, View } from "react-native"


type Props = {
    mainColor: string
    children: React.ReactNode
    width: number
    height: number
    radius: number
    isActive: boolean
}

const MorphLayout = ({ mainColor, children, width, height, radius, isActive }: Props) => {

    const { darkShadow, lightShadow, backgroundColor
    } = generateNeumorphismColors(mainColor)


    const styles = StyleSheet.create({
        top: {
            shadowOffset: { width: -6, height: -6 },
            shadowOpacity: 1,
            shadowColor: lightShadow, // lighter
            shadowRadius: 4,
        },
        topRevert: {
            shadowColor: darkShadow, //darker
            shadowOpacity: 0.3,
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: radius,
        },
        bottomRevert: {
            shadowColor: lightShadow, //darker
            shadowOpacity: 0.3,
        },
        center: {
            width: width,
            height: height,
            backgroundColor: mainColor,
            borderRadius: radius,
            // borderWidth: 1,
            // borderColor: lightShadow,
            justifyContent: 'center',
            alignItems: 'center',
        },
        centerRevert: {
            // borderWidth: 2,
            // borderColor: 'white',
        },
        bottom: {
            shadowOffset: { width: 6, height: 6 },
            shadowOpacity: 1,
            shadowRadius: 6,
            elevation: 10,
            shadowColor: darkShadow, //darker
        }
    })


    return (
        <View style={[styles.top, isActive && styles.topRevert]}>
            <View style={[styles.bottom, isActive && styles.bottomRevert]}>
                <View style={[styles.center, isActive && styles.centerRevert]}>
                    {children}
                </View>
            </View>
        </View>
    )


}


export default MorphLayout